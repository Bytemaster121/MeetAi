'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Return a TanStack QueryClient appropriate for the current environment.
 *
 * On the server (when `window` is undefined) this always creates and returns a new
 * QueryClient. In the browser it caches a single QueryClient in the module-scoped
 * `browserQueryClient` and returns that instance on subsequent calls to avoid
 * re-creating the client across renders (important when React suspense can cause
 * multiple initial renders).
 *
 * @returns A QueryClient instance (new on each server call; singleton in the browser).
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Compute the full base URL for TRPC requests.
 *
 * On the client (browser) this returns a relative path (empty base) so requests use the current origin.
 * On the server it uses the NEXT_PUBLIC_APP_URL environment variable as the base.
 *
 * @returns The URL for the TRPC HTTP endpoint (base + `/api/trpc`).
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return process.env.NEXT_PUBLIC_APP_URL;
  })();
  return `${base}/api/trpc`;
}
/**
 * Provides TRPC and TanStack Query contexts to descendant components.
 *
 * Wraps children with a QueryClientProvider (using a server/new instance per render or a cached browser singleton)
 * and a TRPCProvider wired to a single TRPC client instance created once on mount.
 *
 * The TRPC client is lazily created with an httpBatchLink to the app's TRPC endpoint. The QueryClient is chosen
 * to avoid recreating a client in the browser across renders; on the server a fresh QueryClient is returned.
 *
 * @param children - React nodes to render within the TRPC and QueryClient providers
 * @returns A JSX element containing the composed providers around `children`
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
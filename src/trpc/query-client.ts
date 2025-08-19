import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
/**
 * Create and return a configured TanStack QueryClient for the application.
 *
 * The client is created with sensible defaults:
 * - queries.staleTime is 30 seconds.
 * - dehydrate.shouldDehydrateQuery treats a query as dehydrated when the
 *   library default thinks so or when the query's state.status is `'pending'`.
 * - placeholders exist for custom hydrate/serialize/deserialization hooks (disabled).
 *
 * @returns A new QueryClient instance configured with the project's default options.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}
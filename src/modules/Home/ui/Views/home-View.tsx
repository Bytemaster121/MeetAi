"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // ✅ Correct import

export const HomeView = () => {
  const tcrp = useTRPC();
  const { data } = useQuery(tcrp.hello.queryOptions({text : "Tanmay"}));
  
  return (
    <div className="flex flex-col p-4 gap-y-4">
      {data ?.greeting}
    </div>
  );
};
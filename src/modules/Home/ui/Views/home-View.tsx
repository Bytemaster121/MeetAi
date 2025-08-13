"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

 export const HomeView  = () =>{
  const { data : session} = authClient.useSession();
  if(!session){
    return (
      <p>Loading....</p>
    )
  }

  return (
    <div className = "flex flex-col p-4 gap-y-4">
      <p>Logged in a {session.user.name}</p>
      <Button 
        onClick = { () =>{
          authClient.signOut();
        }}>
        Sign Out
        </Button>
    </div>
  );
}

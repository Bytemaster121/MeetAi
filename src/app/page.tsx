"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await authClient.signUp.email(
        { email, name, password },
        {
          onError: (error) => {
            window.alert("Sign-up failed: " + error.message);
          },
          onSuccess: () => {
            window.alert("User created successfully");
          },
        }
      );
    } catch (err) {
      window.alert("Unexpected error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  const handleLogin = async () => {
    try {
      await authClient.signIn.email(
        { email, password },
        {
          onError: (error) => {
            window.alert("Login failed: " + error.message);
          },
          onSuccess: () => {
            window.alert("Logged in successfully");
          },
        }
      );
    } catch (err) {
      window.alert("Unexpected error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  if (session) {
    return (
      <div className="p-4 space-y-4">
        <p>Logged in as <strong>{session.user.name}</strong></p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* Sign Up Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sign Up</h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Create Account</Button>
      </div>

      {/* Login Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}
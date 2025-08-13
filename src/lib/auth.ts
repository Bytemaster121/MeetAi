import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({

  socialProviders: {
      github: { 
        clientId: process.env.Github_CLIENT_ID as string, 
        clientSecret: process.env.Github_CLIENT_SECRET as string, 
      }, 
      google: { 
            clientId: process.env.Google_CLIENT_ID as string, 
            clientSecret: process.env.Google_CLIENT_SECRET as string, 
        }, 
  },

  emailAndPassword: {
    enabled: true,
    // Require a password for email and password authentication
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
});
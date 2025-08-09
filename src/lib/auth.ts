import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
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
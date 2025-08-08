import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI is not defined in .env");
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URI,
  },
});
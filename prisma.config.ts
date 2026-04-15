import { config } from "dotenv";
// Load .env.local first (overrides .env) so Prisma CLI picks up Supabase credentials
config({ path: ".env.local" });
config(); // fallback to .env for anything not in .env.local
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/postgres-migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url:
      process.env["DIRECT_URL"] ??
      process.env["DATABASE_URL"] ??
      "postgresql://postgres:postgres@127.0.0.1:5432/postgres",
  },
});

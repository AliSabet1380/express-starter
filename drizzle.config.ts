import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  dialect: "postgresql",
  schema: "./models/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
});

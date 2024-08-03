import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./utils/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://ai-mock-interview_owner:RPykB5ZKMJz8@ep-blue-salad-a1ceaect.ap-southeast-1.aws.neon.tech/ai-mock-interview?sslmode=require",
  }
});
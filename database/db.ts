import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(
	"postgresql://neondb_owner:npg_yg3MJ9Slpumx@ep-flat-wind-ad3v0kgy-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
);
export const db = drizzle({ client: sql });

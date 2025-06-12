import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/config/env";
import { schemas } from "./schemas/index";

const pg = postgres(env.DATABASE_URL);

export const db = drizzle(pg, {
	schema: schemas,
});

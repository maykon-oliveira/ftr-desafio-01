import type { Config } from "drizzle-kit";
import { env } from "./src/config/env";

export default {
	schema: "./src/infrastructure/db/schemas/*",
	out: "./src/infrastructure/db/migrations/",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	verbose: true,
} satisfies Config;

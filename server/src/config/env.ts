import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().regex(/^\d+$/).transform(Number),
	NODE_ENV: z.enum(["development", "production", "homologation"]).default("development"),
	DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse({
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	DATABASE_URL: process.env.DATABASE_URL,
});

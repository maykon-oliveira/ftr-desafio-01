import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().regex(/^\d+$/).transform(Number),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	DATABASE_URL: z.string().url(),
	CLOUDFLARE_ACCOUNT_ID: z.string(),
	CLOUDFLARE_ACCESS_KEY_ID: z.string(),
	CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
	CLOUDFLARE_BUCKET: z.string(),
	CLOUDFLARE_PUBLIC_URL: z.string().url(),
});

export const env = envSchema.parse({
	PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	DATABASE_URL: process.env.DATABASE_URL,
	CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_ACCESS_KEY_ID: process.env.CLOUDFLARE_ACCESS_KEY_ID,
	CLOUDFLARE_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
	CLOUDFLARE_BUCKET: process.env.CLOUDFLARE_BUCKET,
	CLOUDFLARE_PUBLIC_URL: process.env.CLOUDFLARE_PUBLIC_URL,
});

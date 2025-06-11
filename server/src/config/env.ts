import { z } from "zod";

const envSchema = z.object({
	PORT: z.string().regex(/^\d+$/).transform(Number),
});

export const env = envSchema.parse({
	PORT: process.env.PORT || "3000",
});

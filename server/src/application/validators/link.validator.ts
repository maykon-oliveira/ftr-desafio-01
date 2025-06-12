import { z } from "zod";

export const CreateLinkInput = z.object({
	originalUrl: z.string().url(),
	shortCode: z
		.string()
		.min(1, "Short code must not be empty")
		.max(50, "Short code must not exceed 50 characters")
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Short code can only contain alphanumeric characters, underscores, and hyphens",
		),
});

export type CreateLinkInput = z.infer<typeof CreateLinkInput>;

import { z } from "zod";

const originalUrl = z.string().url();
const shortCode = z
	.string()
	.min(1, "Short code must not be empty")
	.max(50, "Short code must not exceed 50 characters")
	.regex(
		/^[a-zA-Z0-9_-]+$/,
		"Short code can only contain alphanumeric characters, underscores, and hyphens",
	);

export const CreateLinkInput = z.object({
	originalUrl,
	shortCode,
});

export type CreateLinkInput = z.infer<typeof CreateLinkInput>;

export const CreateLinkOutput = z.object({
	message: z.string().min(1, "Message must not be empty"),
	data: z.object({
		originalUrl,
		shortCode,
	}),
});

export type CreateLinkOutput = z.infer<typeof CreateLinkOutput>;

export const DeleteLinkInput = z.object({
	shortCode,
});

export type DeleteLinkInput = z.infer<typeof DeleteLinkInput>;

export const DeleteLinkOutput = z.void().describe("No content response for successful deletion");

export type DeleteLinkOutput = z.infer<typeof DeleteLinkOutput>;

export const ResolveLinkInput = z.object({
	shortCode,
});

export type ResolveLinkInput = z.infer<typeof ResolveLinkInput>;

export const ResolveLinkOutput = z.object({
	message: z.string().min(1, "Message must not be empty"),
	data: z.object({
		originalUrl,
	}),
});

export type ResolveLinkOutput = z.infer<typeof ResolveLinkOutput>;

export const FindAllLinkOutput = z.array(
	z.object({
		originalUrl,
		shortCode,
	}),
);

export type FindAllLinkOutput = z.infer<typeof FindAllLinkOutput>;

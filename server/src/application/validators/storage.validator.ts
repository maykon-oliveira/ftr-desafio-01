import { Readable } from "node:stream";
import { z } from "zod";

export const UploadFileToStorageInput = z.object({
	folder: z.enum(["downloads"]),
	fileName: z.string(),
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
});

export type UploadFileToStorageInput = z.input<typeof UploadFileToStorageInput>;

export const UploadFileToStorageOutput = z.object({
	key: z.string(),
	url: z.string().url(),
});

export type UploadFileToStorageOutput = z.input<typeof UploadFileToStorageOutput>;

import { v4 as uuidv4 } from "uuid";
import { env } from "@/config/env";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { basename, extname } from "node:path";
import {
	UploadFileToStorageInput,
	UploadFileToStorageOutput,
} from "@/application/validators/storage.validator";
import { FileStorageService } from "@/application/ports/file-storage.service";

export class CloudflareStorageService implements FileStorageService {
	private readonly r2: S3Client;

	constructor() {
		this.r2 = new S3Client({
			region: "auto",
			endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
				secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
			},
		});
	}

	async uploadFile(input: UploadFileToStorageInput): Promise<UploadFileToStorageOutput> {
		const { folder, fileName, contentType, contentStream } = UploadFileToStorageInput.parse(input);

		const fileExtension = extname(fileName);
		const fileNameWithoutExtension = basename(fileName);
		const sanitizedFileName = fileNameWithoutExtension.replace(/[^a-zA-Z0-9]/g, "");
		const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension);

		const uniqueFileName = `${folder}/${uuidv4()}-${sanitizedFileNameWithExtension}`;

		const upload = new Upload({
			client: this.r2,
			params: {
				Key: uniqueFileName,
				Bucket: env.CLOUDFLARE_BUCKET,
				Body: contentStream,
				ContentType: contentType,
			},
		});

		await upload.done();

		return {
			key: uniqueFileName,
			url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
		};
	}
}

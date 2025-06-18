import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { CloudflareStorageService } from "@/infrastructure/http/services/cloudflare-storage.service";
import { FileStorageService } from "../ports/file-storage.service";

export class ExportCSVLinkUseCase {
	private readonly linkRepository: LinkRepository;
	private readonly storageService: FileStorageService;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
		this.storageService = new CloudflareStorageService();
	}

	async execute(): Promise<string> {
		const cursor = this.linkRepository.findAllCursor();

		const csv = stringify({
			delimiter: ",",
			header: true,
			columns: [
				{ key: "original_url", header: "URL original" },
				{ key: "short_code", header: "URL encurtada" },
				{ key: "access_count", header: "Contagem de acessos" },
				{ key: "created_at", header: "Data de criação" },
			],
		});

		const uploadToStorageStream = new PassThrough();

		const convertToCSVPipeline = pipeline(
			cursor,
			new Transform({
				objectMode: true,
				transform(chunks: unknown[], _encoding, callback) {
					for (const chunk of chunks) {
						this.push(chunk);
					}

					callback();
				},
			}),
			csv,
			uploadToStorageStream,
		);

		const uploadToStorage = this.storageService.uploadFile({
			contentType: "text/csv",
			folder: "downloads",
			fileName: `${new Date().toISOString()}-links.csv`,
			contentStream: uploadToStorageStream,
		});

		const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

		return url;
	}
}

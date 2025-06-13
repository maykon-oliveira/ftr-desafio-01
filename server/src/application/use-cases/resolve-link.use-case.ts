import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import type { ResolveLinkInput } from "@/application/validators/link.validator";
import { LinkNotFoundError } from "@/domain/errors/link-not-found";

export class ResolveLinkUseCase {
	private readonly linkRepository: LinkRepository;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
	}

	async execute(input: ResolveLinkInput): Promise<string> {
		const { shortCode } = input;

		const link = await this.linkRepository.findByShortCode(shortCode);

		if (!link) {
			throw new LinkNotFoundError(`Link with short code "${shortCode}" not found`);
		}

		return link.originalUrl;
	}
}

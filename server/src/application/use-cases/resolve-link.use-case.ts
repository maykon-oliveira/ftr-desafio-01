import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import type { ResolveLinkInput } from "@/application/validators/link.validator";
import { LinkNotFoundError } from "@/domain/errors/link-not-found";
import { Link } from "@/domain/entities/link";

export class ResolveLinkUseCase {
	private readonly linkRepository: LinkRepository;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
	}

	async execute(input: ResolveLinkInput): Promise<Pick<Link, "originalUrl" | "accessCount">> {
		const { shortCode } = input;

		const link = await this.linkRepository.findByShortCode(shortCode);

		if (!link) {
			throw new LinkNotFoundError(`Link with short code "${shortCode}" not found`);
		}

		await this.linkRepository.incrementAccessCount(shortCode);

		return {
			originalUrl: link.originalUrl,
			accessCount: link.accessCount + 1,
		};
	}
}

import { Link } from "@/domain/entities/link";
import { DuplicateShortUrlError } from "@/domain/errors/duplicate-short-url-error";
import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import type { CreateLinkInput } from "@/application/validators/link.validator";

export class CreateLinkUseCase {
	private readonly linkRepository: LinkRepository;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
	}

	async execute(input: CreateLinkInput): Promise<Link> {
		const { originalUrl, shortCode } = input;

		const existingLink = await this.linkRepository.findByShortCode(shortCode);

		if (existingLink) {
			throw new DuplicateShortUrlError("The short URL already exists.");
		}

		const entity = Link.create(originalUrl, shortCode);
		const persistence = await this.linkRepository.save(entity);

		return persistence;
	}
}

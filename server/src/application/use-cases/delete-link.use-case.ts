import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import type { DeleteLinkInput } from "@/application/validators/link.validator";

export class DeleteLinkUseCase {
	private readonly linkRepository: LinkRepository;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
	}

	async execute(input: DeleteLinkInput): Promise<void> {
		const { shortCode } = input;

		await this.linkRepository.deleteByShortCode(shortCode);
	}
}

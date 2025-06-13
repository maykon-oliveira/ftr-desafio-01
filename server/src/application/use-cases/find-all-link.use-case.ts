import { DrizzleLinkRepository } from "@/infrastructure/db/repositories/drizzle-link-repository";
import { LinkRepository } from "@/application/ports/link.repository";
import { Link } from "@/domain/entities/link";

export class FindAllLinkUseCase {
	private readonly linkRepository: LinkRepository;

	constructor() {
		this.linkRepository = new DrizzleLinkRepository();
	}

	async execute(): Promise<Link[]> {
		return this.linkRepository.findAll();
	}
}

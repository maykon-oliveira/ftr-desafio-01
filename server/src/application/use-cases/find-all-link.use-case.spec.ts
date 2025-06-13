import { describe, it, expect, vi, beforeEach } from "vitest";
import { FindAllLinkUseCase } from "./find-all-link.use-case";
import type { LinkRepository } from "@/application/ports/link.repository";
import { Link } from "@/domain/entities/link";

/**
 * @author IA
 */
vi.mock("@/infrastructure/db/repositories/drizzle-link-repository", () => ({
	DrizzleLinkRepository: vi.fn(),
}));

describe("FindAllLinkUseCase", () => {
	let useCase: FindAllLinkUseCase;
	let mockLinkRepository: LinkRepository;

	beforeEach(() => {
		mockLinkRepository = {
			findByShortCode: vi.fn(),
			save: vi.fn(),
			deleteByShortCode: vi.fn(),
			findAll: vi.fn(),
			incrementAccessCount: vi.fn(),
		};
		useCase = new FindAllLinkUseCase();
		(useCase as any).linkRepository = mockLinkRepository;
	});

	it("should return all links", async () => {
		const links = [
			Link.create("https://example.com/1", "abc1"),
			Link.create("https://example.com/2", "abc2"),
		];
		vi.mocked(mockLinkRepository.findAll).mockResolvedValue(links);
		const result = await useCase.execute();
		expect(result).toEqual(links);
		expect(mockLinkRepository.findAll).toHaveBeenCalled();
	});
});

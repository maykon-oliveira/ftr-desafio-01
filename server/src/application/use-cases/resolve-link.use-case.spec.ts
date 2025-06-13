import { describe, it, expect, vi, beforeEach } from "vitest";
import { ResolveLinkUseCase } from "./resolve-link.use-case";
import type { LinkRepository } from "@/application/ports/link.repository";
import type { ResolveLinkInput } from "@/application/validators/link.validator";
import { LinkNotFoundError } from "@/domain/errors/link-not-found";
import { Link } from "@/domain/entities/link";

/**
 * @author IA
 */

vi.mock("@/infrastructure/db/repositories/drizzle-link-repository", () => ({
	DrizzleLinkRepository: vi.fn(),
}));

describe("ResolveLinkUseCase", () => {
	let useCase: ResolveLinkUseCase;
	let mockLinkRepository: LinkRepository;

	beforeEach(() => {
		// Create a mock repository
		mockLinkRepository = {
			findByShortCode: vi.fn(),
			save: vi.fn(),
			deleteByShortCode: vi.fn(),
			findAll: vi.fn(),
		};
		useCase = new ResolveLinkUseCase();
		(useCase as any).linkRepository = mockLinkRepository;
	});

	it("should return the originalUrl if link is found", async () => {
		const input: ResolveLinkInput = { shortCode: "abc123" };
		const link = Link.create("https://example.com", "abc123");
		vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(link);
		const result = await useCase.execute(input);
		expect(result).toBe(link.originalUrl);
		expect(mockLinkRepository.findByShortCode).toHaveBeenCalledWith("abc123");
	});

	it("should throw LinkNotFoundError if link is not found", async () => {
		const input: ResolveLinkInput = { shortCode: "notfound" };
		vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValueOnce(null);
		await expect(useCase.execute(input)).rejects.toThrow(LinkNotFoundError);
	});
});

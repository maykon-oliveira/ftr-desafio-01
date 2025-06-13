import { describe, it, expect, vi, beforeEach } from "vitest";
import { DeleteLinkUseCase } from "./delete-link.use-case";
import type { DeleteLinkInput } from "@/application/validators/link.validator";
import { LinkRepository } from "../ports/link.repository";

/**
 * @author IA
 */

vi.mock("@/infrastructure/db/repositories/drizzle-link-repository", () => ({
	DrizzleLinkRepository: vi.fn(),
}));

describe("DeleteLinkUseCase", () => {
	let useCase: DeleteLinkUseCase;
	let mockLinkRepository: LinkRepository;

	beforeEach(() => {
		// Create a mock repository
		mockLinkRepository = {
			findByShortCode: vi.fn(),
			save: vi.fn(),
			deleteByShortCode: vi.fn(),
		};

		useCase = new DeleteLinkUseCase();
		(useCase as any).linkRepository = mockLinkRepository;
	});

	it("should call deleteByShortCode with the correct shortCode", async () => {
		const input: DeleteLinkInput = { shortCode: "abc123" };
		await useCase.execute(input);
		expect(mockLinkRepository.deleteByShortCode).toHaveBeenCalledWith("abc123");
	});
});

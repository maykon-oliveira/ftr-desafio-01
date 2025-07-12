import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateLinkUseCase } from "./create-link.use-case";
import { Link } from "@/domain/entities/link";
import { DuplicateShortUrlError } from "@/domain/errors/duplicate-short-url-error";
import type { LinkRepository } from "@/application/ports/link.repository";
import type { CreateLinkInput } from "@/application/validators/link.validator";

/**
 * @author IA
 */

vi.mock("@/infrastructure/db/repositories/drizzle-link-repository", () => ({
	DrizzleLinkRepository: vi.fn(),
}));

describe("CreateLinkUseCase", () => {
	let createLinkUseCase: CreateLinkUseCase;
	let mockLinkRepository: LinkRepository;

	beforeEach(() => {
		// Create a mock repository
		mockLinkRepository = {
			findByShortCode: vi.fn(),
			save: vi.fn(),
			deleteByShortCode: vi.fn(),
			findAll: vi.fn(),
			incrementAccessCount: vi.fn(),
			findAllCursor: vi.fn(),
		};

		// Create the use case instance
		createLinkUseCase = new CreateLinkUseCase();

		// Replace the repository with our mock
		(createLinkUseCase as any).linkRepository = mockLinkRepository;
	});

	describe("execute", () => {
		const validInput: CreateLinkInput = {
			originalUrl: "https://www.rocketseat.com.br",
			shortCode: "rocketseat",
		};

		it("should create a link successfully when short code does not exist", async () => {
			// Arrange
			const savedLink = Link.create(validInput.originalUrl, validInput.shortCode);
			// Simulate that the saved link has an ID assigned by the database
			(savedLink as any).id = "generated-id";

			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(null);
			vi.mocked(mockLinkRepository.save).mockResolvedValue(savedLink);

			// Act
			const result = await createLinkUseCase.execute(validInput);

			// Assert
			expect(mockLinkRepository.findByShortCode).toHaveBeenCalledWith(validInput.shortCode);
			expect(mockLinkRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					originalUrl: validInput.originalUrl,
					shortCode: validInput.shortCode,
				}),
			);
			expect(result).toBe(savedLink);
			expect(result.id).toBe("generated-id");
		});

		it("should throw DuplicateShortUrlError when short code already exists", async () => {
			// Arrange
			const link: Link = Link.create(validInput.originalUrl, validInput.shortCode);
			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(link);

			// Act & Assert
			await expect(createLinkUseCase.execute(validInput)).rejects.toThrow(DuplicateShortUrlError);
			await expect(createLinkUseCase.execute(validInput)).rejects.toThrow(
				"The short URL already exists.",
			);

			expect(mockLinkRepository.findByShortCode).toHaveBeenCalledWith(validInput.shortCode);
			expect(mockLinkRepository.save).not.toHaveBeenCalled();
		});

		it("should call repository methods with correct parameters", async () => {
			// Arrange
			const savedLink = Link.create(validInput.originalUrl, validInput.shortCode);
			(savedLink as any).id = "generated-id";

			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(null);
			vi.mocked(mockLinkRepository.save).mockResolvedValue(savedLink);

			// Act
			await createLinkUseCase.execute(validInput);

			// Assert
			expect(mockLinkRepository.findByShortCode).toHaveBeenCalledTimes(1);
			expect(mockLinkRepository.findByShortCode).toHaveBeenCalledWith("rocketseat");
			expect(mockLinkRepository.save).toHaveBeenCalledTimes(1);
		});

		it("should create Link entity with correct parameters", async () => {
			// Arrange
			const linkCreateSpy = vi.spyOn(Link, "create");
			const savedLink = Link.create(validInput.originalUrl, validInput.shortCode);
			(savedLink as any).id = "generated-id";

			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(null);
			vi.mocked(mockLinkRepository.save).mockResolvedValue(savedLink);

			// Act
			await createLinkUseCase.execute(validInput);

			// Assert
			expect(linkCreateSpy).toHaveBeenCalledWith(validInput.originalUrl, validInput.shortCode);
		});

		it("should handle repository errors gracefully", async () => {
			// Arrange
			const repositoryError = new Error("Database connection failed");
			vi.mocked(mockLinkRepository.findByShortCode).mockRejectedValue(repositoryError);

			// Act & Assert
			await expect(createLinkUseCase.execute(validInput)).rejects.toThrow(
				"Database connection failed",
			);
		});

		it("should handle save repository errors gracefully", async () => {
			// Arrange
			const saveError = new Error("Failed to save link");
			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(null);
			vi.mocked(mockLinkRepository.save).mockRejectedValue(saveError);

			// Act & Assert
			await expect(createLinkUseCase.execute(validInput)).rejects.toThrow("Failed to save link");
		});

		it("should work with different valid inputs", async () => {
			// Arrange
			const differentInput: CreateLinkInput = {
				originalUrl: "https://google.com",
				shortCode: "google-123",
			};

			const savedLink = Link.create(differentInput.originalUrl, differentInput.shortCode);
			(savedLink as any).id = "different-id";

			vi.mocked(mockLinkRepository.findByShortCode).mockResolvedValue(null);
			vi.mocked(mockLinkRepository.save).mockResolvedValue(savedLink);

			// Act
			const result = await createLinkUseCase.execute(differentInput);

			// Assert
			expect(mockLinkRepository.findByShortCode).toHaveBeenCalledWith("google-123");
			expect(result.originalUrl).toBe("https://google.com");
			expect(result.shortCode).toBe("google-123");
			expect(result.id).toBe("different-id");
		});
	});
});

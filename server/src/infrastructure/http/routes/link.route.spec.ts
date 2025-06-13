import { describe, it, beforeEach, afterEach, expect } from "vitest";
import Fastify from "fastify";
import { CreateLinkInput } from "@/application/validators/link.validator";
import { buildServer } from "../server";
import { db } from "@/infrastructure/db";
import { schemas } from "@/infrastructure/db/schemas";
import { eq } from "drizzle-orm";

/**
 * @author IA
 */
describe("linkRoute e2e", () => {
	const payload: CreateLinkInput = {
		originalUrl: "https://vitest.dev",
		shortCode: "vitest",
	};
	let app: ReturnType<typeof Fastify>;

	beforeEach(async () => {
		await db.delete(schemas.links).where(eq(schemas.links.shortCode, "vitest"));
		await db.delete(schemas.links).where(eq(schemas.links.shortCode, "duplicate"));
		app = buildServer();
	});

	afterEach(async () => {
		await app.close();
	});

	it("should create a new link and return 201", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/links",
			payload,
		});

		expect(response.statusCode).toBe(201);
		const body = response.json();
		expect(body).toHaveProperty("message", "Link created successfully");
		expect(body).toHaveProperty("data");
		const { data } = body;
		expect(data).toMatchObject({
			originalUrl: payload.originalUrl,
			shortCode: payload.shortCode,
			accessCount: 0,
		});
	});

	it("should return 400 for invalid body", async () => {
		const response = await app.inject({
			method: "POST",
			url: "/links",
			payload: {
				originalUrl: "not-a-url",
				// missing shortCode
			},
		});
		expect(response.statusCode).toBe(400);
		const body = response.json();
		expect(body).toHaveProperty("error");
	});

	it("should return 409 for duplicate shortCode", async () => {
		const payload: CreateLinkInput = {
			originalUrl: "https://vitest.dev",
			shortCode: "duplicate",
		};

		// First creation should succeed
		const first = await app.inject({
			method: "POST",
			url: "/links",
			payload,
		});
		expect(first.statusCode).toBe(201);

		// Second creation with same shortCode should fail
		const second = await app.inject({
			method: "POST",
			url: "/links",
			payload,
		});
		// Depending on your error handling, this might be 409 or 400
		expect([409]).toContain(second.statusCode);
		const body = second.json();
		expect(body).toHaveProperty("error", "Conflict");
		expect(body).toHaveProperty("message", "The short URL already exists.");
	});

	it("should delete if the shortCode is valid", async () => {
		const shortCode = "vitest";
		const response = await app.inject({
			method: "DELETE",
			url: `/links/${shortCode}`,
		});
		expect(response.statusCode).toBe(204);
	});

	it("should return 400 if the shortCode is unformatted", async () => {
		const shortCode = "*unformatted*";
		const response = await app.inject({
			method: "DELETE",
			url: `/links/${shortCode}`,
		});
		expect(response.statusCode).toBe(400);
		const body = response.json();
		expect(body).toHaveProperty("error", "Bad Request");
	});

	it("given a shortCode should returns 200, the originalURL, and the counter incremented", async () => {
		await app.inject({
			method: "POST",
			url: "/links",
			payload,
		});

		const response = await app.inject({
			method: "GET",
			url: `/links/${payload.shortCode}`,
		});

		expect(response.statusCode).toBe(200);
		const body = response.json();
		expect(body).toHaveProperty("message", "Link resolved successfully");
		expect(body).toHaveProperty("data");
		const { data } = body;
		expect(data).toMatchObject({
			originalUrl: payload.originalUrl,
			accessCount: 1,
		});
	});

	it("given a shortCode should returns 404 if the doesn't exists", async () => {
		const shortCode = "unknownShortCode";
		const response = await app.inject({
			method: "GET",
			url: `/links/${shortCode}`,
		});

		expect(response.statusCode).toBe(404);
		const body = response.json();
		expect(body).toHaveProperty("error", "Not Found");
		expect(body).toHaveProperty("message", `Link with short code "${shortCode}" not found`);
	});
});

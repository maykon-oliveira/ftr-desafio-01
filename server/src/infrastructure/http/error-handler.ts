import { DuplicateShortUrlError } from "@/domain/errors/duplicate-short-url-error";
import { LinkNotFoundError } from "@/domain/errors/link-not-found";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
	if (error.code === "FST_ERR_VALIDATION") {
		return reply.status(400).send({
			error: "Bad Request",
			message: error.message,
			validation: error.validation,
		});
	}

	if (error instanceof DuplicateShortUrlError) {
		return reply.status(409).send({
			error: "Conflict",
			message: error.message,
		});
	}

	if (error instanceof LinkNotFoundError) {
		return reply.status(404).send({
			error: "Not Found",
			message: error.message,
		});
	}

	console.error(error);

	return reply.status(error.statusCode || 500).send({
		error: "Internal Server Error",
		message: "An unexpected error occurred.",
	});
}

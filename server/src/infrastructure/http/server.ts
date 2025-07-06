import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";

import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { linkRoute } from "./routes/link.route";
import fastifyApiReference from "@scalar/fastify-api-reference";
import { errorHandler } from "./error-handler";

function buildServer() {
	const server = fastify();

	server.setValidatorCompiler(validatorCompiler);
	server.setSerializerCompiler(serializerCompiler);
	server.setErrorHandler(errorHandler);

	server.register(fastifyCors, {
		origin: "*",
		methods: ["GET", "POST", "DELETE", "OPTIONS"],
	});
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: "Brev.ly",
				description: "Brev.ly documentation",
				version: "1.0.0",
			},
		},
		transform: jsonSchemaTransform,
	});
	server.get("/openapi.json", () => server.swagger());
	server.register(fastifyApiReference, {
		routePrefix: "/docs",
	});
	// Routes
	server.register(linkRoute);

	return server;
}

export { buildServer };

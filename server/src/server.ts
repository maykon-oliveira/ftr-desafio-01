import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { env } from "./config/env.ts";

const server = fastify({ logger: env.NODE_ENV !== "production" });

server.register(fastifyCors, {
	origin: "*",
});

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly",
			description: "Brev.ly documentation",
			version: "1.0.0",
		},
	},
});

server.listen({ port: env.PORT }).then(() => {
	console.log(`Server is running on http://localhost:${env.PORT}`);
});

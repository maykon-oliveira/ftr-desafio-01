import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { CreateLinkInput } from "@/application/validators/link.validator";
import { CreateLinkUseCase } from "@/application/use-cases/create-link.use-case";

export const linkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a new link",
				description: "Create a new shortened link with a custom short code.",
				body: CreateLinkInput,
			},
		},
		async (request, reply) => {
			const useCase = new CreateLinkUseCase();

			const result = await useCase.execute(request.body as CreateLinkInput);

			return reply.status(201).send({
				message: "Link created successfully",
				data: result,
			});
		},
	);
};

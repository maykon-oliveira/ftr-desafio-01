import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
	CreateLinkInput,
	CreateLinkOutput,
	DeleteLinkInput,
	DeleteLinkOutput,
	ExportCSVLinkOutput,
	FindAllLinkOutput,
	ResolveLinkInput,
	ResolveLinkOutput,
} from "@/application/validators/link.validator";
import { CreateLinkUseCase } from "@/application/use-cases/create-link.use-case";
import { DeleteLinkUseCase } from "@/application/use-cases/delete-link.use-case";
import { ResolveLinkUseCase } from "@/application/use-cases/resolve-link.use-case";
import { z } from "zod";
import { FindAllLinkUseCase } from "@/application/use-cases/find-all-link.use-case";
import { ExportCSVLinkUseCase } from "@/application/use-cases/export-csv-link.use-case";

export const linkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create a new link",
				description: "Create a new shortened link with a custom short code.",
				body: CreateLinkInput,
				response: {
					201: CreateLinkOutput,
					404: z.object({
						error: z.string(),
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const useCase = new CreateLinkUseCase();

			const result = await useCase.execute(request.body);

			return reply.status(201).send({
				message: "Link created successfully",
				data: result,
			});
		},
	);

	server.delete(
		"/links/:shortCode",
		{
			schema: {
				summary: "Delete a link",
				description: "Delete a shortened link by its short code.",
				params: DeleteLinkInput,
				response: {
					204: DeleteLinkOutput,
				},
			},
		},
		async (request, reply) => {
			const { shortCode } = request.params;
			const useCase = new DeleteLinkUseCase();

			await useCase.execute({ shortCode });

			return reply.status(204).send();
		},
	);

	server.get(
		"/links/:shortCode",
		{
			schema: {
				summary: "Resolve a link",
				description: "Resolve a shortened link to its original URL.",
				params: ResolveLinkInput,
				response: {
					200: ResolveLinkOutput,
				},
			},
		},
		async (request, reply) => {
			const { shortCode } = request.params;
			const useCase = new ResolveLinkUseCase();

			const result = await useCase.execute({ shortCode });

			return reply.status(200).send({
				message: "Link resolved successfully",
				data: result,
			});
		},
	);

	server.get(
		"/links",
		{
			schema: {
				summary: "List all links",
				description: "Retrieve a list of all shortened links.",
				response: {
					200: FindAllLinkOutput,
				},
			},
		},
		async (request, reply) => {
			const useCase = new FindAllLinkUseCase();
			const links = await useCase.execute();
			return reply.status(200).send(links);
		},
	);

	server.get(
		"/links/export/csv",
		{
			schema: {
				summary: "Export links to CSV",
				description: "Export all shortened links to a CSV file.",
				response: {
					200: ExportCSVLinkOutput,
				},
			},
		},
		async (_request, reply) => {
			const useCase = new ExportCSVLinkUseCase();
			const downloadUrl = await useCase.execute();
			return reply.status(200).send({
				message: "CSV export initiated successfully. Please check your storage for the file.",
				data: { downloadUrl },
			});
		},
	);
};

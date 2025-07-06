import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useLinks } from "@/store/links";

function LinkForm() {
	const createLink = useLinks((state) => state.createLink);
	const form = useForm<formSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			originalUrl: "",
			shortCode: "",
		},
	});

	const onSubmit = (data: formSchema) => {
		createLink({
			originalUrl: data.originalUrl,
			shortCode: data.shortCode,
		}).finally(() => {
			form.reset();
		})
	};

	return (
		<Card className="w-full md:max-w-sm max-h-min">
			<CardHeader>
				<CardTitle className="text-gray-600 text-lg font-bold">Novo link</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<div className="flex flex-col gap-6">
							<FormField control={form.control} name="originalUrl" render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-gray-500" htmlFor="originalUrl">Link original</FormLabel>
									<FormControl>
										<Input
											id="originalUrl"
											type="url"
											placeholder="www.exemplo.com.br"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />
							<FormField control={form.control} name="shortCode" render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-gray-500" htmlFor="shortCode">Link encurtado</FormLabel>
									<FormControl>
										<Input id="shortCode" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />
						</div>
						<Button type="submit" className="w-full">
							Salvar link
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card >
	)
}

export { LinkForm };

const formSchema = z.object({
	originalUrl: z.string().url("Informe uma url válida."),
	shortCode: z.string()
		.regex(/^[a-z0-9]+$/, "Informe uma url minúscula e sem espaço/caracter especial.")
})

type formSchema = z.infer<typeof formSchema>;
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function LinkForm() {


	return (
		<Card className="w-full md:max-w-sm">
			<CardHeader>
				<CardTitle className="text-gray-600 text-lg font-bold">Novo link</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label className="text-xs text-gray-500" htmlFor="originalUrl">Link original</Label>
							<Input
								id="originalUrl"
								type="url"
								placeholder="www.exemplo.com.br"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label className="text-xs text-gray-500" htmlFor="shortCode">Link encurtado</Label>
							<Input id="shortCode" type="text" required />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="submit" disabled className="w-full">
					Salvar link
				</Button>
			</CardFooter>
		</Card>
	)
}

export { LinkForm };
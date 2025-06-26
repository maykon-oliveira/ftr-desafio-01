import { Button } from "./ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { LinkIcon } from "lucide-react";

function LinkList() {

	return (
		<Card className="w-full h-min">
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-gray-600 text-lg font-bold">
					Meus links
				</CardTitle>
				<CardAction>
					<Button size="sm" variant="secondary" disabled>Baixar CSV</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Separator />
				<div className="flex flex-col items-center justify-center gap-3 py-7">
					<LinkIcon className="text-gray-500" />
					<p className="text-xs text-center text-gray-500">ainda não existem links cadastrados</p>
				</div>
			</CardContent>
		</Card>
	)
}

export { LinkList };
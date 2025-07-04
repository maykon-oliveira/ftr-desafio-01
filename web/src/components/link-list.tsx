import { useLinks } from "@/store/links";
import { Button } from "./ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { CopyIcon, LinkIcon, LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";

function LinkList() {
	const { links, fetchLinks, loading } = useLinks();

	useEffect(() => {
		fetchLinks();
	}, [fetchLinks]);

	return (
		<Card className="w-full h-min relative">
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="text-gray-600 text-lg font-bold">
					Meus links
				</CardTitle>
				<CardAction>
					<Button className="hover:cursor-pointer" size="sm" variant="secondary" disabled={!links.length}>Baixar CSV</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="divide-y">
				<Separator />

				{loading && (
					<div className="flex items-center justify-center gap-3 py-7">
						<LoaderCircleIcon className="text-gray-500 animate-spin" />
						<p className="text-xs text-center text-gray-500">CARREGANDO LINKS</p>
					</div>
				)}


				{!loading && !links.length && (
					<div className="flex flex-col items-center justify-center gap-3 py-7">
						<LinkIcon className="text-gray-500" />
						<p className="text-xs text-center text-gray-500">ainda não existem links cadastrados</p>
					</div>
				)}

				{links.map((link) => {
					const formattedUrl = location.origin + "/" + link.shortCode;

					return (
						<div key={link.shortCode} className="flex items-center py-4 gap-4">
							<div className="flex flex-col flex-1">
								<a href={formattedUrl} className="text-md text-blue">
									{formattedUrl}
								</a>
								<span className="text-sm text-gray-500">{link.originalUrl}</span>
							</div>
							<div className="text-sm text-gray-500">{link.accessCount} acessos</div>
							<div className="flex gap-1">
								<Button size="icon" variant="secondary">
									<CopyIcon />
								</Button>
								<Button size="icon" variant="secondary">
									<Trash2Icon />
								</Button>
							</div>
						</div>
					)
				})}
			</CardContent>
		</Card>
	)
}

export { LinkList };
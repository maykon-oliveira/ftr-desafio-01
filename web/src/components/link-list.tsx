import { useLinks } from "@/store/links";
import { Button } from "./ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { LinkIcon, LoaderCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { LinkListItem } from "./link-list-item";

function LinkList() {
	const links = useLinks(state => state.links);
	const fetchLinks = useLinks(state => state.fetchLinks);
	const loading = useLinks(state => state.loading);

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

				{links.map((link) => <LinkListItem key={link.shortCode} link={link} />)}
			</CardContent>
		</Card>
	)
}

export { LinkList };
import type { Link } from "@/utils/types";
import { Button } from "./ui/button";
import { CopyIcon, Trash2Icon } from "lucide-react";
import { useLinks } from "@/store/links";

type Props = {
	link: Link;
}

export function LinkListItem({ link }: Props) {
	const copyLinkToClipboard = useLinks((state) => state.copyLinkToClipboard,);
	const deleteLink = useLinks((state) => state.deleteLink,);

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
				<Button onClick={() => copyLinkToClipboard(formattedUrl)} size="icon" variant="secondary">
					<CopyIcon />
				</Button>
				<Button onClick={() => deleteLink(link.shortCode)} size="icon" variant="secondary">
					<Trash2Icon />
				</Button>
			</div>
		</div>
	)
}
import * as api from '@/api/link-api';
import type { Link } from '@/utils/types';
import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { toast } from "sonner"
import type { AxiosError } from 'axios';

type LinkState = {
	links: Link[];
	loading: boolean;
	fetchLinks: () => Promise<void>;
	copyLinkToClipboard: (url: string) => void;
	deleteLink: (shortCode: string) => void;
	createLink: (link: Omit<Link, "accessCount">) => Promise<void>;
}

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(immer((set, get) => {

	function copyLinkToClipboard(url: string) {
		navigator.clipboard.writeText(url);
		toast.success("Link copiado para a área de transferência!");
	}

	async function deleteLink(shortCode: string) {
		await api.deleteLink(shortCode);
		toast.success("Link deletado com sucesso!");
		set((state) => {
			state.links = state.links.filter(link => link.shortCode !== shortCode);
		});
	}

	async function createLink(link: Omit<Link, "accessCount">) {
		try {
			const response = await api.createLink(link);
			toast.success("Link criado com sucesso!");
			set((state) => {
				state.links.push(response.data.data);
			});
		} catch (error: AxiosError | any) {
			toast.error(error.response?.data?.message || "Erro ao criar link");
		}
	}

	return {
		links: [],
		loading: true,
		copyLinkToClipboard,
		deleteLink,
		createLink,
		fetchLinks: async () => {
			try {
				const response = await api.findAll();
				set((state) => {
					state.links = response.data;
					state.loading = false;
				});
			} catch (error) {
				console.error('Error fetching links:', error);
				set((state) => {
					state.links = [];
					state.loading = false;
				});
			}
		}
	};
}))
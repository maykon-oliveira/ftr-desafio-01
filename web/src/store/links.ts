import { findAll } from '@/api/link-api';
import type { Link } from '@/utils/types';
import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type LinkState = {
	links: Link[];
	loading: boolean;
	fetchLinks: () => Promise<void>;
}

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(immer((set, get) => {
	return {
		links: [],
		loading: true,
		fetchLinks: async () => {
			try {
				const response = await findAll();
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
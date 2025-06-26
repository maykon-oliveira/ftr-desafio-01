import { findAll } from '@/api/link-api';
import type { Link } from '@/utils/types';
import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type LinkState = {
	links: Link[];
	fetchLinks: () => Promise<void>;
}

enableMapSet();

export const useLinks = create<LinkState, [["zustand/immer", never]]>(immer((set, get) => {
	return {
		links: [],
		fetchLinks: async () => {
			try {
				const response = await findAll();
				set((state) => {
					state.links = response.data;
				});
			} catch (error) {
				console.error('Error fetching links:', error);
				set((state) => {
					state.links = [];
				});
			}
		}
	};
}))
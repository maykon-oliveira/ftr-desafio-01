import type { Link } from "@/utils/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
	baseURL: API_URL,
});

export function findAll() {
	return api.get<Link[]>("/links");
}

export function findByShortCode(shortCode: string) {
	return api.get<{
		message: string;
		data: {
			originalUrl: string,
			accessCount: number,
		}
	}>(`/links/${shortCode}`);
}

export function deleteLink(shortCode: string) {
	return api.delete(`/links/${shortCode}`);
}
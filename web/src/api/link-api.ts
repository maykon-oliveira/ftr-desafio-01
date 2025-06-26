import type { Link } from "@/utils/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
	baseURL: API_URL,
});

export function findAll() {
	return api.get<Link[]>("/links");
}
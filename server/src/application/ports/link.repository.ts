import { Link } from "@/domain/entities/link";

export interface LinkRepository {
	findByShortCode(shortCode: string): Promise<Link | null>;

	save(link: Link): Promise<Link>;

	deleteByShortCode(shortCode: string): Promise<void>;
}

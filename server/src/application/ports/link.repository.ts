import { Link } from "@/domain/entities/link";

export interface LinkRepository {
	findByShortCode(shortCode: string): Promise<boolean>;

	save(link: Link): Promise<Link>;

	deleteByShortCode(shortCode: string): Promise<void>;
}

import { Link } from "@/domain/entities/link";

export interface LinkRepository {
	incrementAccessCount(shortCode: string): Promise<void>;

	findByShortCode(shortCode: string): Promise<Link | null>;

	save(link: Link): Promise<Link>;

	deleteByShortCode(shortCode: string): Promise<void>;

	findAll(): Promise<Link[]>;
}

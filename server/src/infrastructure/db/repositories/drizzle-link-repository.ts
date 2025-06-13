import { count, eq } from "drizzle-orm";
import { LinkRepository } from "@/application/ports/link.repository";
import { Link } from "@/domain/entities/link";
import { db } from "@/infrastructure/db";
import { schemas } from "@/infrastructure/db/schemas/index";

export class DrizzleLinkRepository implements LinkRepository {
	deleteByShortCode(shortCode: string): Promise<void> {
		return db
			.delete(schemas.links)
			.where(eq(schemas.links.shortCode, shortCode))
			.then(() => undefined);
	}

	findByShortCode(shortCode: string): Promise<Link | null> {
		return db
			.select()
			.from(schemas.links)
			.where(eq(schemas.links.shortCode, shortCode))
			.then(([row]) => row);
	}

	save(link: Link): Promise<Link> {
		return db
			.insert(schemas.links)
			.values({
				originalUrl: link.originalUrl,
				shortCode: link.shortCode,
			})
			.returning()
			.then(([row]) => row);
	}
}

import { eq, sql } from "drizzle-orm";
import { LinkRepository } from "@/application/ports/link.repository";
import { Link } from "@/domain/entities/link";
import { db } from "@/infrastructure/db";
import { schemas } from "@/infrastructure/db/schemas/index";

export class DrizzleLinkRepository implements LinkRepository {
	incrementAccessCount(shortCode: string): Promise<void> {
		return db
			.update(schemas.links)
			.set({
				accessCount: sql`${schemas.links.accessCount} + 1`,
			})
			.where(eq(schemas.links.shortCode, shortCode))
			.then(() => undefined);
	}

	findAll(): Promise<Link[]> {
		return db.select().from(schemas.links);
	}

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

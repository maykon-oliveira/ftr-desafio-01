import { count, eq } from "drizzle-orm";
import { LinkRepository } from "@/application/ports/link.repository";
import { Link } from "@/domain/entities/link";
import { db } from "@/infrastructure/db";
import { schemas } from "@/infrastructure/db/schemas/index";

export class DrizzleLinkRepository implements LinkRepository {
	findByShortCode(shortCode: string): Promise<boolean> {
		return db
			.select({ count: count() })
			.from(schemas.links)
			.where(eq(schemas.links.shortCode, shortCode))
			.then(([row]) => row.count > 0);
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

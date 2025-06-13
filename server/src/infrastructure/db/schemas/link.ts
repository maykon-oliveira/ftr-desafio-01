import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 as randomUUID } from "uuid";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	originalUrl: text("original_url").notNull(),
	shortCode: text("short_code").notNull().unique(),
	accessCount: integer("access_count").notNull().default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

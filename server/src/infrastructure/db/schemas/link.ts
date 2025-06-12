import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v7 as randomUUID } from "uuid";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	originalUrl: text("original_url").notNull(),
	shortCode: text("short_code").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});

import { pgTable, text } from "drizzle-orm/pg-core";
import { v7 as randomUUID } from "uuid";

export const links = pgTable("links", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
});

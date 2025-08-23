import {
	boolean,
	inet,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const monitorsTable = pgTable("monitors_table", {
	id: uuid().primaryKey().$defaultFn(() => uuidv7()),
	monitor_name: text().notNull(),
	monitor_url: varchar().notNull(),
	interval: integer().notNull(),
	isActive: boolean().default(true).notNull(),
	created_at: timestamp().defaultNow().notNull(),
	updated_at: timestamp().defaultNow().notNull(),
});

export const checksTable = pgTable("checks_table", {
	id: uuid().primaryKey().$defaultFn(() => uuidv7()),
	monitor_id: uuid().references(() => monitorsTable.id),
	status_code: text().notNull(),
	status_text: text().notNull(),
	response_time_ms: integer().notNull(),
	ttfb: integer().notNull(),
	content_type: varchar().notNull(),
	content_length: varchar().notNull(),
	server_name: varchar().notNull(),
	server_ip: inet().notNull(),
	success: boolean().notNull(),
	error: boolean().notNull(),
	error_message: text(),
	last_pinged: timestamp().notNull(),
});

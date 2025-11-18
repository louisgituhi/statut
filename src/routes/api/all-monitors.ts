import { json } from "@tanstack/react-start";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "database/db";
import * as schema from "database/schema";
import { desc } from "drizzle-orm";

type MonitorSelect = typeof schema.monitorsTable.$inferSelect;

export const ServerRoute = createServerFileRoute("/api/all-monitors").methods({
	GET: async () => {
		const monitors: MonitorSelect[] = await db
			.select()
			.from(schema.monitorsTable)
			.orderBy(desc(schema.monitorsTable.created_at));

		return json(monitors);
	},
});

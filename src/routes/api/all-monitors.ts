import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "database/db";
import { eq } from "drizzle-orm";
import * as schema from "database/schema";
import { json } from "@tanstack/react-start";

type MonitorSelect = typeof schema.monitorsTable.$inferSelect;

export const ServerRoute = createServerFileRoute("/api/all-monitors").methods({
	GET: async () => {
		const monitors: MonitorSelect[] = await db
			.select()
			.from(schema.monitorsTable);

		return json(monitors);
	},
});

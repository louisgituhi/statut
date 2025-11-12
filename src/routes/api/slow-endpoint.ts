import { createServerFileRoute } from "@tanstack/react-start/server"
import * as schema from "database/schema";
import { db } from "database/db";
import { desc, eq } from "drizzle-orm";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute("/api/slow-endpoint").methods({
	GET: async () => {
		const [slowest] = await db
			.select({
				response_time: schema.checksTable.response_time_ms,
				monitor_name: schema.monitorsTable.monitor_name,
			})
			.from(schema.checksTable)
			.innerJoin(
				schema.monitorsTable,
				eq(schema.checksTable.monitor_id, schema.monitorsTable.id),
			)
			.orderBy(desc(schema.checksTable.response_time_ms))
			.limit(1);

		return json(slowest);
	},
});

import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "database/db";
import { eq } from "drizzle-orm";
import * as schema from "database/schema";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute("/api/all-status-pages").methods({
	GET: async () => {
		const statusPages = await db
			.select()
			.from(schema.monitorsTable)
			.where(eq(schema.monitorsTable.monitor_type, "Status page"));
		return json(statusPages);
	},
});

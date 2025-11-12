import { createServerFileRoute } from "@tanstack/react-start/server";
import { db } from "database/db";
import { eq } from "drizzle-orm";
import * as schema from "database/schema";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute(
	"/api/inactive-monitors",
).methods({
	GET: async () => {
		const res = await db
			.select()
			.from(schema.monitorsTable)
			.where(eq(schema.monitorsTable.isActive, false));

		return json(res);
	},
});

import { createServerFn } from "@tanstack/react-start";
import { db } from "database/db";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import type { CheckWithMonitor } from "~/lib/definations";

type MonitorSelect = typeof schema.monitorsTable.$inferSelect;

export const getAllMonitors = createServerFn().handler(async () => {
	try {
		const monitors: MonitorSelect[] = await db
			.select()
			.from(schema.monitorsTable);

		if (monitors.length === 0) {
			throw new Error("No monitors created");
		}

		return monitors;
	} catch (error) {
		console.log("Error fetching monitors", error);
	}
});

export const getMonitorChecks = createServerFn().handler(async () => {
	try {
		const checks: CheckWithMonitor[] = await db
			.select()
			.from(schema.checksTable)
			.innerJoin(
				schema.monitorsTable,
				eq(schema.checksTable.monitor_id, schema.monitorsTable.id),
			)
			.orderBy(schema.checksTable.last_pinged);

		if (checks.length === 0) {
			throw new Error("No checks available");
		}

		return checks;
	} catch (error) {
		console.log("Error fetching checks", error);
	}
});

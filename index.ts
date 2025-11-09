import { db } from "database/db";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

async function insertMonitor() {
	const checks = await db
		.select({ response_time: schema.checksTable.response_time_ms })
		.from(schema.checksTable)
		.innerJoin(
			schema.monitorsTable,
			eq(schema.checksTable.monitor_id, schema.monitorsTable.id),
		)
		.orderBy(schema.checksTable.response_time_ms);

	console.log(Math.max(Number(checks)));
}

insertMonitor();

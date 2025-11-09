import { db } from "database/db";
import * as schema from "database/schema";
import { eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";

async function insertMonitor() {
	const data = await db
		.select()
		.from(schema.checksTable)
		.innerJoin(
			schema.monitorsTable,
			eq(schema.checksTable.monitor_id, schema.monitorsTable.id),
		);
	console.log(data);
}

insertMonitor();

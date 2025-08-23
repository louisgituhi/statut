import { task, schedules } from "@trigger.dev/sdk";
import { checksTable } from "../../database/schema.ts";
import { db } from "../../database/db.ts";
import { uuidv7 } from "uuidv7";

const url = "https://planck.louisgituhi.workers.dev/";
const monitorId = "0198d351-1f99-7c7f-b460-ac12ef8957bc";


type InsertChecks = typeof checksTable.$inferInsert;


const performHTTPRequest = schedules.task({
	id: "https-check-running every 20 minutes",
	cron: "*/20 * * * *",
	run: async () => {
		const startTime = performance.now();
		const ttfbStart = performance.now();
		const response = await fetch(url, {
			method: "GET",
		})
		const endTime = performance.now();

		const ttfb = Math.round(endTime - ttfbStart);
		const responseTime = Math.round(endTime - startTime);

		const statusCode = response.status;
		const statusText = response.statusText;

		const serverName = response.headers.get("server") || "unknown";
		const contentType = response.headers.get("content-type") || "null";
		const lastPinged = new Date();

		const checksTableData: InsertChecks = {
			id: uuidv7(),
			monitor_id: monitorId,
			status_code: statusCode.toString(),
			status_text: statusText,
			response_time_ms: Number(responseTime),
			ttfb,
			content_type: contentType,
			content_length: "6",
			server_name: serverName,
			server_ip: "198.103.8.001",
			success: true,
			error: false,
			error_message: null,
			last_pinged: lastPinged,
		};

		const checkTableErrors: InsertChecks = {
			id: uuidv7(),
			monitor_id: monitorId,
			status_code: statusCode.toString(),
			status_text: statusText,
			response_time_ms: Number(responseTime),
			ttfb,
			content_type: contentType,
			content_length: "0",
			server_name: serverName,
			server_ip: "198.103.8.001",
			success: false,
			error: true,
			error_message: "Not-found",
			last_pinged: lastPinged,
		}
		try {
			await db.insert(checksTable).values(checksTableData);

		} catch (error) {
			await db.insert(checksTable).values(checkTableErrors);
		}
	}
})

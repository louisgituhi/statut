import { schedules } from "@trigger.dev/sdk";
import { uuidv7 } from "uuidv7";
import { db } from "../../database/db.ts";
import { checksTable } from "../../database/schema.ts";

// for (const monitor of monitors) {
//const url = monitor.monitor_url;
const url = "https://planck.louisgituhi.workers.dev";
const monitorId = "0198d351-1f99-7c7f-b460-ac12ef8957bc"; //monitor.id;
const name = "planck monitor"; //monitor.monitor_name;
const interval = 60; //monitor.interval;

type InsertChecks = typeof checksTable.$inferInsert;

const _performHTTPRequest = schedules.task({
	id: `${name},${monitorId}`,
	cron: `*/${interval} * * * *`,
	run: async () => {
		const startTime = performance.now();

		let statusCode: number | null = null;
		let statusText = "";
		let serverName = "unknown";
		let contentType = "null";
		let contentLength = "0";
		let success = false;
		let error = false;
		let errorMessage: string | null = null;
		let ttfb = 0;
		let responseTime = 0;

		try {
			const response = await fetch(url, { method: "GET" });

			statusCode = response.status;
			statusText = response.statusText;
			serverName = response.headers.get("server") || "unknown";
			contentType = response.headers.get("content-type") || "null";

			const reader = response.body?.getReader();
			let totalBytes = 0;
			let firstByteTime: number | null = null;

			if (reader) {
				const firstChunk = await reader.read();
				if (!firstChunk.done) {
					totalBytes += firstChunk.value.byteLength;
					firstByteTime = performance.now();
					ttfb = Math.round(firstByteTime - startTime);
				}

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					if (value) {
						totalBytes += value.byteLength;
					}
				}
			}

			const endTime = performance.now();
			responseTime = Math.round(endTime - startTime);
			contentLength = totalBytes.toString();

			success = true;
		} catch (err: any) {
			error = true;
			errorMessage = err?.message ?? "Unknown error";
		}

		const lastPinged = new Date();

		const checksTableData: InsertChecks = {
			id: uuidv7(),
			monitor_id: monitorId,
			status_code: statusCode?.toString() ?? "0",
			status_text: statusText,
			response_time_ms: responseTime,
			ttfb,
			content_type: contentType,
			content_length: contentLength,
			server_name: serverName,
			success,
			error,
			error_message: errorMessage,
			last_pinged: lastPinged,
		};

		try {
			await db.insert(checksTable).values(checksTableData);
		} catch (dbError) {
			console.error("DB insert failed:", dbError);
		}
	},
});
//}

import { schedules } from "@trigger.dev/sdk";
import { uuidv7 } from "uuidv7";
import { db } from "../../database/db.ts";
import { checksTable } from "../../database/schema.ts";

const url = "https://planck.louisgituhi.workers.dev/";
const monitorId = "0198d351-1f99-7c7f-b460-ac12ef8957bc";

type InsertChecks = typeof checksTable.$inferInsert;

const _performHTTPRequest = schedules.task({
	id: "https-check-running every 20 minutes",
	cron: "*/20 * * * *",
	run: async () => {
		const startTime = performance.now();

		let statusCode: number | null = null;
		let statusText = "";
		let serverName = "unknown";
		let contentType = "null";
		let contentLength: string | null = null;
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

			const _ttfbMark = performance.now();
			const reader = response.body?.getReader();
			if (reader) {
				await reader.read();
			}
			const firstByteTime = performance.now();
			ttfb = Math.round(firstByteTime - startTime);

			const arrayBuffer = await response.arrayBuffer();
			const endTime = performance.now();
			responseTime = Math.round(endTime - startTime);

			contentLength =
				response.headers.get("content-length") ??
				arrayBuffer.byteLength.toString();

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
			content_length: contentLength ?? "0",
			server_name: serverName,
			success,
			error,
			error_message: errorMessage,
			last_pinged: lastPinged,
		};

		await db.insert(checksTable).values(checksTableData);
	},
});


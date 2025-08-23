import { db } from "../database/db.ts";
import { uuidv7 } from "uuidv7";
import { checksTable, monitorsTable } from "../database/schema.ts";
import { type InferInsertModel } from "drizzle-orm";

async function performHTTPRequest() {
	const startTime = performance.now();
	const data = await fetch("https://planck.louisgituhi.workers.dev/");
	const endTime = performance.now();

	const statusCode = data.status;
	const statusText = data.statusText;

	const responseTime = Math.round(endTime - startTime);
	const ttfb = Math.round(endTime - startTime);

	const serverName = data.headers.get("server") || "unknown";
	const contentType = data.headers.get("content-type") || "null";
	const lastPinged = new Date()

	type InsertCheck = typeof checksTable.$inferInsert;

	const checksData: InsertCheck = {
		id: uuidv7(),
		monitor_id: "0198d351-1f99-7c7f-b460-ac12ef8957bc",
		status_code: statusCode.toString(),
		status_text: statusText,
		response_time_ms: Number(responseTime),
		ttfb,
		content_type: contentType,
		content_length: "Planck homepage",
		server_name: serverName,
		server_ip: "118.78.191.001",
		success: true,
		error: false,
		error_message: null,
		last_pinged: lastPinged,
	}

	const errorChecksData: InsertCheck = {
		id: uuidv7(),
		monitor_id: "0198d351-1f99-7c7f-b460-ac12ef8957bc",
		status_code: statusCode.toString(),
		status_text: statusText,
		response_time_ms: Number(responseTime),
		ttfb,
		content_type: contentType,
		content_length: "Unknown",
		server_name: serverName,
		server_ip: "118.78.191.001",
		success: false,
		error: true,
		error_message: "Not-found",
		last_pinged: lastPinged,
	}

	try {
		await db.insert(checksTable).values(checksData);
	} catch (error) {
		await db.insert(checksTable).values(errorChecksData);
		console.log(error)
	}

}

performHTTPRequest()

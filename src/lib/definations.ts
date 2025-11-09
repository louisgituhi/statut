import { z } from "zod";

const MonitorType = z.object({
	id: z.string().uuid(),
	monitor_name: z.string(),
	monitor_url: z.string(),
	interval: z.number(),
	request_method: z.string().nullable(),
	monitor_type: z.string().nullable(),
	created_at: z.date(),
	updated_at: z.date(),
});

const ChecksType = z.object({
	id: z.string().uuid(),
	status_code: z.string(),
	status_text: z.string(),
	response_time_ms: z.number(),
	ttfb: z.number(),
	content_type: z.string(),
	content_length: z.string(),
	server_name: z.string(),
	success: z.boolean(),
	error: z.boolean(),
	last_pinged: z.date(),
	monitor_id: z.string().uuid().nullable(),
	error_message: z.string().nullable(),
});

export type Check = z.infer<typeof ChecksType>;
export type Monitor = z.infer<typeof MonitorType>;
export type CheckWithMonitor = {
	monitors_table: Monitor;
	checks_table: Check;
};

import { DuckDBInstance } from "@duckdb/node-api";

const instance = await DuckDBInstance.create("./statut.duckdb");

const connection = await instance.connect();

type Monitor = {
	monitor_name: string;
	monitor_url: string;
	interval: number;
	isActive: boolean;
	id: string;
};

export async function getActiveMonitors(): Promise<Monitor[]> {
	const results = await connection.runAndReadAll(`
	SELECT id, monitor_name, monitor_url, interval, isActive  
	FROM local_monitors_table
	WHERE isActive = TRUE;
`);

	// connection.closeSync();

	const rows = results.getRowsJS().map(
		([id, monitor_name, monitor_url, interval, isActive]) =>
			({
				id,
				monitor_name,
				monitor_url,
				interval,
				isActive,
			}) as Monitor,
	);
	return rows;
}

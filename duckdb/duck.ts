import { DuckDBInstance } from "@duckdb/node-api";

async function createSecretsTable() {
	const instance = await DuckDBInstance.create();
}

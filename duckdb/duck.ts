import { DuckDBInstance } from "@duckdb/node-api";

async function main() {
	const instance = await DuckDBInstance.create('statut.db');
	const connection = await instance.connect();

	await connection.run("INSTALL postgres");
	await connection.run("LOAD postgres");

	const connectionString = process.env.DATABASE_URL as string;
}

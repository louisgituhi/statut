import { DuckDBInstance } from "@duckdb/node-api";

const dbUrl = Bun.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is not set");

const instance = await DuckDBInstance.create("./statut.duckdb");
const connection = await instance.connect();

await connection.run("INSTALL postgres_scanner");
await connection.run("LOAD postgres_scanner");
await connection.run(`
	CALL postgres_attach (
		'${dbUrl}'
	)
`);

const reader = await connection.runAndReadAll('from monitors_table');
const rows = reader.getRows();

for (const row of rows) {
	console.log(row);
}

const columns = reader.getColumns();

for (const column of columns) {
	console.log(column)
}

connection.closeSync();

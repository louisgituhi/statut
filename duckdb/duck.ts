import { DuckDBInstance } from "@duckdb/node-api";

const instance = await DuckDBInstance.create('./statut.duckdb');
const connection = await instance.connect();

await connection.run(`
	INSTALL postgres_scanner;
`)
	.then(() => console.log('postgres scanner installed successfully'))
	.catch((e) => console.log('Error installing', e));

await connection.run(`
 	LOAD postgres_scanner;
`)
	.then(() => console.log('Attached successfully'))
	.catch((e) => console.log('Error loading', e));


// copy all data from  neon to local

await connection.run(`
 	CREATE TABLE local_monitors_table AS
 	SELECT * FROM statut.monitors_table
`)
	.then(() => console.log('monitors data copied locally'))
	.catch((e) => console.log('Error creating table', e));

await connection.run(`
 	CREATE TABLE local_checks_table AS
	SELECT  * FROM statut.checks_table
`)
	.then(() => console.log('checks table data copied locally'))
	.catch((e) => console.log('Error creating table', e));


const result = await connection.runAndReadAll(`
	PRAGMA show_tables
`);

console.table(result.getRows());

connection.closeSync();

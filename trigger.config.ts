import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
	project: "proj_mpotnereofnlntpwjzyi",
	runtime: "bun",
	logLevel: "log",
	// The max compute seconds a task is allowed to run. If the task run exceeds this duration, it will be stopped.
	// You can override this on an individual task.
	// See https://trigger.dev/docs/runs/max-duration
	maxDuration: 3600,
	build: {
		external: [
			"@duckdb/node-bindings", // the base package
			"@duckdb/node-bindings-linux-arm64",
			"@duckdb/node-bindings-darwin-arm64",
			"@duckdb/node-bindings-darwin-x64",
			"@duckdb/node-bindings-win32-x64",
		],
		autoDetectExternal: true,
	},
	retries: {
		enabledInDev: true,
		default: {
			maxAttempts: 3,
			minTimeoutInMs: 1000,
			maxTimeoutInMs: 10000,
			factor: 2,
			randomize: true,
		},
	},
	dirs: ["./src/trigger"],
});

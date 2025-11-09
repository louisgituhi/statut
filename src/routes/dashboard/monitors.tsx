import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	type ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import {
	Table,
	TableHead,
	TableBody,
	TableHeader,
	TableRow,
	TableCell,
} from "~/components/ui/table";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getMonitorChecks } from "../api/server-fns";
import type { CheckWithMonitor } from "~/lib/definations";
import SlowestEndpointCard from "~/components/slowest-endpoint";
import InactiveMonitorsCard from "~/components/inactive-monitor";
export const Route = createFileRoute("/dashboard/monitors")({
	loader: () => getMonitorChecks(),
	component: RouteComponent,
});

function MonitorChecksTable() {
	const getChecks = useServerFn(getMonitorChecks);
	const { data } = useQuery({
		queryKey: ["checks"],
		queryFn: () => getChecks(),
	});

	return (
		<div className="container mx-auto py-10">
			<h1>Table here!!</h1>
		</div>
	);
}

function RouteComponent() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<h1 className="">Monitors</h1>
			<p className=" text-xs text-gray-800">Create and manage your monitors.</p>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
				<Card className="border-green-600 bg-green-100">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Normal</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-semibold font-inter">3</div>
					</CardContent>
				</Card>
				<Card className="border-yellow-600 bg-yellow-100">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Degraded</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-semibold font-inter">1</div>
					</CardContent>
				</Card>
				<Card className="border-red-600 bg-red-100">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Failing</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-lg font-semibold font-inter">1</div>
					</CardContent>
				</Card>
				<InactiveMonitorsCard />
				<SlowestEndpointCard />
			</div>
			<div>
				<h1 className=" mt-4">Table</h1>
				<MonitorChecksTable />
			</div>
		</div>
	);
}

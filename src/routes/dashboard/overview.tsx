import { HugeiconsIcon } from "@hugeicons/react";
import { Tv01Icon, Layers02Icon } from "@hugeicons/core-free-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getAllMonitors } from "../api/server-fns";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import StatuspageCard from "~/components/status-page";

const MonitorIcon = () => (
	<HugeiconsIcon icon={Tv01Icon} size={16} color="#2323FF" />
);
const StatusIcon = () => (
	<HugeiconsIcon icon={Layers02Icon} size={16} color="#2CFF05" />
);

export const Route = createFileRoute("/dashboard/overview")({
	loader: async () => getAllMonitors(),
	component: RouteComponent,
});

function RouteComponent() {
	const getMonitors = useServerFn(getAllMonitors);

	const { data } = useQuery({
		queryKey: ["monitors"],
		queryFn: () => getMonitors(),
	});

	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<h1 className="">Overview</h1>
			<p className=" text-xs text-gray-800">
				Welcome to your statut dashboard.
			</p>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total monitors
						</CardTitle>
						<MonitorIcon />
					</CardHeader>
					<CardContent>
						<div className="text-xl font-bold font-inter">{data?.length}</div>
					</CardContent>
				</Card>
				<StatuspageCard />
				<div className="bg-muted/50 aspect-video rounded-xl" />
				<div className="bg-muted/50 aspect-video rounded-xl" />
			</div>
			<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
		</div>
	);
}

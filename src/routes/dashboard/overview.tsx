import { createFileRoute } from "@tanstack/react-router";
import StatuspageCard from "~/components/status-page";
import AllMonitorsCard from "~/components/all-monitors";

export const Route = createFileRoute("/dashboard/overview")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<h1 className="">Overview</h1>
			<p className=" text-xs text-gray-800">
				Welcome to your statut dashboard.
			</p>
			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
				<AllMonitorsCard />
				<StatuspageCard />
				<div className="bg-muted/50 aspect-video rounded-xl" />
				<div className="bg-muted/50 aspect-video rounded-xl" />
			</div>
			<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
		</div>
	);
}

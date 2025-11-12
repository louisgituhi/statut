import { HugeiconsIcon } from "@hugeicons/react";
import { Tv01Icon, Alert02Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const MonitorIcon = () => (
	<HugeiconsIcon icon={Tv01Icon} size={16} color="#2323FF" />
);
const AlertIcon = () => (
	<HugeiconsIcon icon={Alert02Icon} size={16} color="#FFEF00" />
);

export default function AllMonitorsCard() {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["all-monitors"],
		queryFn: async () => {
			const allMonitors = await fetch("/api/all-monitors");
			if (!allMonitors.ok) throw new Error("Unable to fetch inactive monitors");
			return await allMonitors.json();
		},
	});

	if (isError) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs font-medium">All Monitors</CardTitle>
					<AlertIcon />
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						{error?.message ?? "Failed to load data"}
					</p>
				</CardContent>
			</Card>
		);
	}

	if (isPending) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-4 rounded-full" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-6 w-10 rounded-md" />
				</CardContent>
			</Card>
		);
	}

	if (!data || data.length === 0) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs font-medium">All Monitors</CardTitle>
					<AlertIcon />
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">No monitors available</p>
				</CardContent>
			</Card>
		);
	}
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">All Monitors</CardTitle>
				<MonitorIcon />
			</CardHeader>
			<CardContent>
				<div className="text-xl font-bold font-inter">{data?.length}</div>
			</CardContent>
		</Card>
	);
}

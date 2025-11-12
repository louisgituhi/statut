import { HugeiconsIcon } from "@hugeicons/react";
import { ToggleOffIcon, Alert02Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ToggleIcon = () => <HugeiconsIcon icon={ToggleOffIcon} size={16} />;
const AlertIcon = () => (
	<HugeiconsIcon icon={Alert02Icon} size={16} color="#FFEF00" />
);

export default function InactiveMonitorsCard() {
	const { data, isPending, error, isError } = useQuery({
		queryKey: ["inactive-monitor"],
		queryFn: async () => {
			const inactiveMonitors = await fetch("/api/inactive-monitors");
			if (!inactiveMonitors.ok)
				throw new Error("Unable to fetch inactive monitors");
			return await inactiveMonitors.json();
		},
	});

	if (isError) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs font-medium">
						Inactive monitors
					</CardTitle>
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
					<CardTitle className="text-xs font-medium">
						Inactive monitors
					</CardTitle>
					<ToggleIcon />
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">No inactive monitors</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs font-medium">Inactive monitors</CardTitle>
				<ToggleIcon />
			</CardHeader>
			<CardContent>
				<div className="text-lg font-semibold font-inter">{data.length}</div>
			</CardContent>
		</Card>
	);
}

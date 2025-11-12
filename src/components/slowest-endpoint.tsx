import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const AlertIcon = () => (
	<HugeiconsIcon icon={Alert02Icon} size={16} color="#FFEF00" />
);

export default function SlowestEndpointCard() {
	const { data, isError, isPending, error } = useQuery({
		queryKey: ["slowest-endpoint"],
		queryFn: async () => {
			const slowEndpoint = await fetch("/api/slow-endpoint");
			if (!slowEndpoint.ok)
				throw new Error("Unable to fetch inactive monitors");
			return await slowEndpoint.json();
		},
	});

	if (isError) {
		return (
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-xs font-medium">
						Slowest endpoint
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
						Slowest endpoint
					</CardTitle>
					<AlertIcon />
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">No checks available</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xs font-medium">Slowest endpoint</CardTitle>
				<AlertIcon />
			</CardHeader>
			<CardContent>
				<div className="text-lg font-semibold font-inter">
					{data.response_time} ms
				</div>
			</CardContent>
		</Card>
	);
}

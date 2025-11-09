import { HugeiconsIcon } from "@hugeicons/react";
import { Layers02Icon } from "@hugeicons/core-free-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { getStatusPages } from "~/routes/api/server-fns";

const StatusIcon = () => (
	<HugeiconsIcon icon={Layers02Icon} size={16} color="#2CFF05" />
);

export default function StatuspageCard() {
	const getStatusPage = useServerFn(getStatusPages);

	const { data } = useQuery({
		queryKey: ["status-page"],
		queryFn: () => getStatusPage(),
	});
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Total Status Page</CardTitle>
				<StatusIcon />
			</CardHeader>
			<CardContent>
				<div className="text-xl font-bold font-inter">{data?.length}</div>
			</CardContent>
		</Card>
	);
}

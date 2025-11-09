import { HugeiconsIcon } from "@hugeicons/react";
import { ToggleOffIcon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { getInctiveMonitor } from "~/routes/api/server-fns";

const ToggleIcon = () => <HugeiconsIcon icon={ToggleOffIcon} size={16} />;

export default function InactiveMonitorsCard() {
	const getInactive = useServerFn(getInctiveMonitor);
	const { data } = useQuery({
		queryKey: ["inactive-monitor"],
		queryFn: () => getInactive(),
	});

	if (!data) {
		return null;
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

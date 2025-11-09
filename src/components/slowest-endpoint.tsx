import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSlowestEndpoint } from "~/routes/api/server-fns";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";

const AlertIcon = () => (
	<HugeiconsIcon icon={Alert02Icon} size={16} color="#FFEF00" />
);
export default function SlowestEndpointCard() {
	const getSlowest = useServerFn(getSlowestEndpoint);
	const { data } = useQuery({
		queryKey: ["slowest-endpoint"],
		queryFn: () => getSlowest(),
	});

	if (!data) {
		return null;
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

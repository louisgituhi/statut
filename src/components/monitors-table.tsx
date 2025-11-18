import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

type Monitor = {
	id: string;
	monitor_name: string;
	interval: number;
	isActive: boolean;
	request_method: string;
	monitor_type: string;
	created_at: string;
};

const formatDate = (iso: string) => {
	const d = new Date(iso);
	return d.toLocaleString("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const columnHelper = createColumnHelper<Monitor>();

const columns = [
	columnHelper.accessor((row) => row.monitor_name, {
		id: "Name",
		cell: (info) => <span className="font-medium">{info.getValue()}</span>,
		header: () => <span>Monitor name</span>,
	}),
	columnHelper.accessor("interval", {
		header: () => "Interval",
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("isActive", {
		header: () => "isActive",
		cell: (info) =>
			info.getValue() ? (
				<span className="bg-green-100 text-green-600 px-2 py-0.5 text-xs font-medium rounded-none border border-green-200">
					Yes
				</span>
			) : (
				<span className="bg-red-100 text-red-600 px-2 py-0.5 text-xs font-medium rounded-none border border-red-200">
					No
				</span>
			),
	}),
	columnHelper.accessor("monitor_type", {
		header: "Monitor type",
	}),
	columnHelper.accessor("created_at", {
		header: "Created at",
		cell: (info) => (
			<span className="text-gray-600">{formatDate(info.getValue())}</span>
		),
	}),
];

export default function MonitorsTable() {
	const { data: monitors } = useQuery({
		queryKey: ["monitors"],
		queryFn: async (): Promise<Array<Monitor>> => {
			const res = await fetch("/api/all-monitors");
			return await res.json();
		},
	});

	const data = React.useMemo(() => {
		return monitors?.map((m) => ({ ...m })) ?? [];
	}, [monitors]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div>
			<div className=" shadow-sm overflow-hidden ">
				<Table>
					<TableHeader className="bg-[#FF5C00] text-xs font-semibold ">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								className="hover:bg-gray-100/60 cursor-pointer text-xs"
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										<Link
											to={`/monitors/${row.original.id}`}
											className="block w-full h-full py-2"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</Link>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

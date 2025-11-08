import { HugeiconsIcon } from "@hugeicons/react";
import {
	Setting07Icon,
	DashboardSquare03Icon,
	Tv01Icon,
	Notification02Icon,
	Layers02Icon,
	CircleIcon,
	PlusSignSquareIcon,
} from "@hugeicons/core-free-icons";
import { VersionSwitcher } from "~/components/version-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "~/components/ui/sidebar";

const SettingIcon = () => <HugeiconsIcon icon={Setting07Icon} size={16} />;
const OverviewIcon = () => (
	<HugeiconsIcon icon={DashboardSquare03Icon} size={16} />
);
const MonitorIcon = () => <HugeiconsIcon icon={Tv01Icon} size={16} />;
const NotificationIcon = () => (
	<HugeiconsIcon icon={Notification02Icon} size={16} />
);
const StatusIcon = () => <HugeiconsIcon icon={Layers02Icon} size={16} />;
const CircleIconComp = () => <HugeiconsIcon icon={CircleIcon} size={10} />;

const data = {
	navMain: [
		{
			title: "Workspace",
			url: "#",
			items: [
				{
					title: "Overview",
					url: "#",
					icon: OverviewIcon,
				},
				{
					title: "Monitors",
					url: "#",
					icon: MonitorIcon,
				},
				{
					title: "Status Page",
					url: "#",
					icon: StatusIcon,
				},
				{
					title: "Notifiers",
					url: "#",
					icon: NotificationIcon,
				},
				{
					title: "Settings",
					url: "#",
					icon: SettingIcon,
				},
			],
		},
		{
			title: "Status Pages (1)",
			url: "#",
			items: [
				{
					title: "Astro pages",
					url: "#",
					icon: CircleIconComp,
				},
			],
		},
		{
			title: "Monitors (3)",
			url: "#",
			items: [
				{
					title: "Planck dev",
					url: "#",
					icon: CircleIconComp,
				},
				{
					title: "Create monitor",
					url: "#",
					icon: CircleIconComp,
				},
				{
					title: "cloudflare route",
					url: "#",
					icon: CircleIconComp,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher />
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton>
											<a
												className="text-xs font-light flex items-center gap-1"
												href={item.url}
											>
												{item.icon && <item.icon />}
												{item.title}
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

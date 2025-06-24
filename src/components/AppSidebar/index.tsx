import * as React from 'react';
import {
    LayoutGrid,
    UsersRound,
    UserRound,
    Clipboard,
    Contact,
    ShoppingBag,
    ShieldBan,
    UserRoundPen,
    FolderKanban,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavLink } from 'react-router';
import NavUser from './navUser';

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const currentUser = {
        role: 'Admin',
    };

    const items = [];
    switch (currentUser?.role) {
        case 'Admin':
        case 'Management':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                {
                    title: 'Marketing Profile',
                    url: '/dashboard/marketing-profile',
                    icon: <ShoppingBag />,
                    end: true,
                },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'Teams', url: '/dashboard/team', icon: <Contact />, end: true },
                { title: 'Members', url: '/dashboard/member', icon: <UsersRound />, end: true },
                { title: 'Users', url: '/dashboard/users', icon: <UserRound />, end: true },
            );
            break;
        case 'Operation':
        case 'SQA':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                { title: 'Projects', url: '/dashboard/projects', icon: <Clipboard />, end: false },
                { title: 'My Team', url: '/dashboard/my-team', icon: <Contact />, end: true }
            );
            break;

        case 'Sells':
            items.push(
                { title: 'Dashboard', url: '/dashboard', icon: <LayoutGrid />, end: true },
                {
                    title: 'Select Profiles',
                    url: '/dashboard/selectProfile',
                    icon: <UserRoundPen />,
                    end: false,
                },
                {
                    title: 'Mange Profile',
                    url: '/dashboard/mange-profile',
                    icon: <FolderKanban />,
                    end: false,
                },
                { title: 'My Team', url: '/dashboard/my-team', icon: <Contact />, end: true },
            );
            break;

        default:
            items.push({ title: 'Not Authorized User', icon: <ShieldBan /> });
            break;
    }

    if (items.length < 0) {
        return;
    }

    return (
        <section>
            <Sidebar
                collapsible="icon"
                {...props}
                className="pt-[60px]"
            >
                <SidebarTrigger
                    size={'lg'}
                    className="text-muted-foreground !size-10 self-end m-1"
                />

                <SidebarContent>
                    <SidebarMenu className="px-2">
                        {items.map((item, i) => (
                            <SidebarMenuItem key={i}>
                                <NavLink
                                    to={item?.url as string}
                                    end={item?.end}
                                    className={({ isActive }) =>
                                        `w-full ${isActive ? 'bg-white text-primary' : 'text-[#797979]'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <SidebarMenuButton
                                            size="lg"
                                            tooltip={item?.title}
                                            className={`w-full hover:bg-gradient-to-r from-primary/50 to-primary/10 text-foreground ${isActive ? 'bg-gradient-to-r from-primary/50 to-primary/10 !text-foreground shadow-sm' : ''
                                                }`}
                                        >
                                            <span className="!size-7 transition-colors pl-0.5">
                                                {item.icon}
                                            </span>
                                            <h4 className="text-lg text-nowrap duration-300">
                                                {item.title}
                                            </h4>
                                        </SidebarMenuButton>
                                    )}
                                </NavLink>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </section>
    );
}

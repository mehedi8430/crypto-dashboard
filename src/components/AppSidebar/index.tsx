import * as React from "react";
import {
  LayoutGrid,
  Clipboard,
  Contact,
  ShoppingBag,
  ShieldBan,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
// import NavUser from "./navUser";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state, toggleSidebar } = useSidebar();

  const currentUser = {
    role: "Admin",
  };

  const items = [];
  switch (currentUser?.role) {
    case "Admin":
      items.push(
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutGrid />,
          end: true,
        },
        {
          title: "Report",
          url: "/dashboard/report",
          icon: <ShoppingBag />,
          end: true,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: <Clipboard />,
          end: false,
        },
        {
          title: "Setting",
          url: "/dashboard/etting",
          icon: <Contact />,
          end: true,
        }
      );
      break;

    default:
      items.push({ title: "Not Authorized User", icon: <ShieldBan /> });
      break;
  }

  if (items.length < 0) {
    return;
  }

  return (
    <section>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <div className="pb-8 pt-2 flex items-center justify-center">
            {state === "collapsed" ? (
              <h1 className="lg:w-[180px] text-[24px] font-bold lg:text-center text-primary dark:text-foreground mr-3 mt-1">
                L
              </h1>
            ) : (
              <h1 className="lg:w-[180px] text-[24px] font-bold lg:text-center text-primary dark:text-foreground">
                Logoipsum
              </h1>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-end absolute top-2 right-2 "
          >
            <X />
          </button>

          <SidebarMenu className="">
            {items.map((item, i) => (
              <SidebarMenuItem key={i}>
                <NavLink
                  to={item?.url as string}
                  end={item?.end}
                  className={({ isActive }) =>
                    `w-full ${
                      isActive ? "bg-white text-primary" : "text-[#797979]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <SidebarMenuButton
                      size="lg"
                      tooltip={item?.title}
                      className={`w-full hover:bg-gradient-to-r from-primary/50 to-primary/10 text-foreground rounded-none ${
                        isActive
                          ? "bg-gradient-to-r from-primary/50 to-primary/10 !text-foreground shadow-sm"
                          : ""
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

        {/* <SidebarFooter>
          <NavUser />
        </SidebarFooter> */}
        <SidebarRail />
      </Sidebar>
    </section>
  );
}

import * as React from "react";
import {
  LayoutGrid,
  Clipboard,
  ShoppingBag,
  ShieldBan,
} from "lucide-react";
import { type Sidebar } from "@/components/ui/sidebar";
import NavSidebar from "./navSidebar";
import type { NavItem } from "@/types";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const currentUser = {
    role: "Admin",
  };

  const items: NavItem[] = [];
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
          title: "Allocations",
          icon: <Clipboard />,
          end: false,
          childLinks: [
            {
              title: "Allocation A",
              url: "/dashboard/allocations/a",
            },
            {
              title: "Allocation B",
              url: "/dashboard/allocations/b",
            },
            {
              title: "Allocation C",
              url: "/dashboard/allocations/c",
            },
            {
              title: "Allocation D",
              url: "/dashboard/allocations/d",
            },
          ],
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
      <NavSidebar navItems={items} props={props} />
    </section>
  );
}
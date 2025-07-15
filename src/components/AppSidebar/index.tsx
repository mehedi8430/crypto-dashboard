import * as React from "react";
import {
  LayoutGrid,
  Clipboard,
  ShoppingBag,
  ShieldBan,
  Users,
} from "lucide-react";
import { type Sidebar } from "@/components/ui/sidebar";
import NavSidebar from "./navSidebar";
import type { NavItem } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useAuth();

  const items: NavItem[] = [
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
    },
  ];

  
  if (currentUser?.role === "ADMIN") {
    items.push({
      title: "User Management",
      url: "/dashboard/users",
      icon: <Users />,
      end: true,
    });
    items.push({
      title: "Data Forms",
      url: "/dashboard/create-data-forms",
      icon: <Clipboard />,
      end: true,
    });
  }


  if (!currentUser) {
    items.push({ title: "Not Authorized User", icon: <ShieldBan /> });
  }

  if (items.length === 0) {
    return null;
  }
  return (
    <section>
      <NavSidebar navItems={items} props={props} />
    </section>
  );
}
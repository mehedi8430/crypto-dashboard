import * as React from "react";
import {
  LayoutGrid,
  Clipboard,
  ShoppingBag,
  ShieldBan,
  Users,
  PlusCircle, // Import the PlusCircle icon
} from "lucide-react";
import { type Sidebar } from "@/components/ui/sidebar";
import NavSidebar from "./navSidebar";
import type { NavItem, TAllocation } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useAllocations } from "@/queries/cryptoQueries";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useAuth();

  const { data } = useAllocations();

  const allocations =
    data &&
    data?.data.map((item: TAllocation) => ({
      title: `Allocation ${item.key.toUpperCase()}`,
      url: `/dashboard/allocations/${item.key.toLowerCase()}`,
    }));

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
      childLinks: allocations,
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
    // Add the new "Add Allocation" button for admins
    items.push({
      title: "Allocation Management",
      url: "/dashboard/allocation-management",
      icon: <PlusCircle />,
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

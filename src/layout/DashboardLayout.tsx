import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/provider/theme/theme-provider";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider
          defaultOpen={
            typeof window !== "undefined"
              ? localStorage.getItem("sidebar-collapsed") !== "true"
              : true
          }
          className="flex flex-col"
        >
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="">
              <TopBar />
              <div className="flex flex-1 flex-col gap-4 p-4">
                <Outlet />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}

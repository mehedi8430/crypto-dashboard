import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
              <ScrollArea className="h-[93.5vh]">
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <Outlet />
                </div>
              </ScrollArea>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}

// import { ArrowBigLeft } from "lucide-react";
import { ModeToggle } from "../ThemeToggle";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function TopBar() {
  const { isMobile } = useSidebar();

  return (
    <section className="w-full h-[60px] border border-border flex items-center sticky top-0 z-40 bg-sidebar">
      {/* Sidebar trigger for mobile view */}
      <SidebarTrigger
        className={`text-muted-foreground ml-auto mt-2.5 mr-2.5 ${
          isMobile ? "block" : "hidden"
        }`}
      />

      <div className="flex justify-between items-center w-full px-6">
        <p>Dashboard</p>

        <ModeToggle />
      </div>
    </section>
  );
}

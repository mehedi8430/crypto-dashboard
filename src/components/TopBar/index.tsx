import { ModeToggle } from "../ThemeToggle";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function TopBar() {
  const { isMobile } = useSidebar();

  return (
    <section className="w-full h-[60px] border border-border flex items-center px-6 sticky top-0 z-50 bg-sidebar">
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className={`text-muted-foreground ml-auto mt-2.5 mr-2.5 ${
            isMobile ? "block" : "hidden"
          }`}
        />

      </div>
      <SidebarTrigger
        size={"lg"}
        className="text-muted-foreground !size-10 self-end m-1"
      />
      <div className="flex justify-between items-center w-full">
        <p>Dashboard</p>

        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </section>
  );
}

// import { ArrowBigLeft } from "lucide-react";
import { ModeToggle } from "../ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";

export default function TopBar() {
  return (
    <section className="w-full h-[60px] border border-border flex items-center gap-2 z-40 bg-sidebar">
      <div className="relative">
        <SidebarTrigger className="text-muted-foreground p-6 absolute -top-9.5 -left-2.5 md:-left-10 cursor-pointer" />
      </div>

      <div className="flex justify-between items-center w-full px-9 md:px-6">
        <p className="text-lg font-semibold">Dashboard</p>

        <ModeToggle />
      </div>
    </section>
  );
}

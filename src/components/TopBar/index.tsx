import { ModeToggle } from "../ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import { ReactSVG } from "react-svg";
import MyNotificationSVG from "@/assets/icons/notification 01.svg";
import SearchInput from "../SearchInput";
import { useState } from "react";
import { useTitleStore } from "@/stores/titleStore";

export default function TopBar() {
  const [value, setValue] = useState<string>("");
  const { title } = useTitleStore()

  return (
    <section className="w-full h-[3.75rem] border border-border flex items-center gap-2 z-40 bg-sidebar">
      <div className="relative">
        <SidebarTrigger className="text-muted-foreground p-6 absolute -top-9.5 -left-2.5 md:-left-10 cursor-pointer" />
      </div>

      <div className="flex justify-between items-center w-full px-9 md:px-6">
        <p className="text-xl text-foreground font-semibold">{title}</p>

        <div className="flex items-center gap-8">
          <div className="max-md:hidden">
            <SearchInput
              value={value}
              onChange={(value) => {
                console.log({ value });
                setValue(value);
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            <ReactSVG src={MyNotificationSVG} className="" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </section>
  );
}

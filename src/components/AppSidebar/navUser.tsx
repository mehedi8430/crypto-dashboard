import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLogout } from "@/queries/authQueries";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AlertDialogModal } from "../AlertDialogModal";

export default function NavUser() {
  const logout = useLogout();
  const userData = useAuth();

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={userData?.img} alt={userData?.fullName} />
                  <AvatarFallback className="rounded-lg">
                    {userData?.fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userData?.fullName}
                  </span>
                  <span className="truncate font-medium">
                    {userData?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-[180px] rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData?.img} alt={userData?.fullName} />
                    <AvatarFallback className="rounded-lg">
                      {userData?.fullName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userData?.fullName}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setIsLogoutOpen(true);
                }}
              >
                <LogOut />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <AlertDialogModal
        isOpen={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        onConfirm={logout.mutate}
      />
    </>
  );
}

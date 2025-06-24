import { ModeToggle } from '../ThemeToggle';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';

export default function TopBar() {
    const { isMobile } = useSidebar();

    return (
        <section className="w-full h-[60px] border border-border flex items-center justify-between px-6 sticky top-0 z-50 bg-sidebar">
            <div className="flex items-center gap-4">
                <SidebarTrigger
                    className={`text-muted-foreground ml-auto mt-2.5 mr-2.5 ${isMobile ? 'block' : 'hidden'
                        }`}
                />
                <h1 className="lg:w-[180px] text-[24px] font-bold lg:text-center text-primary dark:text-foreground">
                    Logoipsum
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
            </div>
        </section>
    );
}

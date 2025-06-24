import { ModeToggle } from '../ThemeToggle';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';

export default function TopBar() {
    const { isMobile } = useSidebar();

    return (
        <section className="w-full h-[60px] border-b-2 border-border flex items-center justify-between px-6 sticky top-0 z-50 bg-background">
            <div className="flex items-center gap-4">
                <SidebarTrigger
                    className={`text-muted-foreground ml-auto mt-2.5 mr-2.5 ${isMobile ? 'block' : 'hidden'
                        }`}
                />
                <h1 className="lg:w-[180px] text-[24px] font-bold lg:text-center">
                    Sof<span className="text-primary">t</span>vence
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <ModeToggle />
            </div>
        </section>
    );
}

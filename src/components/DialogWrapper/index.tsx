import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type DialogWrapperProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: () => void;
  cancelText?: string;
  showButtons?: boolean;
  className?: string;
};

export function DialogWrapper({
  isOpen,
  onOpenChange,
  title,
  children,
  onConfirm,
  confirmText = "Save",
  onCancel,
  cancelText = "Cancel",
  showButtons = false,
  className = "",
}: DialogWrapperProps) {
  const isMobile = useIsMobile();
  console.log({ isMobile });

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="border-b !pb-4 text-xl font-semibold">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="h-auto max-h-[70vh] overflow-y-auto px-4 py-3">
            {children}
          </div>
          {showButtons && (
            <DrawerFooter className="flex flex-col gap-2 px-4 pb-4 sm:flex-row">
              {onCancel && (
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="w-full sm:w-auto"
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  variant="default"
                  onClick={onConfirm}
                  className="w-full sm:w-auto"
                >
                  {confirmText}
                </Button>
              )}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[95%] p-0 sm:w-[90%] md:w-[80%] lg:!max-w-2xl",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="border-b p-5 text-2xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="h-auto max-h-[80vh] overflow-y-auto px-4 py-3">
          {children}
        </div>
        {showButtons && (
          <DialogFooter>
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button variant="default" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

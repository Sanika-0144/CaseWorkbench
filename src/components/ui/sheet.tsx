import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-slate-900/30" />
        <DialogPrimitive.Content className="drawer-panel fixed inset-y-0 right-0 z-[60] flex w-[min(440px,100%)] flex-col border-l border-slate-200 bg-white shadow-lift">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
            <div>
              <DialogPrimitive.Title className="text-[20px] font-semibold">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-[13px] text-slate-600">
                {description ?? "Raw source values are preserved beside the standardised value."}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Close evidence drawer"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-auto px-6 py-4">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

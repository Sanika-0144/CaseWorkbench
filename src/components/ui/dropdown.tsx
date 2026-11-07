import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Menu({
  trigger,
  children,
  align = "end",
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "end" | "center";
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={8}
          className="z-[80] min-w-48 rounded-2xl border border-slate-200 bg-white p-1 shadow-lift"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function MenuItem({
  children,
  onSelect,
  active,
}: {
  children: ReactNode;
  onSelect?: () => void;
  active?: boolean;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        "cursor-pointer rounded-xl px-3 py-2 text-[13px] text-slate-700 outline-none data-[highlighted]:bg-slate-100",
        active && "bg-indigo-50 text-indigo-900",
      )}
    >
      {children}
    </DropdownMenu.Item>
  );
}

import type { PriorityBand } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<PriorityBand, string> = {
  High: "bg-rose-50 text-rose-800 ring-rose-200",
  Medium: "bg-amber-50 text-amber-900 ring-amber-200",
  Routine: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

export function PriorityPill({ band }: { band: PriorityBand }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ring-1 ring-inset",
        styles[band],
      )}
    >
      <span className="sr-only">Priority</span>
      {band}
    </span>
  );
}

import {
  AlertTriangle,
  Check,
  CircleDashed,
  Clock3,
  Link2Off,
  Timer,
} from "lucide-react";
import type { DataStatus } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<DataStatus, string> = {
  Verified: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Conflict: "bg-orange-50 text-orange-900 ring-orange-200",
  Stale: "bg-amber-50 text-amber-900 ring-amber-200",
  Unmatched: "bg-purple-50 text-purple-800 ring-purple-200",
  Missing: "border border-dashed border-slate-300 bg-transparent text-slate-600",
  Pending: "bg-blue-50 text-blue-800 ring-blue-200",
};

const icons = {
  Verified: Check,
  Conflict: AlertTriangle,
  Stale: Clock3,
  Unmatched: Link2Off,
  Missing: CircleDashed,
  Pending: Timer,
};

export function StatusChip({ status }: { status: DataStatus }) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium ring-1 ring-inset",
        styles[status],
        status === "Missing" && "ring-0",
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {status}
    </span>
  );
}

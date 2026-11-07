import { ShieldCheck, Sparkles } from "lucide-react";

export function AIBadge({ template = false }: { template?: boolean }) {
  if (template) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-medium text-slate-700 ring-1 ring-inset ring-slate-200">
        Template
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[12px] font-medium text-violet-800 ring-1 ring-inset ring-violet-200">
      <Sparkles className="h-3 w-3" aria-hidden />
      ✦ AI draft
    </span>
  );
}

export function VerifiedMark({ label = "Human verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-800">
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}

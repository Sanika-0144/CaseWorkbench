import { Sheet } from "@/components/ui/sheet";
import { StatusChip } from "@/components/shared/StatusChip";
import { useWorkbench } from "@/store/workbench";

export function EvidenceDrawer() {
  const evidence = useWorkbench((s) => s.evidence);
  const title = useWorkbench((s) => s.evidenceTitle);
  const close = useWorkbench((s) => s.closeEvidence);

  return (
    <Sheet
      open={Boolean(evidence)}
      onOpenChange={(open) => {
        if (!open) close();
      }}
      title={title || "Evidence"}
      description="Source values stay side by side. This drawer never overwrites one record with another."
    >
      {evidence ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip status={evidence.status} />
            <span className="text-[12px] text-slate-500">Record {evidence.recordId}</span>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <dt className="text-[12px] text-slate-500">Source</dt>
              <dd className="mt-1 font-medium">{evidence.source}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">Status</dt>
              <dd className="mt-1 font-medium">{evidence.status}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">Effective date</dt>
              <dd className="mt-1 tabular-nums">{evidence.effectiveDate}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">Received date</dt>
              <dd className="mt-1 tabular-nums">{evidence.receivedDate}</dd>
            </div>
          </dl>
          <div className="grid gap-4">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">
                Raw source value
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-[14px] leading-6 text-slate-900">
                {evidence.raw}
              </p>
            </section>
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
              <h3 className="text-[12px] font-semibold uppercase tracking-wide text-indigo-700">
                Standardised value
              </h3>
              <p className="mt-2 whitespace-pre-wrap text-[14px] leading-6 text-slate-900">
                {evidence.standardized}
              </p>
            </section>
          </div>
          {evidence.note ? (
            <p className="text-[13px] leading-5 text-slate-600">{evidence.note}</p>
          ) : null}
          <p className="text-[12px] leading-5 text-slate-500">
            The newest value is not chosen automatically. A person verifies conflicts before the case changes.
          </p>
        </div>
      ) : null}
    </Sheet>
  );
}

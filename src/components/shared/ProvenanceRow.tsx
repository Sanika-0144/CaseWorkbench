import type { Provenance } from "@/types";
import { useWorkbench } from "@/store/workbench";
import { StatusChip } from "@/components/shared/StatusChip";

export function ProvenanceRow({
  provenance,
  title,
}: {
  provenance: Provenance;
  title?: string;
}) {
  const openEvidence = useWorkbench((s) => s.openEvidence);
  return (
    <button
      type="button"
      onClick={() => openEvidence(provenance, title)}
      className="mt-2 flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg text-left text-[12px] text-slate-600 transition duration-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <span className="font-medium text-slate-700">{provenance.source}</span>
      <span>Eff {provenance.effectiveDate}</span>
      <span>Rcv {provenance.receivedDate}</span>
      <StatusChip status={provenance.status} />
    </button>
  );
}

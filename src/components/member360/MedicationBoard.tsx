import type { MedicationRow } from "@/types";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";
import { InfoTip } from "@/components/shared/InfoTip";

const columns = [
  ["ordered", "Ordered"],
  ["dispensed", "Dispensed"],
  ["reported", "Patient-reported"],
  ["administered", "Administered"],
] as const;

export function MedicationBoard({ rows }: { rows: MedicationRow[] }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="text-[16px] font-semibold">Medication reconciliation</h3>
        <InfoTip label="Why we show both medication records">
          Ordered, dispensed, patient-reported, and administered records come from different systems. A newer value is not automatically the correct one. Conflicts stay side by side until a clinician verifies them.
        </InfoTip>
      </div>
      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.id}>
            <p className="text-[14px] font-medium">{row.name}</p>
            <div className="mt-2 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {columns.map(([key, label]) => (
                <div key={key} className="min-w-0 rounded-xl border border-slate-200/80 bg-white/70 p-3">
                  <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-2 text-[14px] leading-5">{row[key].label}</p>
                  <ProvenanceRow provenance={row[key].provenance} title={`${row.name} · ${label}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

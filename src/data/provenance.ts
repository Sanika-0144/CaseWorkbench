import type { DataStatus, Provenance } from "@/types";

export function pv(
  source: string,
  effectiveDate: string,
  receivedDate: string,
  status: DataStatus,
  recordId: string,
  raw: string,
  standardized: string,
  note?: string,
): Provenance {
  return { source, effectiveDate, receivedDate, status, recordId, raw, standardized, note };
}

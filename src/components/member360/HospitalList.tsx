import type { TimelineEvent } from "@/types";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";

export function HospitalList({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return <p className="text-[14px] text-slate-600">No hospital event is on file. Missing is not the same as low risk.</p>;
  }
  return (
    <ol className="space-y-4">
      {events.map((event) => (
        <li key={event.id} className="rounded-xl border border-slate-200/80 bg-white/60 p-4">
          <p className="text-[14px] font-semibold">{event.title}</p>
          <p className="mt-1 text-[13px] leading-5 text-slate-600">{event.detail}</p>
          <dl className="mt-3 grid gap-2 text-[13px] sm:grid-cols-2">
            <div>
              <dt className="text-[12px] text-slate-500">Event time</dt>
              <dd className="tabular-nums">{event.eventTime}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">Received time</dt>
              <dd className="tabular-nums">{event.receivedTime}</dd>
            </div>
          </dl>
          <ProvenanceRow provenance={event.provenance} title={event.title} />
        </li>
      ))}
    </ol>
  );
}

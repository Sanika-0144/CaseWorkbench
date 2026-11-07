import { useState } from "react";
import { Lock } from "lucide-react";
import type { OutreachAttempt, Patient, TaskItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/input";
import { HospitalList } from "@/components/member360/HospitalList";
import { MedicationBoard } from "@/components/member360/MedicationBoard";
import { InfoTip } from "@/components/shared/InfoTip";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";
import { StatusChip } from "@/components/shared/StatusChip";
import { VerifiedMark } from "@/components/shared/AIBadge";
import { useWorkbench } from "@/store/workbench";

export function ClinicalTab({ patient }: { patient: Patient }) {
  const revealed = useWorkbench((s) => s.revealed[patient.id]);
  const reveal = useWorkbench((s) => s.revealSensitive);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <div className="glass space-y-6 p-4">
      <section>
        <h2 className="text-[16px] font-semibold">Conditions</h2>
        {patient.conditions.length === 0 ? <p className="mt-2 text-[14px] text-slate-600">No open condition is shown outside the restricted record.</p> : null}
        {patient.conditions.map((item) => (
          <div key={item.provenance.recordId} className="mt-3">
            <p>{item.name}</p>
            <ProvenanceRow provenance={item.provenance} title={item.name} />
          </div>
        ))}
      </section>
      {patient.sensitive ? (
        <section className="rounded-xl border border-slate-200 p-4">
          {revealed ? (
            <>
              <VerifiedMark label="Revealed for this session" />
              <h3 className="mt-2 text-[16px] font-semibold">{patient.sensitive.title}</h3>
              <p className="mt-2 text-[14px] leading-6">{patient.sensitive.body}</p>
              <p className="mt-2 text-[12px] text-slate-500">Reason recorded: {revealed}</p>
              <ProvenanceRow provenance={patient.sensitive.provenance} title={patient.sensitive.title} />
            </>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-[14px] font-medium">
                <Lock className="h-4 w-4" aria-hidden />
                Restricted – authorised team only
              </div>
              <p className="mt-2 text-[13px] leading-5 text-slate-600">Behavioural-health detail stays hidden until you record a reason. This is a mock reveal.</p>
              <Button className="mt-3" size="sm" variant="outline" onClick={() => setOpen(true)}>Reveal with reason</Button>
            </div>
          )}
        </section>
      ) : null}
      <Dialog open={open} onOpenChange={setOpen} title="Reveal restricted note" description="Enter a reason. Nothing is sent to a real access system.">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!reason.trim()) return;
            reveal(patient.id, reason.trim());
            setOpen(false);
          }}
        >
          <Textarea value={reason} onChange={(event) => setReason(event.target.value)} required placeholder="Reason for viewing" />
          <div className="flex justify-end">
            <Button type="submit" disabled={!reason.trim()}>Reveal</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export function MedicationsTab({ patient }: { patient: Patient }) {
  return (
    <section className="glass p-4">
      <MedicationBoard rows={patient.medications} />
    </section>
  );
}

export function HospitalTab({ patient }: { patient: Patient }) {
  return (
    <section className="glass p-4">
      <h2 className="text-[16px] font-semibold">Hospital timeline</h2>
      <div className="mt-4">
        <HospitalList events={patient.hospital} />
      </div>
    </section>
  );
}

export function SocialTab({ patient }: { patient: Patient }) {
  return (
    <section className="glass p-4">
      <h2 className="text-[16px] font-semibold">Social profile</h2>
      <p className="mt-2 text-[13px] text-slate-600">Only care-relevant barriers are listed, with freshness on each row.</p>
      <ul className="mt-4 space-y-4">
        {patient.sdoh.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-200/80 p-3">
            <p className="text-[14px]">{item.barrier}</p>
            <ProvenanceRow provenance={item.provenance} title={item.barrier} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OutreachHistoryTab({ attempts }: { attempts: OutreachAttempt[] }) {
  return (
    <section className="glass p-4">
      <h2 className="text-[16px] font-semibold">Outreach history</h2>
      <ol className="mt-4 space-y-4">
        {attempts.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-200/80 p-3">
            <p className="text-[14px] font-medium">{item.outcome}</p>
            <p className="mt-1 text-[13px] text-slate-600">{item.time} · {item.channel} · {item.person}</p>
            <ProvenanceRow provenance={item.provenance} title={item.outcome} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CarePlanTab({ patient, tasks }: { patient: Patient; tasks: TaskItem[] }) {
  return (
    <section className="glass p-4">
      <h2 className="text-[16px] font-semibold">Care plan</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-6">
        {patient.careGoals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
      <h3 className="mt-6 text-[14px] font-semibold">Tasks</h3>
      <ul className="mt-3 space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-xl border border-slate-200/80 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{task.title}</p>
              {task.source === "human" ? <VerifiedMark label="Human approved" /> : null}
            </div>
            <p className="mt-1 text-[13px] text-slate-600">{task.owner} · due {task.due} · {task.status}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AppointmentsTab({ patient }: { patient: Patient }) {
  return (
    <section className="glass p-4">
      <h2 className="text-[16px] font-semibold">Appointments and referrals</h2>
      <ul className="mt-4 space-y-4">
        {patient.appointments.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-200/80 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{item.title}</p>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-medium uppercase tracking-wide">{item.state}</span>
            </div>
            <p className="mt-1 text-[13px] text-slate-600">{item.when} · {item.kind}</p>
            <ProvenanceRow provenance={item.provenance} title={item.title} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ClaimsTab({ patient }: { patient: Patient }) {
  return (
    <section className="glass p-4">
      <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] leading-5">
        <p>Claims lag – not used as a real-time event trigger.</p>
        <InfoTip label="Why claims aren't a trigger">
          Claims often arrive days after the event and may still be pending adjudication. They corroborate history. They are not used as a real-time trigger for who to call today.
        </InfoTip>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead className="text-[12px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2 pr-4 font-medium">Service</th>
              <th className="py-2 pr-4 font-medium">Service date</th>
              <th className="py-2 pr-4 font-medium">Received</th>
              <th className="py-2 pr-4 font-medium">Adjudication</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {patient.claims.map((claim) => (
              <tr key={claim.id} className="border-t border-slate-100">
                <td className="py-3 pr-4">{claim.description}</td>
                <td className="py-3 pr-4 tabular-nums">{claim.serviceDate}</td>
                <td className="py-3 pr-4 tabular-nums">{claim.receivedDate}</td>
                <td className="py-3 pr-4 tabular-nums">{claim.adjudicationDate}</td>
                <td className="py-3"><StatusChip status={claim.provenance.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

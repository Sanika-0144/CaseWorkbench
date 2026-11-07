import { useState } from "react";
import type { OutreachAttempt, Patient, TaskItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIBadge, VerifiedMark } from "@/components/shared/AIBadge";
import { CitedText } from "@/components/shared/CitedText";
import { LlmBanner } from "@/components/shared/LlmBanner";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";
import { StatusChip } from "@/components/shared/StatusChip";
import { HospitalList } from "@/components/member360/HospitalList";
import { MedicationBoard } from "@/components/member360/MedicationBoard";
import { useWorkbench } from "@/store/workbench";

export function OverviewTab({
  patient,
  tasks,
  attempts,
  onViewProfile,
}: {
  patient: Patient;
  tasks: TaskItem[];
  attempts: OutreachAttempt[];
  onViewProfile: () => void;
}) {
  const llm = useWorkbench((s) => s.llmUnavailable);
  const nba = useWorkbench((s) => s.nba);
  const editingAction = useWorkbench((s) => s.editingAction);
  const acceptAction = useWorkbench((s) => s.acceptAction);
  const dismissAction = useWorkbench((s) => s.dismissAction);
  const restoreAction = useWorkbench((s) => s.restoreAction);
  const startEditAction = useWorkbench((s) => s.startEditAction);
  const saveEditAction = useWorkbench((s) => s.saveEditAction);
  const pushToast = useWorkbench((s) => s.pushToast);
  const [draftTitle, setDraftTitle] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid items-start gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <section className="glass p-4">
            <h2 className="text-[16px] font-semibold">Clinical snapshot</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Conditions</p>
                {patient.conditions.length === 0 ? (
                  <p className="mt-2 text-[14px] text-slate-600">Open conditions are not listed. Restricted notes stay locked.</p>
                ) : (
                  patient.conditions.map((item) => (
                    <div key={item.provenance.recordId}>
                      <p className="mt-2 text-[14px]">{item.name}</p>
                      <ProvenanceRow provenance={item.provenance} title={item.name} />
                    </div>
                  ))
                )}
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Recent hospital event</p>
                <p className="mt-2 text-[14px] leading-6">{patient.recentEvent.title}</p>
                <ProvenanceRow provenance={patient.recentEvent.provenance} title="Recent event" />
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Key labs</p>
                {patient.labs.map((lab) => (
                  <div key={lab.provenance.recordId}>
                    <p className="mt-2 text-[14px]">
                      {lab.label}: <span className="font-medium">{lab.value}</span>
                    </p>
                    <ProvenanceRow provenance={lab.provenance} title={lab.label} />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Allergies</p>
                {patient.allergies.map((item) => (
                  <div key={item.provenance.recordId}>
                    <p className="mt-2 text-[14px]">{item.name}</p>
                    <ProvenanceRow provenance={item.provenance} title="Allergies" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Discharge instructions</p>
                <p className="mt-2 text-[14px] leading-6">{patient.dischargeInstructions.text}</p>
                <ProvenanceRow provenance={patient.dischargeInstructions.provenance} title="Discharge instructions" />
              </div>
            </div>
          </section>

          <section className="glass p-4">
            {patient.medConflict ? (
              <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
                <div className="flex items-center gap-2">
                  <StatusChip status="Conflict" />
                  <p className="text-[13px] font-medium">Neither value was selected</p>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <p className="rounded-xl bg-white p-3 text-[14px] leading-6">{patient.medConflict.left}</p>
                  <p className="rounded-xl bg-white p-3 text-[14px] leading-6">{patient.medConflict.right}</p>
                </div>
                <Button
                  className="mt-3"
                  variant="outline"
                  size="sm"
                  onClick={() => pushToast("Verification requested", "Sent to the treating clinician. No value was auto-selected.")}
                >
                  Request clinician verification
                </Button>
              </div>
            ) : null}
            <MedicationBoard rows={patient.medications} />
          </section>

          <section className="glass p-4">
            <h2 className="text-[16px] font-semibold">Hospital timeline</h2>
            <div className="mt-4">
              <HospitalList events={patient.hospital} />
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className={llm ? "glass p-4" : "ai-panel p-4"}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] font-semibold">{llm ? "Template patient summary" : "Patient summary"}</h2>
              <AIBadge template={llm} />
            </div>
            <p className="mt-2 text-[12px] font-medium text-violet-800">AI-generated – review before use</p>
            {llm ? <div className="mt-3"><LlmBanner /></div> : null}
            <div className="mt-3">
              <CitedText sentences={patient.aiSummary.sentences} citations={patient.aiSummary.citations} />
            </div>
            <p className="mt-3 text-[12px] leading-5 text-slate-600">
              AI does not diagnose, prescribe, set priority, or close tasks.
            </p>
          </section>

          <section className={llm ? "glass p-4" : "ai-panel p-4"}>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] font-semibold">Next best actions</h2>
              <AIBadge template={llm} />
            </div>
            <p className="mt-2 text-[12px] text-slate-600">Approved playbook: {patient.playbook}. RN approval required.</p>
            <div className="mt-4 space-y-3">
              {patient.nextActions.map((action) => {
                const state = nba[action.id];
                const title = state?.title || action.title;
                if (state?.status === "dismissed") {
                  return (
                    <div key={action.id} className="rounded-xl bg-white/70 px-3 py-2 text-[13px] text-slate-500">
                      Dismissed: {title}
                      <button type="button" className="ml-2 font-medium text-indigo-700" onClick={() => restoreAction(action.id)}>
                        Undo
                      </button>
                    </div>
                  );
                }
                if (state?.status === "accepted") {
                  return (
                    <div key={action.id} className="verified-panel p-3">
                      <VerifiedMark label="Accepted by RN" />
                      <p className="mt-2 text-[14px] font-medium">{title}</p>
                      <p className="mt-1 text-[12px] text-slate-500">{action.owner} · due {action.due} · not closed</p>
                    </div>
                  );
                }
                return (
                  <article key={action.id} className="rounded-xl bg-white/80 p-3">
                    {editingAction === action.id ? (
                      <Input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} aria-label="Edit action" />
                    ) : (
                      <p className="text-[14px] font-medium leading-6">{title}</p>
                    )}
                    <p className="mt-1 text-[13px] leading-5 text-slate-600">{action.detail}</p>
                    <p className="mt-2 text-[12px] text-slate-500">{action.owner} · due {action.due}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {editingAction === action.id ? (
                        <Button size="sm" onClick={() => saveEditAction(patient.id, action.id, draftTitle || title)}>Save edit</Button>
                      ) : (
                        <>
                          <Button size="sm" onClick={() => acceptAction(patient, action.id)}>Accept</Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setDraftTitle(title);
                              startEditAction(action.id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => dismissAction(action.id, title)}>Dismiss</Button>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="glass p-4">
            <h2 className="text-[16px] font-semibold">Open tasks</h2>
            <ul className="mt-3 space-y-3">
              {tasks.map((task) => (
                <li key={task.id} className="rounded-xl border border-slate-200/80 px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-medium">{task.title}</p>
                    {task.source === "human" ? <VerifiedMark label="RN" /> : null}
                  </div>
                  <p className="mt-1 text-[12px] text-slate-500">{task.owner} · due {task.due} · {task.status}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="glass p-4">
          <h2 className="text-[16px] font-semibold">SDOH summary</h2>
          <ul className="mt-3 space-y-3">
            {patient.sdoh.slice(0, 3).map((item) => (
              <li key={item.id}>
                <p className="text-[14px] leading-5">{item.barrier}</p>
                <ProvenanceRow provenance={item.provenance} title={item.barrier} />
              </li>
            ))}
          </ul>
          <button type="button" onClick={onViewProfile} className="mt-3 text-[13px] font-medium text-indigo-700">
            View full profile
          </button>
        </section>
        <section className="glass p-4">
          <h2 className="text-[16px] font-semibold">Outreach summary</h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-5">
            {attempts.slice(-2).map((item) => (
              <li key={item.id}>{item.time}: {item.outcome} · {item.channel}</li>
            ))}
          </ul>
          {patient.permissions.map((permission) => (
            <p key={permission.who} className="mt-3 text-[13px] leading-5 text-amber-900">
              {permission.who}: {permission.scope}
            </p>
          ))}
        </section>
        <section className="glass p-4">
          <h2 className="text-[16px] font-semibold">Appointments</h2>
          <ul className="mt-3 space-y-3">
            {patient.appointments.map((item) => (
              <li key={item.id}>
                <p className="text-[14px] font-medium">{item.title}</p>
                <p className="text-[13px] text-slate-600">{item.when}</p>
                <p className="mt-1 text-[12px] font-medium uppercase tracking-wide text-slate-500">{item.state}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { patients } from "@/data/patients";
import { CHANNELS, OUTCOMES, type ClaimTag, type Patient } from "@/types";
import { cn } from "@/lib/utils";
import { useCapture, useDraft, usePatientBundle, useWorkbench } from "@/store/workbench";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, Input, Textarea, fieldClass } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AIBadge, VerifiedMark } from "@/components/shared/AIBadge";
import { LlmBanner } from "@/components/shared/LlmBanner";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";
import { PriorityPill } from "@/components/shared/PriorityPill";

const steps = ["Prepare", "Capture", "Draft", "Review & Approve", "Update case"];

const tagStyles: Record<ClaimTag, string> = {
  Reported: "bg-violet-50 text-violet-800 ring-violet-200",
  Observed: "bg-blue-50 text-blue-800 ring-blue-200",
  Verified: "bg-emerald-50 text-emerald-800 ring-emerald-200",
};

function currentStep(hasOutcome: boolean, generated: boolean, reviewed: boolean, approved: boolean) {
  if (approved) return 4;
  if (reviewed) return 3;
  if (generated) return 2;
  if (hasOutcome) return 1;
  return 0;
}

function PreparePane({ patient }: { patient: Patient }) {
  const llm = useWorkbench((s) => s.llmUnavailable);
  return (
    <section className="glass min-w-0 p-4">
      <h2 className="text-[16px] font-semibold">Prepare</h2>
      <div className={cn("mt-4 p-3", llm ? "rounded-xl bg-slate-50" : "ai-panel")}>
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-semibold">Call brief</h3>
          <AIBadge template={llm} />
        </div>
        {llm ? <div className="mt-3"><LlmBanner /></div> : null}
        <ul className="mt-3 list-disc space-y-2 pl-4 text-[13px] leading-5">
          {patient.callBrief.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-5"><span className="font-medium">Last successful conversation. </span>{patient.callBrief.lastSuccess}</p>
        <p className="mt-2 text-[13px] leading-5"><span className="font-medium">Known concerns. </span>{patient.callBrief.concerns.join(" ")}</p>
      </div>
      <div className="mt-4">
        <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Verified contact</p>
        <p className="mt-2 text-[14px]">
          {patient.contact.verified ? "Verified" : "Not verified"} · {patient.contact.value}
        </p>
        <p className="mt-1 text-[13px] text-slate-600">{patient.language} · {patient.contact.channel} · {patient.contact.bestTime}</p>
        <ProvenanceRow provenance={patient.contact.provenance} title="Contact" />
      </div>
      <div className="mt-4">
        <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Permissions</p>
        {patient.permissions.length === 0 ? <p className="mt-2 text-[13px] text-slate-600">No caregiver permission is on file.</p> : null}
        <ul className="mt-2 space-y-2">
          {patient.permissions.map((permission) => (
            <li key={permission.who} className="rounded-xl bg-amber-50 px-3 py-2 text-[13px] leading-5 text-amber-950">
              <span className="inline-flex items-center gap-1 font-medium">
                {permission.warning ? <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> : null}
                {permission.who}: {permission.scope}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[12px] leading-5 text-slate-500">
          Clinical details stay with the member or an authorised clinician. AI does not share clinical details with caregivers.
        </p>
      </div>
      <div className="mt-4">
        <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Previous attempts</p>
        <ol className="mt-2 space-y-3">
          {patient.outreach.map((item) => (
            <li key={item.id} className="text-[13px] leading-5">
              <p className="font-medium">{item.time}</p>
              <p>{item.channel} · {item.outcome} · {item.person}</p>
              <ProvenanceRow provenance={item.provenance} title={item.outcome} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function OutreachPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { patient, priority, outreach } = usePatientBundle(id);
  const capture = useCapture(patient ?? patients[0]);
  const draft = useDraft(id);
  const llm = useWorkbench((s) => s.llmUnavailable);
  const updateCapture = useWorkbench((s) => s.updateCapture);
  const generateDraft = useWorkbench((s) => s.generateDraft);
  const updateClaim = useWorkbench((s) => s.updateClaim);
  const updateDraftTask = useWorkbench((s) => s.updateDraftTask);
  const setEditingDraft = useWorkbench((s) => s.setEditingDraft);
  const setReviewed = useWorkbench((s) => s.setReviewed);
  const discardDraft = useWorkbench((s) => s.discardDraft);
  const approveDraft = useWorkbench((s) => s.approveDraft);

  useEffect(() => {
    document.title = patient ? `${patient.name} · Outreach` : "Outreach";
  }, [patient]);

  if (!patient || !priority) {
    return (
      <div className="glass px-6 py-16 text-center">
        <h1 className="text-[20px] font-semibold">Member not found</h1>
      </div>
    );
  }

  const step = currentStep(Boolean(capture.outcome), draft.generated, draft.reviewed, draft.approved);
  const bandLabel = priority === "High" ? "High" : priority;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Outreach & documentation</p>
          <h1 className="mt-1 text-[28px] font-semibold tracking-tight">{patient.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-slate-600">
            <span className="tabular-nums">{patient.id}</span>
            <PriorityPill band={priority} />
            <Link to={`/member/${patient.id}`} className="font-medium text-indigo-700">Back to Member 360</Link>
          </div>
        </div>
        <select
          aria-label="Switch member"
          value={patient.id}
          onChange={(event) => navigate(`/outreach/${event.target.value}`)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px]"
        >
          {patients.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <ol className="glass flex gap-2 overflow-x-auto p-3" aria-label="Outreach steps">
        {steps.map((label, index) => (
          <li key={label} className="flex items-center gap-2" aria-current={index === step ? "step" : undefined}>
            <span className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-semibold",
              index === step ? "bg-indigo-600 text-white" : index < step ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500",
            )}>{index + 1}</span>
            <span className="whitespace-nowrap text-[13px] font-medium">{label}</span>
            {index < steps.length - 1 ? <span className="mx-1 h-px w-6 bg-slate-200" /> : null}
          </li>
        ))}
      </ol>

      <div className="grid items-start gap-4 xl:grid-cols-[300px_minmax(0,1fr)_340px]">
        <PreparePane patient={{ ...patient, outreach }} />

        <section className="glass min-w-0 p-4">
          <h2 className="text-[16px] font-semibold">Capture interaction</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Channel">
              <select className={fieldClass + " h-10"} value={capture.channel} onChange={(event) => updateCapture(patient.id, { channel: event.target.value })}>
                {CHANNELS.map((item) => <option key={item}>{item}</option>)}
              </select>
            </Field>
            <Field label="Timestamp">
              <Input type="datetime-local" value={capture.timestamp} onChange={(event) => updateCapture(patient.id, { timestamp: event.target.value })} />
            </Field>
            <Field label="Outcome">
              <select className={fieldClass + " h-10"} value={capture.outcome} onChange={(event) => updateCapture(patient.id, { outcome: event.target.value })}>
                <option value="">Select an outcome</option>
                {OUTCOMES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </Field>
            <Field label="Person reached">
              <Input value={capture.person} placeholder="Member, daughter, other" onChange={(event) => updateCapture(patient.id, { person: event.target.value })} />
            </Field>
            <Field label="Language">
              <Input value={capture.language} onChange={(event) => updateCapture(patient.id, { language: event.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Patient concerns">
                <Textarea value={capture.concerns} placeholder="What the member reported" onChange={(event) => updateCapture(patient.id, { concerns: event.target.value })} />
              </Field>
            </div>
          </div>
          <div className="mt-4 grid gap-4">
            <Field label="Barriers">
              <Textarea value={capture.barriers} onChange={(event) => updateCapture(patient.id, { barriers: event.target.value })} />
            </Field>
            <Field label="Interventions discussed">
              <Textarea value={capture.interventions} onChange={(event) => updateCapture(patient.id, { interventions: event.target.value })} />
            </Field>
            <Field label="Commitments">
              <Textarea value={capture.commitments} onChange={(event) => updateCapture(patient.id, { commitments: event.target.value })} />
            </Field>
            <Field label="Notes">
              <Textarea value={capture.notes} onChange={(event) => updateCapture(patient.id, { notes: event.target.value })} />
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" disabled className="h-8 cursor-not-allowed rounded-xl border border-dashed border-slate-300 px-3 text-[13px] text-slate-400">
              Voice transcription · Coming in Phase 2
            </button>
            <Button onClick={() => generateDraft(patient.id)} disabled={draft.loading || draft.approved}>
              {llm ? "Generate template" : "Generate draft ✦"}
            </Button>
          </div>
        </section>

        <section className={cn("min-w-0 p-4", draft.approved ? "verified-panel" : draft.generated || draft.loading ? "ai-panel" : "glass")}>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[16px] font-semibold">{draft.approved ? "Approved note" : "Draft & review"}</h2>
            {draft.approved ? <VerifiedMark /> : draft.generated ? <AIBadge template={llm} /> : null}
          </div>
          {!draft.generated && !draft.loading ? (
            <p className="mt-4 text-[13px] leading-5 text-slate-600">
              Capture the interaction, then generate a draft. Nothing is written to the case until you approve.
            </p>
          ) : null}
          {draft.loading ? (
            <div className="mt-4 space-y-3" aria-busy="true">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-24" />
            </div>
          ) : null}
          {draft.generated ? (
            <div className="mt-4 space-y-4">
              {llm ? <LlmBanner /> : null}
              {(["contactNote", "assessment", "concerns"] as const).map((section) => (
                <div key={section}>
                  <h3 className="text-[13px] font-semibold">
                    {section === "contactNote" ? "Contact note" : section === "assessment" ? "Assessment updates" : "Patient-reported concerns"}
                  </h3>
                  {section === "concerns" ? (
                    <p className="mt-1 text-[12px] text-violet-800">Patient-reported – unverified</p>
                  ) : null}
                  <div className="mt-2 space-y-2">
                    {draft[section].map((claim) => (
                      <div key={claim.id} className="rounded-xl bg-white/80 p-3">
                        <span className={cn("rounded-full px-2 py-0.5 text-[12px] font-medium ring-1 ring-inset", tagStyles[claim.tag])}>{claim.tag}</span>
                        {draft.editing && !draft.approved ? (
                          <Textarea
                            className="mt-2"
                            value={claim.text}
                            onChange={(event) => updateClaim(patient.id, section, claim.id, event.target.value)}
                          />
                        ) : (
                          <p className="mt-2 text-[13px] leading-5">{claim.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <h3 className="text-[13px] font-semibold">Suggested follow-up tasks</h3>
                <ul className="mt-2 space-y-3">
                  {draft.tasks.map((task) => (
                    <li key={task.id} className="rounded-xl bg-white/80 p-3">
                      <label className="flex items-start gap-2 text-[13px]">
                        <Checkbox
                          className="mt-0.5"
                          checked={task.checked}
                          disabled={draft.approved}
                          onCheckedChange={(checked) => updateDraftTask(patient.id, task.id, { checked: checked === true })}
                        />
                        <span>{task.title}</span>
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <Input
                          aria-label="Task owner"
                          value={task.owner}
                          disabled={draft.approved}
                          onChange={(event) => updateDraftTask(patient.id, task.id, { owner: event.target.value })}
                        />
                        <Input
                          aria-label="Task due date"
                          value={task.due}
                          disabled={draft.approved}
                          onChange={(event) => updateDraftTask(patient.id, task.id, { due: event.target.value })}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[12px] leading-5 text-slate-600">
                {draft.dirty ? "Draft edited by Maria Alvarez, RN. " : ""}
                Edits and approval are logged. This draft does not diagnose, prescribe, change priority, or close a task.
              </p>
              {draft.approved ? (
                <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-[13px] leading-5 text-indigo-950">
                  <p className="inline-flex items-center gap-1 font-medium">
                    <ShieldCheck className="h-4 w-4" aria-hidden />
                    Approved by Maria Alvarez, RN · {draft.approvedAt}
                  </p>
                  <p className="mt-2">Priority recalculated: remains {bandLabel} – one successful call does not close the case.</p>
                  <p className="mt-2">Checked tasks were added as Pending – needs completion evidence.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="flex items-start gap-2 text-[13px] leading-5">
                    <Checkbox className="mt-0.5" checked={draft.reviewed} onCheckedChange={(checked) => setReviewed(patient.id, checked === true)} />
                    <span>I have reviewed this draft</span>
                  </label>
                  <p className="text-[12px] text-slate-500">
                    {draft.reviewed
                      ? "There is no auto-sign. Approve writes the note only after this review."
                      : "Approve & sign stays off until that box is ticked. There is no auto-sign."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditingDraft(patient.id, !draft.editing)}>Edit</Button>
                    <Button size="sm" disabled={!draft.reviewed} onClick={() => approveDraft(patient.id)}>Approve & sign</Button>
                    <Button size="sm" variant="ghost" onClick={() => discardDraft(patient.id)}>Discard</Button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

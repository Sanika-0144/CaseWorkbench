import type { CaptureForm, DraftClaim, DraftState, Patient } from "@/types";
import { formatWhen } from "@/lib/utils";

function claim(id: string, text: string, tag: DraftClaim["tag"]): DraftClaim {
  return { id, text, tag };
}

export function buildDraft(patient: Patient, form: CaptureForm): Pick<
  DraftState,
  "contactNote" | "assessment" | "concerns" | "tasks"
> {
  const person = form.person.trim() || "Not recorded";
  const concerns = form.concerns.trim();
  const barriers = form.barriers.trim();
  const interventions = form.interventions.trim();
  const commitments = form.commitments.trim();
  const daughter =
    patient.id === "SYN-1001" && /daughter/i.test(form.person);

  const contactNote: DraftClaim[] = [
    claim(
      "c1",
      `${form.outcome} via ${form.channel} at ${formatWhen(form.timestamp)}. Person reached: ${person}. Language: ${form.language}.`,
      "Observed",
    ),
  ];

  if (form.notes.trim()) {
    contactNote.push(claim("c2", form.notes.trim(), "Observed"));
  }

  if (daughter) {
    contactNote.push(
      claim(
        "c3",
        "Daughter is authorised for scheduling only. Clinical details were not included in this note for the caregiver.",
        "Verified",
      ),
    );
  }

  if (patient.id === "SYN-1004" && form.channel === "Phone") {
    contactNote.push(
      claim(
        "c4",
        "Safe-contact preference is text-first and no voicemail. A phone attempt needs a recorded reason.",
        "Verified",
      ),
    );
  }

  if (patient.id === "SYN-1003" && form.channel === "Phone") {
    contactNote.push(
      claim(
        "c5",
        "Primary phone was disconnected on 1 Nov and 2 Nov. This attempt still needs an approved alternate channel.",
        "Verified",
      ),
    );
  }

  const assessment: DraftClaim[] = [
    claim(
      "a1",
      patient.why,
      "Verified",
    ),
    claim(
      "a2",
      concerns
        ? "Patient-reported detail is listed separately and is not verified."
        : "No new patient-reported assessment was captured on this attempt.",
      concerns ? "Observed" : "Observed",
    ),
  ];

  if (patient.medConflict) {
    assessment.push(
      claim(
        "a3",
        "Medication records still conflict and were not auto-resolved. A clinician verification is required before either dose is treated as current.",
        "Verified",
      ),
    );
  }

  const concernsBlock: DraftClaim[] = [
    claim(
      "p1",
      concerns || "No patient-reported concern was captured in this note.",
      concerns ? "Reported" : "Observed",
    ),
  ];

  if (barriers) {
    concernsBlock.push(claim("p2", `Barrier discussed: ${barriers}`, "Reported"));
  }
  if (interventions) {
    concernsBlock.push(claim("p3", `Intervention discussed: ${interventions}`, "Observed"));
  }
  if (commitments) {
    concernsBlock.push(claim("p4", `Commitment recorded: ${commitments}`, "Reported"));
  }

  return {
    contactNote,
    assessment,
    concerns: concernsBlock,
    tasks: patient.nextActions.slice(0, 3).map((action) => ({
      id: action.id,
      title: action.title,
      owner: action.owner,
      due: action.due,
      checked: true,
    })),
  };
}

export type PriorityBand = "High" | "Medium" | "Routine";

export type DataStatus =
  | "Verified"
  | "Conflict"
  | "Stale"
  | "Unmatched"
  | "Missing"
  | "Pending";

export type Programme =
  | "Heart failure"
  | "Diabetes"
  | "Recurrent ED"
  | "Behavioural health"
  | "High-risk pregnancy";

export type AppointmentState =
  | "requested"
  | "scheduled"
  | "confirmed"
  | "attended"
  | "cancelled"
  | "no-show"
  | "unknown";

export type ClaimTag = "Reported" | "Observed" | "Verified";

export interface Provenance {
  source: string;
  effectiveDate: string;
  receivedDate: string;
  status: DataStatus;
  recordId: string;
  raw: string;
  standardized: string;
  note?: string;
}

export interface FactorDetail {
  key: "C" | "T" | "B";
  label: string;
  score: number;
  max: number;
  rationale: string;
  evidence: { label: string; provenance: Provenance }[];
}

export interface MedCell {
  label: string;
  provenance: Provenance;
}

export interface MedicationRow {
  id: string;
  name: string;
  ordered: MedCell;
  dispensed: MedCell;
  reported: MedCell;
  administered: MedCell;
}

export interface TimelineEvent {
  id: string;
  title: string;
  detail: string;
  eventTime: string;
  receivedTime: string;
  provenance: Provenance;
}

export interface NamedFact {
  name: string;
  provenance: Provenance;
}

export interface LabFact {
  label: string;
  value: string;
  provenance: Provenance;
}

export interface SdhItem {
  id: string;
  barrier: string;
  provenance: Provenance;
}

export interface Permission {
  who: string;
  scope: string;
  warning?: string;
}

export interface OutreachAttempt {
  id: string;
  time: string;
  channel: string;
  outcome: string;
  person: string;
  provenance: Provenance;
}

export interface TaskItem {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: string;
  source: "rule" | "human" | "ai";
}

export interface AppointmentItem {
  id: string;
  kind: "appointment" | "referral";
  title: string;
  when: string;
  state: AppointmentState;
  provenance: Provenance;
}

export interface ClaimItem {
  id: string;
  description: string;
  serviceDate: string;
  receivedDate: string;
  adjudicationDate: string;
  provenance: Provenance;
}

export interface Citation {
  n: number;
  label: string;
  provenance: Provenance;
}

export interface SummarySentence {
  text: string;
  cite?: number;
}

export interface NextAction {
  id: string;
  title: string;
  detail: string;
  playbook: string;
  owner: string;
  due: string;
}

export interface Patient {
  id: string;
  aliases?: string[];
  name: string;
  age: number;
  plan: string;
  planShort: "MA" | "Commercial";
  programme: Programme;
  programmeTag: string;
  priority: PriorityBand;
  factors: { c: number; t: number; b: number };
  factorDetails: FactorDetail[];
  why: string;
  factorChips: string[];
  prepareFor: string;
  dueLabel: string;
  dueRank: number;
  primaryAction: "member" | "outreach";
  dataQuality?: {
    tone: "amber" | "purple";
    text: string;
    provenance: Provenance;
  };
  identity: "Verified" | "Unmatched";
  language: string;
  pcp: string;
  pcpProvenance: Provenance;
  eligibilityStart: string;
  eligibilityEnd: string;
  eligibilityProvenance: Provenance;
  contact: {
    value: string;
    channel: string;
    bestTime: string;
    verified: boolean;
    provenance: Provenance;
  };
  permissions: Permission[];
  conditions: NamedFact[];
  allergies: NamedFact[];
  labs: LabFact[];
  dischargeInstructions: { text: string; provenance: Provenance };
  recentEvent: { title: string; provenance: Provenance };
  medications: MedicationRow[];
  medConflict?: { left: string; right: string };
  hospital: TimelineEvent[];
  sdoh: SdhItem[];
  sensitive?: { title: string; body: string; provenance: Provenance };
  outreach: OutreachAttempt[];
  tasks: TaskItem[];
  appointments: AppointmentItem[];
  claims: ClaimItem[];
  aiSummary: { sentences: SummarySentence[]; citations: Citation[] };
  nextActions: NextAction[];
  callBrief: { points: string[]; lastSuccess: string; concerns: string[] };
  careGoals: string[];
  playbook: string;
}

export interface CaptureForm {
  channel: string;
  timestamp: string;
  outcome: string;
  person: string;
  language: string;
  concerns: string;
  barriers: string;
  interventions: string;
  commitments: string;
  notes: string;
}

export interface DraftClaim {
  id: string;
  text: string;
  tag: ClaimTag;
}

export interface DraftTask {
  id: string;
  title: string;
  owner: string;
  due: string;
  checked: boolean;
}

export interface DraftState {
  loading: boolean;
  generated: boolean;
  contactNote: DraftClaim[];
  assessment: DraftClaim[];
  concerns: DraftClaim[];
  tasks: DraftTask[];
  reviewed: boolean;
  approved: boolean;
  editing: boolean;
  dirty: boolean;
  approvedAt?: string;
}

export const PROGRAMMES: Programme[] = [
  "Heart failure",
  "Diabetes",
  "Recurrent ED",
  "Behavioural health",
  "High-risk pregnancy",
];

export const OUTCOMES = [
  "Connected – member",
  "Connected – caregiver",
  "Voicemail",
  "No answer",
  "Wrong/disconnected number",
  "SMS delivered (not read/consent)",
  "Declined",
] as const;

export const CHANNELS = ["Phone", "SMS", "Portal", "In person"] as const;

export const RN_NAME = "Maria Alvarez, RN";
export const DEMO_DATE = "Mon, 9 Nov 2026 · 8:00 AM";

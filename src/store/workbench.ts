import { create } from "zustand";
import { buildDraft } from "@/lib/draft";
import { getPatient } from "@/data/patients";
import type {
  CaptureForm,
  DraftState,
  OutreachAttempt,
  Patient,
  PriorityBand,
  Provenance,
  TaskItem,
} from "@/types";
import { RN_NAME } from "@/types";

export interface ToastItem {
  id: string;
  title: string;
  body?: string;
}

interface EvidenceTarget {
  provenance: Provenance;
  title: string;
}

interface WorkbenchState {
  sidebarCollapsed: boolean;
  panelOpen: boolean;
  llmUnavailable: boolean;
  showP0: boolean;
  lastRefreshed: string;
  evidence: Provenance | null;
  evidenceTitle: string;
  overrides: Record<string, { band: PriorityBand; reason: string }>;
  nba: Record<string, { status: "accepted" | "dismissed" | "edited"; title: string }>;
  editingAction: string | null;
  extraTasks: Record<string, TaskItem[]>;
  extraOutreach: Record<string, OutreachAttempt[]>;
  revealed: Record<string, string>;
  capture: Record<string, CaptureForm>;
  drafts: Record<string, DraftState>;
  toasts: ToastItem[];
  generation: number;
  toggleSidebar: () => void;
  togglePanel: () => void;
  setLlmUnavailable: (value: boolean) => void;
  setShowP0: (value: boolean) => void;
  refreshFeeds: () => void;
  openEvidence: (provenance: Provenance, title?: string) => void;
  closeEvidence: () => void;
  overridePriority: (patientId: string, band: PriorityBand, reason: string) => void;
  acceptAction: (patient: Patient, actionId: string) => void;
  dismissAction: (actionId: string, title: string) => void;
  restoreAction: (actionId: string) => void;
  startEditAction: (actionId: string) => void;
  saveEditAction: (patientId: string, actionId: string, title: string) => void;
  addTask: (patientId: string, task: TaskItem) => void;
  revealSensitive: (patientId: string, reason: string) => void;
  updateCapture: (patientId: string, patch: Partial<CaptureForm>) => void;
  generateDraft: (patientId: string) => void;
  updateClaim: (
    patientId: string,
    section: "contactNote" | "assessment" | "concerns",
    claimId: string,
    text: string,
  ) => void;
  updateDraftTask: (patientId: string, taskId: string, patch: Partial<DraftState["tasks"][number]>) => void;
  setEditingDraft: (patientId: string, editing: boolean) => void;
  setReviewed: (patientId: string, reviewed: boolean) => void;
  discardDraft: (patientId: string) => void;
  approveDraft: (patientId: string) => void;
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: string) => void;
}

function defaultCapture(patient: Patient): CaptureForm {
  const textFirst = /text|sms/i.test(patient.contact.channel);
  return {
    channel: textFirst ? "SMS" : "Phone",
    timestamp: patient.id === "SYN-1001" ? "2026-11-09T18:10" : "2026-11-09T08:10",
    outcome: "",
    person: "",
    language: patient.language,
    concerns: "",
    barriers: "",
    interventions: "",
    commitments: "",
    notes: "",
  };
}

const EMPTY_DRAFT: DraftState = {
  loading: false,
  generated: false,
  contactNote: [],
  assessment: [],
  concerns: [],
  tasks: [],
  reviewed: false,
  approved: false,
  editing: false,
  dirty: false,
};

function emptyDraft(): DraftState {
  return { ...EMPTY_DRAFT, contactNote: [], assessment: [], concerns: [], tasks: [] };
}

export const useWorkbench = create<WorkbenchState>((set, get) => ({
  sidebarCollapsed: false,
  panelOpen: true,
  llmUnavailable: false,
  showP0: false,
  lastRefreshed: "7:58 AM",
  evidence: null,
  evidenceTitle: "",
  overrides: {},
  nba: {},
  editingAction: null,
  extraTasks: {},
  extraOutreach: {},
  revealed: {},
  capture: {},
  drafts: {},
  toasts: [],
  generation: 0,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  togglePanel: () => set((s) => ({ panelOpen: !s.panelOpen })),
  setLlmUnavailable: (value) => set({ llmUnavailable: value }),
  setShowP0: (value) => set({ showP0: value }),
  refreshFeeds: () => {
    set({ lastRefreshed: "8:00 AM" });
    get().pushToast("Feeds refreshed", "Data feeds OK · 8:00 AM. Demo data is unchanged.");
  },
  openEvidence: (provenance, title) =>
    set({ evidence: provenance, evidenceTitle: title || provenance.standardized }),
  closeEvidence: () => set({ evidence: null, evidenceTitle: "" }),
  overridePriority: (patientId, band, reason) => {
    const patient = getPatient(patientId);
    set((s) => ({
      overrides: { ...s.overrides, [patientId]: { band, reason } },
    }));
    get().pushToast(
      `Priority overridden for ${patient?.name ?? patientId}`,
      "The rule score did not change. This is an RN decision, not an AI score.",
    );
  },
  acceptAction: (patient, actionId) => {
    const action = patient.nextActions.find((item) => item.id === actionId);
    if (!action) return;
    const title = get().nba[actionId]?.title || action.title;
    set((s) => {
      const existing = s.extraTasks[patient.id] ?? [];
      const taskId = `nba-${actionId}`;
      const nextTasks = existing.some((task) => task.id === taskId)
        ? existing
        : [
            ...existing,
            {
              id: taskId,
              title,
              owner: action.owner,
              due: action.due,
              status: "Open – RN accepted",
              source: "human" as const,
            },
          ];
      return {
        nba: { ...s.nba, [actionId]: { status: "accepted", title } },
        editingAction: null,
        extraTasks: { ...s.extraTasks, [patient.id]: nextTasks },
      };
    });
    get().pushToast("Action accepted", "Added to open tasks. It is not closed until completion evidence exists.");
  },
  dismissAction: (actionId, title) => {
    set((s) => ({
      nba: { ...s.nba, [actionId]: { status: "dismissed", title } },
      editingAction: s.editingAction === actionId ? null : s.editingAction,
    }));
  },
  restoreAction: (actionId) => {
    set((s) => {
      const nba = { ...s.nba };
      delete nba[actionId];
      return { nba };
    });
  },
  startEditAction: (actionId) => set({ editingAction: actionId }),
  saveEditAction: (patientId, actionId, title) => {
    set((s) => ({
      nba: {
        ...s.nba,
        [actionId]: {
          status:
            s.nba[actionId]?.status === "accepted" || s.nba[actionId]?.status === "dismissed"
              ? s.nba[actionId].status
              : "edited",
          title,
        },
      },
      editingAction: null,
      extraTasks: {
        ...s.extraTasks,
        [patientId]: (s.extraTasks[patientId] ?? []).map((task) =>
          task.id === `nba-${actionId}` ? { ...task, title } : task,
        ),
      },
    }));
  },
  addTask: (patientId, task) => {
    set((s) => ({
      extraTasks: { ...s.extraTasks, [patientId]: [...(s.extraTasks[patientId] ?? []), task] },
    }));
    get().pushToast("Task added", task.title);
  },
  revealSensitive: (patientId, reason) => {
    set((s) => ({ revealed: { ...s.revealed, [patientId]: reason } }));
    get().pushToast("Restricted note revealed", "Demo only. The reason is held in this session.");
  },
  updateCapture: (patientId, patch) => {
    const patient = getPatient(patientId);
    if (!patient) return;
    set((s) => ({
      capture: {
        ...s.capture,
        [patientId]: { ...(s.capture[patientId] ?? defaultCapture(patient)), ...patch },
      },
    }));
  },
  generateDraft: (patientId) => {
    const patient = getPatient(patientId);
    if (!patient) return;
    const form = get().capture[patientId] ?? defaultCapture(patient);
    if (!form.outcome) {
      get().pushToast("Outcome required", "Choose an outcome before generating a draft.");
      return;
    }
    const token = get().generation + 1;
    set((s) => ({
      generation: token,
      drafts: {
        ...s.drafts,
        [patientId]: { ...emptyDraft(), loading: true },
      },
    }));
    window.setTimeout(() => {
      if (get().generation !== token) return;
      const built = buildDraft(patient, form);
      set((s) => ({
        drafts: {
          ...s.drafts,
          [patientId]: {
            ...emptyDraft(),
            ...built,
            loading: false,
            generated: true,
          },
        },
      }));
    }, 1500);
  },
  updateClaim: (patientId, section, claimId, text) => {
    set((s) => {
      const draft = s.drafts[patientId];
      if (!draft) return s;
      return {
        drafts: {
          ...s.drafts,
          [patientId]: {
            ...draft,
            dirty: true,
            [section]: draft[section].map((item) => (item.id === claimId ? { ...item, text } : item)),
          },
        },
      };
    });
  },
  updateDraftTask: (patientId, taskId, patch) => {
    set((s) => {
      const draft = s.drafts[patientId];
      if (!draft) return s;
      return {
        drafts: {
          ...s.drafts,
          [patientId]: {
            ...draft,
            dirty: true,
            tasks: draft.tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
          },
        },
      };
    });
  },
  setEditingDraft: (patientId, editing) => {
    set((s) => {
      const draft = s.drafts[patientId];
      if (!draft) return s;
      return { drafts: { ...s.drafts, [patientId]: { ...draft, editing } } };
    });
  },
  setReviewed: (patientId, reviewed) => {
    set((s) => {
      const draft = s.drafts[patientId];
      if (!draft) return s;
      return { drafts: { ...s.drafts, [patientId]: { ...draft, reviewed } } };
    });
  },
  discardDraft: (patientId) => {
    set((s) => ({
      generation: s.generation + 1,
      drafts: { ...s.drafts, [patientId]: emptyDraft() },
    }));
    get().pushToast("Draft discarded", "Nothing was written to the case.");
  },
  approveDraft: (patientId) => {
    const patient = getPatient(patientId);
    const draft = get().drafts[patientId];
    const form = patient ? (get().capture[patientId] ?? defaultCapture(patient)) : undefined;
    if (!patient || !draft?.generated || !draft.reviewed || draft.approved || !form) return;
    const attempt: OutreachAttempt = {
      id: `approved-${patientId}-${Date.now()}`,
      time: form.timestamp.replace("T", " "),
      channel: form.channel,
      outcome: form.outcome,
      person: form.person.trim() || "Not recorded",
      provenance: {
        source: "RN-approved outreach note",
        effectiveDate: "9 Nov 2026",
        receivedDate: "9 Nov 2026 · 8:00 AM",
        status: "Verified",
        recordId: `OUT-${patientId}-NEW`,
        raw: `${form.outcome} | ${form.channel} | ${form.notes || "No free text"}`,
        standardized: `${form.outcome} via ${form.channel}. Approved by ${RN_NAME}.`,
        note: "Edits and approval are logged. The note was not auto-signed.",
      },
    };
    const tasks: TaskItem[] = draft.tasks
      .filter((task) => task.checked)
      .map((task) => ({
        id: `draft-${patientId}-${task.id}`,
        title: task.title,
        owner: task.owner,
        due: task.due,
        status: "Pending – needs completion evidence",
        source: "human",
      }));
    set((s) => ({
      drafts: {
        ...s.drafts,
        [patientId]: {
          ...draft,
          approved: true,
          editing: false,
          approvedAt: "9 Nov 2026 · 8:00 AM",
        },
      },
      extraOutreach: {
        ...s.extraOutreach,
        [patientId]: [...(s.extraOutreach[patientId] ?? []), attempt],
      },
      extraTasks: {
        ...s.extraTasks,
        [patientId]: [...(s.extraTasks[patientId] ?? []), ...tasks],
      },
    }));
    const band = get().overrides[patientId]?.band ?? patient.priority;
    get().pushToast(
      "Draft approved and signed",
      `Logged for ${patient.name}. Priority recalculated: remains ${band}.`,
    );
  },
  pushToast: (title, body) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { id, title, body }] }));
    window.setTimeout(() => get().dismissToast(id), 4200);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((toast) => toast.id !== id) })),
}));

export function useCapture(patient: Patient) {
  const stored = useWorkbench((s) => s.capture[patient.id]);
  return stored ?? defaultCapture(patient);
}

const EMPTY_TASKS: TaskItem[] = [];
const EMPTY_OUTREACH: OutreachAttempt[] = [];

export function useDraft(patientId: string) {
  return useWorkbench((s) => s.drafts[patientId] ?? EMPTY_DRAFT);
}

export function usePatientBundle(id: string | undefined) {
  const patient = id ? getPatient(id) : undefined;
  const override = useWorkbench((s) => (id ? s.overrides[id] : undefined));
  const extraTasks = useWorkbench((s) => (id && s.extraTasks[id] ? s.extraTasks[id] : EMPTY_TASKS));
  const extraOutreach = useWorkbench((s) => (id && s.extraOutreach[id] ? s.extraOutreach[id] : EMPTY_OUTREACH));
  return {
    patient,
    priority: override?.band ?? patient?.priority,
    override,
    tasks: [...(patient?.tasks ?? []), ...extraTasks],
    outreach: [...(patient?.outreach ?? []), ...extraOutreach],
  };
}

export type { EvidenceTarget };

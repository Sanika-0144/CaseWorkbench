# BUILD: "Case Management Workbench" – front-end only prototype (React + TypeScript)

## 0. What this is
A polished, front-end-only prototype of a web Case Management Workbench for US health-plan RN case managers. The user persona is "Maria", an RN case manager with 48 active cases. It is a demo for a product-manager hiring caselet, so visual quality, information hierarchy and clarity matter more than backend depth.

NO backend, NO real API calls, NO auth. All data is hardcoded mock data in /src/data. All patients are fictional. Show a small "Synthetic data – demo only" badge in the top bar.

Core proposition (show on a subtle banner/empty state): "One trusted member picture. One clear next action."
Design principle: "AI understands and drafts. Deterministic rules calculate priority. The RN verifies, decides and approves."

## 1. Tech stack
- React 18 + Vite + TypeScript, React Router
- Tailwind CSS + shadcn/ui (Radix) components, lucide-react icons, recharts (only if a chart is needed), framer-motion for subtle transitions
- Font: Inter (or Geist). Mock data only, state via React context/zustand. No localStorage required.
- Desktop-first (min 1280px), gracefully responsive down to tablet.

## 2. Visual design system – "Premium SaaS, light, glass cards"
- Background: very light cool gray-white (#F6F8FB) with a soft radial gradient blur (faint indigo/teal) at top-right.
- Cards: white/translucent (bg-white/70, backdrop-blur-md), 1px border slate-200/60, radius 16px, soft layered shadow, hover lift.
- Primary accent: indigo-600 → teal-500 subtle gradient for primary buttons and key highlights.
- Priority colours: High = rose/red, Medium = amber, Routine = emerald/slate-blue. Use soft tinted pills, never harsh fills.
- Data-status colours: Verified = green, Conflict = red/orange, Stale = amber, Unmatched = purple, Missing = gray dashed, Pending = blue.
- AI-generated content ALWAYS uses a distinct violet "sparkle" treatment: a "✦ AI draft" chip plus a faint violet-tinted background and left border. Human-verified content uses a check-shield icon.
- Typography: clear hierarchy, 12/13/14/16/20/28 scale, tabular numbers, generous whitespace, 8px grid. Tooltips on every icon-only control.
- Micro-interactions: skeleton shimmer on first load, smooth drawer slide-ins, 150–200ms hover transitions. No clutter, no emoji-heavy UI.

## 3. App shell (on every screen)
- LEFT SIDEBAR (collapsible, 240px → 72px): logo "CaseWorkbench"; nav items: Priority Queue (default landing "/"), Member 360 ("/member/:id"), Outreach & Documentation ("/outreach/:id"); bottom: user card "Maria Alvarez, RN · 48 active cases", capacity meter.
- TOP BAR: global search (members by name/ID), "Last refreshed 7:58 AM" with a refresh icon and a service-status dot (Data feeds OK / LLM service OK), date "Mon, 9 Nov 2026 · 8:00 AM", notification bell, "Synthetic data – demo only" badge.
- Breadcrumbs under the top bar on inner pages (Queue › Eleanor Brooks › Outreach).
- Main content area has max-width ~1400px, consistent 24px padding.

## 4. SCREEN 1 – Prioritised Work Queue ("/")
Purpose: tell Maria whom to work on, why, and what to prepare for. This is the landing page.

Layout:
- Header row: "Good morning, Maria" + subtitle "6 new discharge alerts since Friday · 5 members need review today". Three small KPI glass cards: High (2), Medium (2), Routine (1), plus a "Data-quality tasks (3)" card.
- Filter bar: priority chips (All/High/Medium/Routine), programme filter (Heart failure, Diabetes, Recurrent ED, Behavioural health, High-risk pregnancy), "Has data-quality task" toggle, sort dropdown (Priority, Due time), view toggle (cards/table).
- Queue = vertical list of rich rows/cards, sorted High → Routine. Each card, above the fold, shows:
  1. Member name, age, plan, ID (e.g. SYN-1001), programme tag
  2. Priority pill (High/Medium/Routine) – numeric score is hidden/secondary
  3. ONE-line "Why prioritised" (plain language)
  4. Top 2–3 contributing-factor chips (Clinical need / Time sensitivity / Barriers)
  5. "Prepare for…" cue, with a ✦ icon
  6. Due timing + recommended first action button ("Open Member 360", "Prepare outreach")
  7. A SEPARATE amber/purple "Data-quality task" strip when relevant (never blended into urgency)
  8. Expandable "Why am I seeing this patient?" accordion that reveals C / T / B segmented bars (C 0–3, T 0–3, B 0–2), total /8, rule-based rationale per factor, and evidence links. Include an "Override priority" button that opens a dialog requiring a reason.
- Right-side slim panel (collapsible): "Today's capacity" and "Recent changes" (e.g. "New ADT event received 7:41 AM for Olivia Chen – identity unconfirmed").
- Footer note: "Priority is an operational review-order index, not a clinical risk score."

Queue data (use exactly):
| Patient | Band | C/T/B | Why | Factors | Prepare for | Due |
| Eleanor Brooks, 68, MA, HF transition (SYN-1001) | High | 3/3/2=8 | Recent heart-failure discharge; medication conflict and follow-up barrier | Clinical need · Time sensitivity · Barriers | Prepare for medication reconciliation and transition follow-up | Today (same-day review) |
| Priya Shah, 31, MA, high-risk pregnancy (SYN-1005) | High | 2/3/2=7 | Prenatal visit tomorrow; transport and specialist referral unresolved | Time sensitivity · Barriers | Prepare to confirm appointment and arrange transport | Today; visit Tue 10 Nov 9:30 |
| Marcus Reed, 55, MA, diabetes (SYN-1002) | Medium | 2/2/2=6 | Elevated HbA1c with rejected refill and missed diabetes follow-up | Clinical need · Time sensitivity · Barriers | Prepare to investigate refill rejection and reschedule follow-up | Today / next business day |
| Olivia Chen, 47, MA, recurrent ED (SYN-1003) | Medium | 2/1/1=4 | Two confirmed ED visits with unsuccessful outreach and contact issue | Clinical need · Outreach barrier | Prepare to review confirmed ED history and verify contact; separate identity task | Today / next business day |
| Daniel Ortiz, 39, Commercial, behavioural health + housing (SYN-1004) | Routine | 1/1/1=3 | Outdated social-needs assessment and incomplete referral status | Routine clinical need · Reassessment barrier | Prepare to reconfirm current needs using safe contact preferences | 1–2 business days |

Data-quality strips: Olivia → "Unmatched: possible Nov 7 ED event under legacy ID OLD-77 / 'Olivia Chan'. Not merged – identity-resolution task due Nov 9." Marcus → "Pending: Oct 30 claim not yet adjudicated." Daniel → "Stale: social-needs assessment is 9+ months old."

## 5. SCREEN 2 – Member 360 ("/member/:id", default SYN-1001, patient switcher dropdown in the header)
Purpose: a holistic, source-linked picture without opening 6–7 systems. Hybrid layout: overview landing + detailed tabs.

- PERSISTENT PATIENT HEADER (sticky): name, age, ID, plan & eligibility dates, preferred language, PCP, verified contact with a verification badge, preferred contact time/channel, identity status badge (Verified/Unmatched), priority pill, and buttons "Prepare outreach" and "Add task".
- Tabs under the header: Overview · Clinical History · Medications · Hospital Timeline · Social Profile · Outreach History · Care Plan · Appointments/Referrals · Claims.

OVERVIEW tab (two-column, clinical context and actions with EQUAL visual weight):
 Left column (Clinical context): "Clinical snapshot" card (conditions, recent hospital event, key vitals/labs, allergies, discharge instructions); "Medication reconciliation" card showing four separate columns/rows – Ordered, Dispensed, Patient-reported, Administered – with conflict badge and source/date on each; "Hospital timeline" mini (event date vs received date).
 Right column (Action): "✦ AI patient summary" (violet card, evidence-linked superscript citations that open an evidence popover with source, record ID, date; labelled "AI-generated – review before use"); "✦ Next best actions" (3–4 action cards drawn from "approved playbook: Transition of Care v2", each with Accept / Edit / Dismiss; RN approval required microcopy); "Open tasks" list with owner, due date, status.
 Below: SDOH summary (only care-relevant barriers, with date/source/freshness chip, "View full profile" link); Outreach summary (last attempts, permissions); Appointments summary.
- Every material fact displays a small "provenance row": source · effective date · received date · status chip (Verified / Conflict / Stale / Unmatched / Missing / Pending). Clicking a chip opens a right-hand EVIDENCE DRAWER with raw source values vs standardised values, never overwritten.
- Conflict UI: side-by-side comparison card ("Discharge order 40 mg daily – Nov 8 | Patient-reported list 20 mg daily – Nov 4") with a button "Request clinician verification". Do NOT auto-pick the newest value.
- "No matching fill found" wording – never "non-adherent". Appointment states are distinct: requested / scheduled / confirmed / attended / cancelled / no-show / unknown. Missing data is shown as "Missing" in dashed gray, never as normal.
- Sensitive info (behavioural health for Daniel) shows a "Restricted – authorised team only" lock with a reveal-with-reason interaction (mock).
- Claims tab: timeline with service date, received date and adjudication date columns plus a banner "Claims lag – not used as a real-time event trigger."

## 6. SCREEN 3 – Outreach & Documentation Workspace ("/outreach/:id")
Purpose: prepare → contact → capture → AI draft → RN approve → update case. Use a 5-step horizontal stepper at top (Prepare · Capture · Draft · Review & Approve · Update case), plus a three-pane layout:

- LEFT pane (Prepare): "✦ AI call brief" (key points, last successful conversation, patient concerns), verified contact details with verification badge, language/channel/best-time preference, permissions checklist (e.g. "Daughter: scheduling only – do NOT share clinical details" with a warning icon), previous attempts timeline (attempt time, channel, outcome, person reached). Evidence links.
- CENTER pane (Capture interaction): structured form – channel, timestamp, outcome (standard categories: Connected – member, Connected – caregiver, Voicemail, No answer, Wrong/disconnected number, SMS delivered (not read/consent), Declined), person reached, language, patient concerns, barriers, interventions discussed, commitments, plus a free-text notes textarea. Primary button "Generate draft ✦". (Voice transcription is shown as a disabled "Coming in Phase 2" item.)
- RIGHT pane (AI draft + Review): after clicking Generate (simulate a 1.5s loading with skeletons), show editable violet-tinted draft sections: Contact note, Assessment updates, Patient-reported concerns (tagged "Patient-reported – unverified"), Suggested follow-up tasks (checkbox list with owner + due date inputs). Each draft claim is tagged Reported / Observed / Verified. Buttons: "Edit", "Approve & sign" (enabled only after the RN ticks "I have reviewed this draft"), "Discard". No auto-sign; show an audit note "Edits and approval are logged".
- After approval: success toast, timeline updates, tasks added as "Pending – needs completion evidence", and a small banner "Priority recalculated: remains High – one successful call does not close the case."
- Prefill the workspace for Eleanor with this scenario: discharge Nov 8, Furosemide 40 mg discharge order vs older patient-reported 20 mg, no matching post-discharge dispense, transport issue, PCP follow-up requested for Nov 12 but unconfirmed, daughter authorised for scheduling only, evening contact preferred, Nov 8 voicemail attempt.

## 7. Mock data (put in /src/data/patients.ts, typed)
Each patient has records across ≥6 of: memberEligibility, hospitalADT, clinical, pharmacy, sdoh, outreach, carePlanTasks, appointmentsReferrals, claims. Use these facts:

ELEANOR BROOKS (SYN-1001), 68, Medicare Advantage, HF transition. ADT: admitted Nov 6, discharged Nov 8 (event time vs received time differ). Clinical: discharge furosemide 40 mg daily vs patient-reported 20 mg (Nov 4). Pharmacy: 20 mg dispensed Oct 10; no matching 40 mg post-discharge dispense found by Nov 9 8 AM. SDOH: transport sometimes a problem, reliable mobile, evening preferred, daughter helps but caregiver burden reported. Outreach: Nov 8 voicemail; daughter authorised for scheduling only. Tasks: medication reconciliation due Nov 9. Appointment: PCP requested Nov 12, not confirmed. Claims: prior September HF admission only; current admission not yet visible. Monday action: review Nov 8 discharge; verify furosemide discrepancy with appropriate clinician; ask if medication obtained; coordinate follow-up and transport; call in evening window.

MARCUS REED (SYN-1002), 55, MA, diabetes rising risk. Clinical: T2DM, HbA1c 9.2% (Oct 31), metformin 1000 mg BID ordered, current use unconfirmed. Pharmacy: last paid fill Aug 15; Oct 20 refill REJECTED (prior authorisation). Appointment: Nov 3 diabetes visit marked no-show (needs confirmation). Outreach: Nov 2 no answer, Nov 4 voicemail. Task: investigate rejected refill due Nov 9. Claims: Oct 30 service claim received Nov 7, pending adjudication. SDOH: difficulty affording prescriptions; food insecurity sometimes. Monday action: investigate rejected refill and access barrier; review HbA1c with clinical context; reschedule follow-up; do not label non-adherent from fill data alone.

OLIVIA CHEN (SYN-1003), 47, MA, recurrent ED use. Confirmed ADT/claims: ED Sep 18 and Oct 22. Unresolved: Nov 7 event in HIE under legacy ID OLD-77, name variant "Olivia Chan", summary missing, identity unconfirmed (Unmatched, not merged). Clinical: prior asthma exacerbations. Pharmacy: albuterol dispensed Sep 15. Outreach: primary phone disconnected Nov 1 and Nov 2, no alternate confirmed. Appointment: pulmonology follow-up recommended, scheduling unknown. Tasks: identity resolution + contact verification due Nov 9. Claims: only first two ED events visible. Monday action: two confirmed ED visits; route identity resolution for same-day ops review; verify contact through approved channels; do not merge automatically.

DANIEL ORTIZ (SYN-1004), 39, Commercial, behavioural health + housing. Clinical: behavioural-health assessment Aug 15 (sensitive, restricted). SDOH: housing instability and financial strain reported Feb 1 (9+ months old → Stale), transport sometimes difficult. Outreach: text-first, no voicemail; SMS delivered Nov 2, no reply (delivered ≠ read); phone attempt suppressed due to safe-contact preference. Task: re-screen social needs due Nov 11. Referral: BH referral submitted, no return status (submitted ≠ accepted/scheduled). Claims: June outpatient BH claim only. Monday action: reconfirm housing and safe-contact preferences sensitively; review referral status; coordinate support only after confirming needs and permissions.

PRIYA SHAH (SYN-1005), 31, MA, high-risk pregnancy. Clinical: gestational hypertension; urine protein/creatinine result PENDING (not normal). Hospital: Nov 4 ED assessment with urgent prenatal follow-up instructions, partial document. Pharmacy: labetalol 100 mg BID dispensed Nov 5. SDOH: needs transport assistance; partner support. Outreach: connected Nov 5, transport need discussed. Tasks: confirm Nov 10 appointment + transport; check MFM referral due Nov 9. Appointment: Nov 10 9:30 scheduled, patient confirmation and transport pending; MFM referral requested, not scheduled. Claims: ED event not yet reflected. Monday action: confirm Nov 10 appointment and transport; check MFM referral status; ensure pending result is routed to the treating team.

## 8. Interactions to implement (all mock)
- Queue card → Member 360 → "Prepare outreach" → Outreach workspace (state carries patient id).
- Priority override dialog, evidence drawer, accept/edit/dismiss next-best-action, generate draft with loading state, approve & sign flow, toasts, collapsible sidebar, patient switcher.
- Empty, loading and error states (LLM unavailable → show "Template-based reason shown; AI explanation unavailable" fallback banner as a demo toggle in the top bar settings).
- Add small info-popovers explaining: "What is C/T/B?", "Why claims aren't a trigger", "Why we show both medication records".

## 9. Guardrails to reflect visibly in the UI
- AI never sets priority score, diagnoses, prescribes, auto-closes tasks, or shares clinical details with caregivers.
- Always human approval before records are saved; no auto-sign.
- Data confidence is a separate dimension from clinical urgency; missing ≠ low risk.
- P0 safety override: show a red banner component (hidden by default, demo-toggleable) – "P0 safety trigger – follow plan's urgent protocol; bypasses routine score."

## 10. Code quality
- Clean folder structure: /components (ui, layout, queue, member360, outreach, shared such as StatusChip, ProvenanceRow, AIBadge, PriorityPill, EvidenceDrawer), /pages, /data, /types, /lib.
- Strongly typed models, reusable components, no giant files, accessible (semantic HTML, focus rings, aria-labels, colour contrast AA, not colour-only status).
- README with run instructions.

## 11. Build order
1) Design tokens + app shell → 2) Mock data + types → 3) Queue → 4) Member 360 (overview first, then tabs) → 5) Outreach workspace → 6) Polish (animations, empty states, responsive) → 7) Verify all flows and that no screen feels cramped or misaligned.

Acceptance: every screen looks premium and balanced, aligned on an 8px grid, with no overflowing text; all five patients render correctly; the AI vs human-verified distinction is obvious; the flow Queue → Member 360 → Outreach → Approve works end to end.
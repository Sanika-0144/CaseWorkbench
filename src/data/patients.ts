import type { Patient } from "@/types";
import { RN_NAME } from "@/types";
import { pv } from "@/data/provenance";

function eleanor(): Patient {
  const dischargeOrder = pv(
    "Discharge summary",
    "8 Nov 2026",
    "8 Nov 2026 · 4:05 PM",
    "Conflict",
    "MED-ORD-1001",
    "FUROSEMIDE TAB 40MG PO QD — discharge order",
    "Furosemide 40 mg daily by mouth",
    "Conflicts with the patient-reported 20 mg list. Neither value was auto-selected.",
  );
  const reportedDose = pv(
    "Patient-reported medication list",
    "4 Nov 2026",
    "4 Nov 2026 · 2:18 PM",
    "Conflict",
    "MED-RPT-1001",
    "water pill 20 mg daily",
    "Furosemide 20 mg daily (patient-reported)",
    "Older than the discharge order. Age of the record is not a reason to discard it.",
  );
  const dispensed = pv(
    "Pharmacy benefit manager",
    "10 Oct 2026",
    "10 Oct 2026 · 6:40 PM",
    "Missing",
    "RX-1001-40",
    "Paid fill 10 Oct: furosemide 20 mg. No paid 40 mg fill after 8 Nov discharge as of 9 Nov 8:00 AM.",
    "No matching fill found for furosemide 40 mg after discharge.",
    "A missing fill is not labelled non-adherence.",
  );
  const administered = pv(
    "Medication administration feed",
    "9 Nov 2026",
    "9 Nov 2026 · 8:00 AM",
    "Missing",
    "MAR-1001",
    "No home administration record for the 40 mg discharge dose.",
    "Administered record missing for the post-discharge dose.",
  );
  const admit = pv(
    "ADT feed",
    "6 Nov 2026 · 2:10 PM",
    "6 Nov 2026 · 2:22 PM",
    "Verified",
    "ADT-1001-IN",
    "A03 admit HF exacerbation facility memorial",
    "Admitted 6 Nov 2026 for heart-failure exacerbation.",
  );
  const dcEvent = pv(
    "ADT feed",
    "8 Nov 2026 · 11:40 AM",
    "8 Nov 2026 · 4:05 PM",
    "Verified",
    "ADT-1001-DC",
    "A03 discharge 2026-11-08 11:40 received 16:05",
    "Discharged 8 Nov 2026. Received time is later than the event time.",
  );
  const transport = pv(
    "SDOH assessment",
    "2 Nov 2026",
    "2 Nov 2026",
    "Verified",
    "SDOH-1001-TR",
    "Transportation sometimes a problem",
    "Transport is sometimes a barrier.",
  );
  const appt = pv(
    "Scheduling",
    "8 Nov 2026",
    "8 Nov 2026 · 5:10 PM",
    "Pending",
    "APT-1001",
    "PCP follow-up requested 12 Nov — unconfirmed",
    "PCP visit requested for 12 Nov 2026. Not confirmed.",
  );
  const claim = pv(
    "Claims platform",
    "12 Sep 2026",
    "20 Sep 2026",
    "Verified",
    "CLM-1001-SEP",
    "IP HF admission service 12 Sep adjudicated 28 Sep",
    "Prior September heart-failure admission. Current November admission is not yet visible.",
  );
  const currentClaim = pv(
    "Claims platform",
    "6 Nov 2026",
    "9 Nov 2026 · 8:00 AM",
    "Missing",
    "CLM-1001-NOV",
    "No claim line for the 6–8 Nov stay",
    "Current admission is not yet visible on claims.",
    "Claims lag — not a real-time trigger.",
  );
  const eligibility = pv(
    "Member eligibility",
    "1 Jan 2026",
    "1 Jan 2026",
    "Verified",
    "ELIG-1001",
    "MA active 2026-01-01 to 2026-12-31",
    "Medicare Advantage active for 2026.",
  );
  const contact = pv(
    "Member directory",
    "2 Nov 2026",
    "2 Nov 2026",
    "Verified",
    "CTC-1001",
    "Mobile 555-0148 verified; evening preferred",
    "Verified mobile. Evening contact preferred.",
  );
  const voicemail = pv(
    "Outreach log",
    "8 Nov 2026 · 6:40 PM",
    "8 Nov 2026 · 6:41 PM",
    "Verified",
    "OUT-1001-1",
    "VM left mobile no live answer",
    "Voicemail on 8 Nov. No live conversation.",
  );
  const condition = pv(
    "Problem list",
    "8 Nov 2026",
    "8 Nov 2026 · 4:05 PM",
    "Verified",
    "DX-1001",
    "I50.9 heart failure unspecified",
    "Heart failure.",
  );
  const allergy = pv(
    "Allergy list",
    "9 Nov 2026",
    "9 Nov 2026 · 8:00 AM",
    "Missing",
    "ALG-1001",
    "",
    "Missing",
  );
  const labs = pv(
    "Laboratory",
    "9 Nov 2026",
    "9 Nov 2026 · 8:00 AM",
    "Missing",
    "LAB-1001",
    "",
    "Missing",
  );
  const instructions = pv(
    "Discharge summary",
    "8 Nov 2026",
    "8 Nov 2026 · 4:05 PM",
    "Verified",
    "DC-INS-1001",
    "Furosemide 40 mg daily. Remainder of counselling text not in feed.",
    "Confirmed instruction: furosemide 40 mg daily. Other counselling text is not in this feed.",
  );
  const daughter = pv(
    "Consent registry",
    "1 Oct 2026",
    "1 Oct 2026",
    "Verified",
    "PERM-1001",
    "Daughter — scheduling only. Do not share clinical details.",
    "Daughter may help with scheduling only.",
  );
  const pcp = pv(
    "Member eligibility",
    "1 Jan 2026",
    "1 Jan 2026",
    "Verified",
    "PCP-1001",
    "PCP Helen Cho MD",
    "Dr. Helen Cho",
  );
  const caregiverBurden = pv(
    "SDOH assessment",
    "2 Nov 2026",
    "2 Nov 2026",
    "Verified",
    "SDOH-1001-CG",
    "Daughter helps; caregiver burden reported",
    "Daughter helps. Caregiver burden was reported.",
  );

  return {
    id: "SYN-1001",
    name: "Eleanor Brooks",
    age: 68,
    plan: "Medicare Advantage",
    planShort: "MA",
    programme: "Heart failure",
    programmeTag: "HF transition",
    priority: "High",
    factors: { c: 3, t: 3, b: 2 },
    why: "Recent heart-failure discharge; medication conflict and follow-up barrier",
    factorChips: ["Clinical need", "Time sensitivity", "Barriers"],
    prepareFor: "Prepare for medication reconciliation and transition follow-up",
    dueLabel: "Today (same-day review)",
    dueRank: 0,
    primaryAction: "member",
    identity: "Verified",
    language: "English",
    pcp: "Dr. Helen Cho",
    pcpProvenance: pcp,
    eligibilityStart: "1 Jan 2026",
    eligibilityEnd: "31 Dec 2026",
    eligibilityProvenance: eligibility,
    contact: {
      value: "555-0148",
      channel: "Phone",
      bestTime: "Evening",
      verified: true,
      provenance: contact,
    },
    permissions: [
      {
        who: "Daughter",
        scope: "Scheduling only – do NOT share clinical details",
        warning: "Caregiver permission does not include clinical information.",
      },
    ],
    conditions: [{ name: "Heart failure", provenance: condition }],
    allergies: [{ name: "Missing", provenance: allergy }],
    labs: [{ label: "Key labs", value: "Missing", provenance: labs }],
    dischargeInstructions: {
      text: "Furosemide 40 mg daily is the confirmed discharge order. Other counselling text is not in this feed.",
      provenance: instructions,
    },
    recentEvent: {
      title: "Discharged 8 Nov after a heart-failure admission that began 6 Nov",
      provenance: dcEvent,
    },
    medications: [
      {
        id: "furosemide",
        name: "Furosemide",
        ordered: { label: "40 mg daily", provenance: dischargeOrder },
        dispensed: { label: "No matching fill found", provenance: dispensed },
        reported: { label: "20 mg daily", provenance: reportedDose },
        administered: { label: "Missing", provenance: administered },
      },
    ],
    medConflict: {
      left: "Discharge order 40 mg daily – Nov 8",
      right: "Patient-reported list 20 mg daily – Nov 4",
    },
    hospital: [
      {
        id: "h1",
        title: "Admitted",
        detail: "Heart-failure exacerbation.",
        eventTime: "6 Nov 2026 · 2:10 PM",
        receivedTime: "6 Nov 2026 · 2:22 PM",
        provenance: admit,
      },
      {
        id: "h2",
        title: "Discharged",
        detail: "Transition of care. Event time and received time differ.",
        eventTime: "8 Nov 2026 · 11:40 AM",
        receivedTime: "8 Nov 2026 · 4:05 PM",
        provenance: dcEvent,
      },
    ],
    sdoh: [
      { id: "s1", barrier: "Transport is sometimes a problem", provenance: transport },
      { id: "s2", barrier: "Reliable mobile; evening contact preferred", provenance: contact },
      { id: "s3", barrier: "Daughter helps, and caregiver burden was reported", provenance: caregiverBurden },
    ],
    outreach: [
      {
        id: "o1",
        time: "8 Nov 2026 · 6:40 PM",
        channel: "Phone",
        outcome: "Voicemail",
        person: "No live answer",
        provenance: voicemail,
      },
    ],
    tasks: [
      {
        id: "t1",
        title: "Medication reconciliation",
        owner: RN_NAME,
        due: "9 Nov 2026",
        status: "Open",
        source: "rule",
      },
    ],
    appointments: [
      {
        id: "a1",
        kind: "appointment",
        title: "PCP follow-up",
        when: "12 Nov 2026",
        state: "requested",
        provenance: appt,
      },
    ],
    claims: [
      {
        id: "c1",
        description: "September heart-failure admission",
        serviceDate: "12 Sep 2026",
        receivedDate: "20 Sep 2026",
        adjudicationDate: "28 Sep 2026",
        provenance: claim,
      },
      {
        id: "c2",
        description: "Current November admission",
        serviceDate: "6 Nov 2026",
        receivedDate: "Not yet visible",
        adjudicationDate: "Not yet visible",
        provenance: currentClaim,
      },
    ],
    aiSummary: {
      sentences: [
        { text: "Eleanor Brooks was discharged on 8 Nov after a heart-failure admission.", cite: 1 },
        { text: "The discharge order is furosemide 40 mg daily, which conflicts with a patient-reported 20 mg daily list from 4 Nov.", cite: 2 },
        { text: "No matching 40 mg post-discharge dispense was found by 9 Nov at 8:00 AM.", cite: 3 },
        { text: "Transport is sometimes a barrier, and the 12 Nov PCP visit is requested but not confirmed.", cite: 4 },
      ],
      citations: [
        { n: 1, label: "Discharge event", provenance: dcEvent },
        { n: 2, label: "Medication conflict", provenance: dischargeOrder },
        { n: 3, label: "Pharmacy dispense", provenance: dispensed },
        { n: 4, label: "Follow-up and transport", provenance: appt },
      ],
    },
    nextActions: [
      {
        id: "na1",
        title: "Verify the furosemide discrepancy with the appropriate clinician",
        detail: "Do not pick 40 mg or 20 mg automatically.",
        playbook: "Transition of Care v2",
        owner: RN_NAME,
        due: "9 Nov 2026",
      },
      {
        id: "na2",
        title: "Ask whether the discharge medication was obtained",
        detail: "Use “no matching fill found”. Do not describe Eleanor as non-adherent.",
        playbook: "Transition of Care v2",
        owner: RN_NAME,
        due: "9 Nov 2026",
      },
      {
        id: "na3",
        title: "Coordinate the 12 Nov PCP visit and transport",
        detail: "The visit is requested, not confirmed.",
        playbook: "Transition of Care v2",
        owner: RN_NAME,
        due: "10 Nov 2026",
      },
      {
        id: "na4",
        title: "Call in the evening window",
        detail: "Daughter may help with scheduling only.",
        playbook: "Transition of Care v2",
        owner: RN_NAME,
        due: "9 Nov 2026",
      },
    ],
    callBrief: {
      points: [
        "Discharged 8 Nov. Event time 11:40 AM, feed received 4:05 PM.",
        "Furosemide 40 mg discharge order vs patient-reported 20 mg on 4 Nov.",
        "No matching 40 mg fill after discharge. Last paid 20 mg fill was 10 Oct.",
        "PCP follow-up requested for 12 Nov and not confirmed. Transport is sometimes a problem.",
      ],
      lastSuccess: "No live conversation yet. 8 Nov attempt was voicemail.",
      concerns: ["Medication obtained after discharge is unknown.", "Transport to follow-up is unresolved."],
    },
    careGoals: [
      "Reconcile the discharge medication list with a clinician.",
      "Complete transition follow-up without closing the case on one call.",
    ],
    playbook: "Transition of Care v2",
    factorDetails: [
      {
        key: "C",
        label: "Clinical need",
        score: 3,
        max: 3,
        rationale: "Recent heart-failure discharge with an unresolved medication conflict.",
        evidence: [
          { label: "Discharge", provenance: dcEvent },
          { label: "Order", provenance: dischargeOrder },
        ],
      },
      {
        key: "T",
        label: "Time sensitivity",
        score: 3,
        max: 3,
        rationale: "Same-day review. The discharge is fresh and follow-up is unconfirmed.",
        evidence: [{ label: "Requested PCP visit", provenance: appt }],
      },
      {
        key: "B",
        label: "Barriers",
        score: 2,
        max: 2,
        rationale: "Transport barrier, evening-only window, and caregiver permission limited to scheduling.",
        evidence: [
          { label: "Transport", provenance: transport },
          { label: "Permission", provenance: daughter },
        ],
      },
    ],
  };
}

function priya(): Patient {
  const htn = pv("Problem list", "4 Nov 2026", "4 Nov 2026 · 8:12 PM", "Verified", "DX-1005", "Gestational hypertension", "Gestational hypertension.");
  const lab = pv(
    "Laboratory",
    "4 Nov 2026",
    "5 Nov 2026 · 7:05 AM",
    "Pending",
    "LAB-1005",
    "Urine protein/creatinine — result pending, not released",
    "Urine protein/creatinine is pending. This is not a normal result.",
    "Pending is not the same as normal.",
  );
  const ed = pv(
    "ADT feed",
    "4 Nov 2026 · 5:46 PM",
    "4 Nov 2026 · 8:12 PM",
    "Pending",
    "ADT-1005",
    "ED assessment. Urgent prenatal follow-up. Document partial.",
    "4 Nov ED assessment with urgent prenatal follow-up. Document is partial.",
  );
  const rx = pv(
    "Pharmacy benefit manager",
    "5 Nov 2026",
    "5 Nov 2026 · 11:20 AM",
    "Verified",
    "RX-1005",
    "LABETALOL 100MG BID dispensed",
    "Labetalol 100 mg twice daily dispensed 5 Nov.",
  );
  const rxMissing = pv("Pharmacy benefit manager", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "RX-1005-ORD", "", "Missing");
  const transport = pv("SDOH assessment", "5 Nov 2026", "5 Nov 2026", "Verified", "SDOH-1005", "Needs transport assistance. Partner support.", "Needs transport assistance. Partner is a support.");
  const visit = pv("Scheduling", "5 Nov 2026", "5 Nov 2026 · 3:00 PM", "Pending", "APT-1005", "10 Nov 09:30 scheduled. Patient confirmation and transport pending.", "Prenatal visit 10 Nov 9:30 is scheduled. Confirmation and transport are pending.");
  const mfm = pv("Referral registry", "5 Nov 2026", "5 Nov 2026 · 3:10 PM", "Pending", "REF-1005", "MFM referral requested, not scheduled", "Maternal-fetal medicine referral is requested, not scheduled.");
  const outreach = pv("Outreach log", "5 Nov 2026 · 4:15 PM", "5 Nov 2026 · 4:20 PM", "Verified", "OUT-1005", "Connected. Transport need discussed.", "Connected 5 Nov. Transport need discussed.");
  const claim = pv("Claims platform", "4 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "CLM-1005", "ED event not yet reflected", "4 Nov ED event is not yet reflected on claims.");
  const eligibility = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "ELIG-1005", "MA active 2026", "Medicare Advantage active for 2026.");
  const contact = pv("Member directory", "5 Nov 2026", "5 Nov 2026", "Verified", "CTC-1005", "Mobile 555-0172 verified", "Verified mobile.");
  const allergy = pv("Allergy list", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ALG-1005", "", "Missing");
  const instructions = pv("ED summary", "4 Nov 2026", "4 Nov 2026 · 8:12 PM", "Pending", "INS-1005", "Urgent prenatal follow-up. Partial document.", "Urgent prenatal follow-up instructions. The document is partial.");
  const pcp = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "PCP-1005", "PCP Sara Iqbal MD", "Dr. Sara Iqbal");

  return {
    id: "SYN-1005",
    name: "Priya Shah",
    age: 31,
    plan: "Medicare Advantage",
    planShort: "MA",
    programme: "High-risk pregnancy",
    programmeTag: "High-risk pregnancy",
    priority: "High",
    factors: { c: 2, t: 3, b: 2 },
    why: "Prenatal visit tomorrow; transport and specialist referral unresolved",
    factorChips: ["Time sensitivity", "Barriers"],
    prepareFor: "Prepare to confirm appointment and arrange transport",
    dueLabel: "Today; visit Tue 10 Nov 9:30",
    dueRank: 1,
    primaryAction: "outreach",
    identity: "Verified",
    language: "English",
    pcp: "Dr. Sara Iqbal",
    pcpProvenance: pcp,
    eligibilityStart: "1 Jan 2026",
    eligibilityEnd: "31 Dec 2026",
    eligibilityProvenance: eligibility,
    contact: { value: "555-0172", channel: "Phone", bestTime: "Daytime", verified: true, provenance: contact },
    permissions: [{ who: "Partner", scope: "Support with transport. Confirm before sharing clinical detail." }],
    conditions: [{ name: "Gestational hypertension", provenance: htn }],
    allergies: [{ name: "Missing", provenance: allergy }],
    labs: [{ label: "Urine protein/creatinine", value: "Pending", provenance: lab }],
    dischargeInstructions: { text: "Urgent prenatal follow-up. The instruction document is partial.", provenance: instructions },
    recentEvent: { title: "ED assessment 4 Nov with urgent prenatal follow-up", provenance: ed },
    medications: [
      {
        id: "labetalol",
        name: "Labetalol",
        ordered: { label: "Missing", provenance: rxMissing },
        dispensed: { label: "100 mg twice daily, dispensed 5 Nov", provenance: rx },
        reported: { label: "Missing", provenance: rxMissing },
        administered: { label: "Missing", provenance: rxMissing },
      },
    ],
    hospital: [
      {
        id: "h1",
        title: "ED assessment",
        detail: "Urgent prenatal follow-up. Partial document.",
        eventTime: "4 Nov 2026 · 5:46 PM",
        receivedTime: "4 Nov 2026 · 8:12 PM",
        provenance: ed,
      },
    ],
    sdoh: [
      { id: "s1", barrier: "Needs transport assistance", provenance: transport },
      { id: "s2", barrier: "Partner support is available", provenance: transport },
    ],
    outreach: [
      { id: "o1", time: "5 Nov 2026 · 4:15 PM", channel: "Phone", outcome: "Connected – member", person: "Priya Shah", provenance: outreach },
    ],
    tasks: [
      { id: "t1", title: "Confirm 10 Nov appointment and transport", owner: RN_NAME, due: "9 Nov 2026", status: "Open", source: "rule" },
      { id: "t2", title: "Check MFM referral", owner: RN_NAME, due: "9 Nov 2026", status: "Open", source: "rule" },
    ],
    appointments: [
      { id: "a1", kind: "appointment", title: "Prenatal visit", when: "Tue 10 Nov 2026 · 9:30 AM", state: "scheduled", provenance: visit },
      { id: "a2", kind: "referral", title: "MFM referral", when: "Requested", state: "requested", provenance: mfm },
    ],
    claims: [
      { id: "c1", description: "4 Nov ED assessment", serviceDate: "4 Nov 2026", receivedDate: "Not yet reflected", adjudicationDate: "Not yet reflected", provenance: claim },
    ],
    aiSummary: {
      sentences: [
        { text: "Priya has a prenatal visit tomorrow, 10 Nov at 9:30.", cite: 1 },
        { text: "Transport assistance and the maternal-fetal medicine referral are still unresolved.", cite: 2 },
        { text: "Urine protein/creatinine is pending and must not be read as normal.", cite: 3 },
        { text: "Labetalol 100 mg twice daily was dispensed on 5 Nov.", cite: 4 },
      ],
      citations: [
        { n: 1, label: "Prenatal visit", provenance: visit },
        { n: 2, label: "Transport and referral", provenance: mfm },
        { n: 3, label: "Pending lab", provenance: lab },
        { n: 4, label: "Labetalol dispense", provenance: rx },
      ],
    },
    nextActions: [
      { id: "na1", title: "Confirm the Tue 10 Nov 9:30 prenatal visit", detail: "Scheduled is not the same as confirmed.", playbook: "High-risk pregnancy outreach v1", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na2", title: "Arrange transport assistance", detail: "Partner support is noted. The ride is still open.", playbook: "High-risk pregnancy outreach v1", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na3", title: "Check MFM referral status", detail: "Requested is not scheduled.", playbook: "High-risk pregnancy outreach v1", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na4", title: "Route the pending lab to the treating team", detail: "Do not describe a pending result as normal.", playbook: "High-risk pregnancy outreach v1", owner: RN_NAME, due: "9 Nov 2026" },
    ],
    callBrief: {
      points: ["Visit tomorrow at 9:30 is scheduled, not confirmed.", "Transport still needed.", "MFM referral requested, not scheduled.", "Protein/creatinine result is pending."],
      lastSuccess: "Connected 5 Nov. Transport need was discussed.",
      concerns: ["Getting to the Tuesday visit.", "Specialist referral not yet scheduled."],
    },
    careGoals: ["Confirm Tuesday’s visit and transport.", "Make sure the pending result reaches the treating team."],
    playbook: "High-risk pregnancy outreach v1",
    factorDetails: [
      { key: "C", label: "Clinical need", score: 2, max: 3, rationale: "Gestational hypertension, a pending result, and a recent ED assessment.", evidence: [{ label: "Lab", provenance: lab }, { label: "ED", provenance: ed }] },
      { key: "T", label: "Time sensitivity", score: 3, max: 3, rationale: "Prenatal visit is tomorrow morning.", evidence: [{ label: "Visit", provenance: visit }] },
      { key: "B", label: "Barriers", score: 2, max: 2, rationale: "Transport is unresolved and the specialist referral is not scheduled.", evidence: [{ label: "Transport", provenance: transport }, { label: "MFM", provenance: mfm }] },
    ],
  };
}

function marcus(): Patient {
  const dm = pv("Problem list", "31 Oct 2026", "1 Nov 2026", "Verified", "DX-1002", "Type 2 diabetes mellitus", "Type 2 diabetes.");
  const a1c = pv("Laboratory", "31 Oct 2026", "1 Nov 2026 · 9:12 AM", "Verified", "LAB-1002", "HbA1c 9.2%", "HbA1c 9.2% on 31 Oct.");
  const order = pv("E-prescribe", "20 Oct 2026", "20 Oct 2026", "Verified", "MED-ORD-1002", "METFORMIN 1000 MG BID", "Metformin 1000 mg twice daily ordered.");
  const fill = pv(
    "Pharmacy benefit manager",
    "20 Oct 2026",
    "20 Oct 2026 · 4:44 PM",
    "Conflict",
    "RX-1002",
    "Last paid fill 15 Aug. 20 Oct refill REJECTED — prior authorisation.",
    "20 Oct refill was rejected for prior authorisation. Last paid fill was 15 Aug.",
    "A rejected fill is not non-adherence.",
  );
  const reported = pv("Patient-reported medication list", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "MED-RPT-1002", "", "Current use unconfirmed.");
  const missingAdmin = pv("Medication administration feed", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "MAR-1002", "", "Missing");
  const noshow = pv("Scheduling", "3 Nov 2026", "3 Nov 2026 · 5:00 PM", "Pending", "APT-1002", "Diabetes visit 3 Nov marked no-show. Needs confirmation.", "3 Nov diabetes visit is marked no-show and still needs confirmation.");
  const claim = pv("Claims platform", "30 Oct 2026", "7 Nov 2026", "Pending", "CLM-1002", "Service 30 Oct received 7 Nov. Adjudication pending.", "30 Oct claim received 7 Nov and is not yet adjudicated.");
  const cost = pv("SDOH assessment", "1 Sep 2026", "1 Sep 2026", "Verified", "SDOH-1002-RX", "Difficulty affording prescriptions", "Difficulty affording prescriptions.");
  const food = pv("SDOH assessment", "1 Sep 2026", "1 Sep 2026", "Verified", "SDOH-1002-FD", "Food insecurity — sometimes", "Food insecurity, sometimes.");
  const noAnswer = pv("Outreach log", "2 Nov 2026 · 11:05 AM", "2 Nov 2026 · 11:06 AM", "Verified", "OUT-1002-1", "No answer", "No answer on 2 Nov.");
  const vm = pv("Outreach log", "4 Nov 2026 · 3:12 PM", "4 Nov 2026 · 3:13 PM", "Verified", "OUT-1002-2", "Voicemail", "Voicemail on 4 Nov.");
  const eligibility = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "ELIG-1002", "MA active 2026", "Medicare Advantage active for 2026.");
  const contact = pv("Member directory", "1 Sep 2026", "1 Sep 2026", "Verified", "CTC-1002", "Mobile 555-0114 verified", "Verified mobile.");
  const allergy = pv("Allergy list", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ALG-1002", "", "Missing");
  const instructions = pv("Clinical documents", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "INS-1002", "", "No discharge instruction in the current feed.");
  const hospitalMissing = pv("ADT feed", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ADT-1002", "No admission or ED event on the ADT feed", "No current ADT event.");
  const pcp = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "PCP-1002", "PCP Andre Walsh MD", "Dr. Andre Walsh");
  const dq = pv("Claims platform", "30 Oct 2026", "7 Nov 2026", "Pending", "DQ-1002", "Oct 30 claim not yet adjudicated", "Pending: Oct 30 claim not yet adjudicated.");

  return {
    id: "SYN-1002",
    name: "Marcus Reed",
    age: 55,
    plan: "Medicare Advantage",
    planShort: "MA",
    programme: "Diabetes",
    programmeTag: "Diabetes",
    priority: "Medium",
    factors: { c: 2, t: 2, b: 2 },
    why: "Elevated HbA1c with rejected refill and missed diabetes follow-up",
    factorChips: ["Clinical need", "Time sensitivity", "Barriers"],
    prepareFor: "Prepare to investigate refill rejection and reschedule follow-up",
    dueLabel: "Today / next business day",
    dueRank: 2,
    primaryAction: "member",
    dataQuality: { tone: "amber", text: "Pending: Oct 30 claim not yet adjudicated.", provenance: dq },
    identity: "Verified",
    language: "English",
    pcp: "Dr. Andre Walsh",
    pcpProvenance: pcp,
    eligibilityStart: "1 Jan 2026",
    eligibilityEnd: "31 Dec 2026",
    eligibilityProvenance: eligibility,
    contact: { value: "555-0114", channel: "Phone", bestTime: "Afternoon", verified: true, provenance: contact },
    permissions: [],
    conditions: [{ name: "Type 2 diabetes", provenance: dm }],
    allergies: [{ name: "Missing", provenance: allergy }],
    labs: [{ label: "HbA1c", value: "9.2%", provenance: a1c }],
    dischargeInstructions: { text: "No discharge instruction in the current feed.", provenance: instructions },
    recentEvent: { title: "No current admission. Diabetes visit on 3 Nov is marked no-show and needs confirmation.", provenance: noshow },
    medications: [
      {
        id: "metformin",
        name: "Metformin",
        ordered: { label: "1000 mg twice daily", provenance: order },
        dispensed: { label: "20 Oct refill rejected. Last paid fill 15 Aug.", provenance: fill },
        reported: { label: "Current use unconfirmed", provenance: reported },
        administered: { label: "Missing", provenance: missingAdmin },
      },
    ],
    hospital: [
      {
        id: "h1",
        title: "No current ADT event",
        detail: "No admission or ED event is on the ADT feed. Missing is not low risk.",
        eventTime: "—",
        receivedTime: "—",
        provenance: hospitalMissing,
      },
    ],
    sdoh: [
      { id: "s1", barrier: "Difficulty affording prescriptions", provenance: cost },
      { id: "s2", barrier: "Food insecurity, sometimes", provenance: food },
    ],
    outreach: [
      { id: "o1", time: "2 Nov 2026 · 11:05 AM", channel: "Phone", outcome: "No answer", person: "No live answer", provenance: noAnswer },
      { id: "o2", time: "4 Nov 2026 · 3:12 PM", channel: "Phone", outcome: "Voicemail", person: "No live answer", provenance: vm },
    ],
    tasks: [
      { id: "t1", title: "Investigate rejected refill", owner: RN_NAME, due: "9 Nov 2026", status: "Open", source: "rule" },
    ],
    appointments: [
      { id: "a1", kind: "appointment", title: "Diabetes follow-up", when: "3 Nov 2026", state: "no-show", provenance: noshow },
    ],
    claims: [
      { id: "c1", description: "Outpatient diabetes service", serviceDate: "30 Oct 2026", receivedDate: "7 Nov 2026", adjudicationDate: "Pending", provenance: claim },
    ],
    aiSummary: {
      sentences: [
        { text: "HbA1c was 9.2% on 31 Oct.", cite: 1 },
        { text: "Metformin 1000 mg twice daily is ordered. The 20 Oct refill was rejected for prior authorisation, and the last paid fill was 15 Aug.", cite: 2 },
        { text: "The 3 Nov diabetes visit is marked no-show and still needs confirmation.", cite: 3 },
        { text: "Do not label Marcus non-adherent from fill data alone.", cite: 2 },
      ],
      citations: [
        { n: 1, label: "HbA1c", provenance: a1c },
        { n: 2, label: "Rejected refill", provenance: fill },
        { n: 3, label: "Follow-up status", provenance: noshow },
      ],
    },
    nextActions: [
      { id: "na1", title: "Investigate the rejected refill and prior authorisation", detail: "Separate the benefit rejection from any assumption about use.", playbook: "Diabetes access barrier v3", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na2", title: "Review HbA1c 9.2% with clinical context", detail: "The lab is verified. It does not by itself explain the rejected fill.", playbook: "Diabetes access barrier v3", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na3", title: "Reschedule the diabetes follow-up", detail: "No-show status still needs confirmation.", playbook: "Diabetes access barrier v3", owner: RN_NAME, due: "10 Nov 2026" },
      { id: "na4", title: "Ask about prescription cost and food access", detail: "Both barriers are on the September assessment.", playbook: "Diabetes access barrier v3", owner: RN_NAME, due: "10 Nov 2026" },
    ],
    callBrief: {
      points: ["HbA1c 9.2% on 31 Oct.", "Refill rejected 20 Oct for prior authorisation.", "3 Nov visit marked no-show, unconfirmed.", "Cost and food barriers are on file."],
      lastSuccess: "No live answer. Voicemail was left 4 Nov.",
      concerns: ["Getting the refill covered.", "A follow-up that may not have been a true no-show."],
    },
    careGoals: ["Resolve the rejected refill without an adherence label.", "Reschedule diabetes follow-up after confirming the 3 Nov status."],
    playbook: "Diabetes access barrier v3",
    factorDetails: [
      { key: "C", label: "Clinical need", score: 2, max: 3, rationale: "Elevated HbA1c with a rejected refill. Current use is unconfirmed.", evidence: [{ label: "HbA1c", provenance: a1c }, { label: "Refill", provenance: fill }] },
      { key: "T", label: "Time sensitivity", score: 2, max: 3, rationale: "Missed follow-up and a same-day or next-business-day refill review.", evidence: [{ label: "Visit", provenance: noshow }] },
      { key: "B", label: "Barriers", score: 2, max: 2, rationale: "Prescription affordability and food insecurity.", evidence: [{ label: "Cost", provenance: cost }, { label: "Food", provenance: food }] },
    ],
  };
}

function olivia(): Patient {
  const ed1 = pv("ADT feed", "18 Sep 2026 · 9:20 PM", "18 Sep 2026 · 10:02 PM", "Verified", "ADT-1003-1", "ED visit 18 Sep confirmed", "Confirmed ED visit 18 Sep.");
  const ed2 = pv("ADT feed", "22 Oct 2026 · 1:14 AM", "22 Oct 2026 · 2:05 AM", "Verified", "ADT-1003-2", "ED visit 22 Oct confirmed", "Confirmed ED visit 22 Oct.");
  const unmatched = pv(
    "HIE",
    "7 Nov 2026",
    "7 Nov 2026 · 7:41 AM",
    "Unmatched",
    "HIE-OLD-77",
    "Legacy ID OLD-77, name variant Olivia Chan. Summary missing.",
    "Possible 7 Nov ED event. Not merged.",
    "Identity is unconfirmed. Do not merge automatically.",
  );
  const asthma = pv("Problem list", "18 Sep 2026", "19 Sep 2026", "Verified", "DX-1003", "Prior asthma exacerbations", "Prior asthma exacerbations.");
  const albuterol = pv("Pharmacy benefit manager", "15 Sep 2026", "15 Sep 2026 · 5:30 PM", "Verified", "RX-1003", "ALBUTEROL HFA dispensed", "Albuterol dispensed 15 Sep.");
  const rxMissing = pv("Pharmacy benefit manager", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "RX-1003-X", "", "Missing");
  const phone = pv("Outreach log", "2 Nov 2026", "2 Nov 2026", "Conflict", "CTC-1003", "Primary phone disconnected 1 Nov and 2 Nov. No alternate confirmed.", "Primary phone disconnected. No alternate confirmed.");
  const pulm = pv("Referral registry", "22 Oct 2026", "23 Oct 2026", "Missing", "REF-1003", "Pulmonology follow-up recommended. Scheduling unknown.", "Pulmonology follow-up recommended. Scheduling state is unknown.");
  const claim1 = pv("Claims platform", "18 Sep 2026", "25 Sep 2026", "Verified", "CLM-1003-1", "ED 18 Sep adjudicated 2 Oct", "18 Sep ED claim, adjudicated 2 Oct.");
  const claim2 = pv("Claims platform", "22 Oct 2026", "29 Oct 2026", "Verified", "CLM-1003-2", "ED 22 Oct adjudicated 5 Nov", "22 Oct ED claim, adjudicated 5 Nov.");
  const attempt1 = pv("Outreach log", "1 Nov 2026 · 10:12 AM", "1 Nov 2026 · 10:12 AM", "Verified", "OUT-1003-1", "Wrong/disconnected number", "Disconnected number on 1 Nov.");
  const attempt2 = pv("Outreach log", "2 Nov 2026 · 10:06 AM", "2 Nov 2026 · 10:06 AM", "Verified", "OUT-1003-2", "Wrong/disconnected number", "Disconnected number on 2 Nov.");
  const eligibility = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "ELIG-1003", "MA active. Legacy ID OLD-77 not linked.", "Medicare Advantage active. Legacy ID is not linked.");
  const allergy = pv("Allergy list", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ALG-1003", "", "Missing");
  const labs = pv("Laboratory", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "LAB-1003", "", "Missing");
  const instructions = pv("Clinical documents", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "INS-1003", "", "Missing");
  const pcp = pv("Member eligibility", "1 Jan 2026", "1 Jan 2026", "Verified", "PCP-1003", "PCP Nina Patel MD", "Dr. Nina Patel");

  return {
    id: "SYN-1003",
    aliases: ["OLD-77", "Olivia Chan"],
    name: "Olivia Chen",
    age: 47,
    plan: "Medicare Advantage",
    planShort: "MA",
    programme: "Recurrent ED",
    programmeTag: "Recurrent ED",
    priority: "Medium",
    factors: { c: 2, t: 1, b: 1 },
    why: "Two confirmed ED visits with unsuccessful outreach and contact issue",
    factorChips: ["Clinical need", "Outreach barrier"],
    prepareFor: "Prepare to review confirmed ED history and verify contact; separate identity task",
    dueLabel: "Today / next business day",
    dueRank: 3,
    primaryAction: "member",
    dataQuality: {
      tone: "purple",
      text: "Unmatched: possible Nov 7 ED event under legacy ID OLD-77 / 'Olivia Chan'. Not merged – identity-resolution task due Nov 9.",
      provenance: unmatched,
    },
    identity: "Unmatched",
    language: "English",
    pcp: "Dr. Nina Patel",
    pcpProvenance: pcp,
    eligibilityStart: "1 Jan 2026",
    eligibilityEnd: "31 Dec 2026",
    eligibilityProvenance: eligibility,
    contact: { value: "Primary phone disconnected", channel: "Phone", bestTime: "Unknown", verified: false, provenance: phone },
    permissions: [],
    conditions: [{ name: "Asthma, prior exacerbations", provenance: asthma }],
    allergies: [{ name: "Missing", provenance: allergy }],
    labs: [{ label: "Key labs", value: "Missing", provenance: labs }],
    dischargeInstructions: { text: "Missing", provenance: instructions },
    recentEvent: { title: "Confirmed ED visits on 18 Sep and 22 Oct. A 7 Nov HIE event is unmatched and not merged.", provenance: ed2 },
    medications: [
      {
        id: "albuterol",
        name: "Albuterol",
        ordered: { label: "Missing", provenance: rxMissing },
        dispensed: { label: "Dispensed 15 Sep", provenance: albuterol },
        reported: { label: "Missing", provenance: rxMissing },
        administered: { label: "Missing", provenance: rxMissing },
      },
    ],
    hospital: [
      { id: "h1", title: "ED visit", detail: "Confirmed.", eventTime: "18 Sep 2026 · 9:20 PM", receivedTime: "18 Sep 2026 · 10:02 PM", provenance: ed1 },
      { id: "h2", title: "ED visit", detail: "Confirmed.", eventTime: "22 Oct 2026 · 1:14 AM", receivedTime: "22 Oct 2026 · 2:05 AM", provenance: ed2 },
      { id: "h3", title: "Possible ED event — not merged", detail: "Legacy ID OLD-77 / Olivia Chan. Summary missing. Identity unconfirmed.", eventTime: "7 Nov 2026", receivedTime: "7 Nov 2026 · 7:41 AM", provenance: unmatched },
    ],
    sdoh: [{ id: "s1", barrier: "No confirmed alternate contact after the primary phone failed", provenance: phone }],
    outreach: [
      { id: "o1", time: "1 Nov 2026 · 10:12 AM", channel: "Phone", outcome: "Wrong/disconnected number", person: "Not reached", provenance: attempt1 },
      { id: "o2", time: "2 Nov 2026 · 10:06 AM", channel: "Phone", outcome: "Wrong/disconnected number", person: "Not reached", provenance: attempt2 },
    ],
    tasks: [
      { id: "t1", title: "Identity resolution — do not merge", owner: RN_NAME, due: "9 Nov 2026", status: "Open", source: "rule" },
      { id: "t2", title: "Contact verification", owner: RN_NAME, due: "9 Nov 2026", status: "Open", source: "rule" },
    ],
    appointments: [
      { id: "a1", kind: "referral", title: "Pulmonology follow-up", when: "Scheduling unknown", state: "unknown", provenance: pulm },
    ],
    claims: [
      { id: "c1", description: "ED visit", serviceDate: "18 Sep 2026", receivedDate: "25 Sep 2026", adjudicationDate: "2 Oct 2026", provenance: claim1 },
      { id: "c2", description: "ED visit", serviceDate: "22 Oct 2026", receivedDate: "29 Oct 2026", adjudicationDate: "5 Nov 2026", provenance: claim2 },
    ],
    aiSummary: {
      sentences: [
        { text: "Two ED visits are confirmed, on 18 Sep and 22 Oct.", cite: 1 },
        { text: "A possible 7 Nov event under legacy ID OLD-77 and the name Olivia Chan is unmatched and has not been merged.", cite: 2 },
        { text: "Outreach failed because the primary phone is disconnected, and no alternate is confirmed.", cite: 3 },
      ],
      citations: [
        { n: 1, label: "Confirmed ED visits", provenance: ed2 },
        { n: 2, label: "Unmatched identity", provenance: unmatched },
        { n: 3, label: "Contact", provenance: phone },
      ],
    },
    nextActions: [
      { id: "na1", title: "Review the two confirmed ED visits", detail: "Use 18 Sep and 22 Oct only for the clinical history.", playbook: "Recurrent ED review v2", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na2", title: "Route identity resolution. Do not merge.", detail: "OLD-77 / Olivia Chan stays a separate data-quality task.", playbook: "Recurrent ED review v2", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na3", title: "Verify contact through an approved channel", detail: "The primary number is disconnected.", playbook: "Recurrent ED review v2", owner: RN_NAME, due: "9 Nov 2026" },
      { id: "na4", title: "Check whether pulmonology scheduling is known", detail: "Recommended is not the same as scheduled.", playbook: "Recurrent ED review v2", owner: RN_NAME, due: "10 Nov 2026" },
    ],
    callBrief: {
      points: ["Confirmed ED: 18 Sep and 22 Oct.", "7 Nov HIE row is unmatched. Do not merge.", "Phone disconnected 1 Nov and 2 Nov.", "Pulmonology scheduling is unknown."],
      lastSuccess: "No successful contact. Both November attempts hit a disconnected number.",
      concerns: ["Identity of the 7 Nov event.", "No working phone on file."],
    },
    careGoals: ["Keep the unmatched event out of the confirmed history.", "Find an approved way to reach Olivia."],
    playbook: "Recurrent ED review v2",
    factorDetails: [
      { key: "C", label: "Clinical need", score: 2, max: 3, rationale: "Two confirmed ED visits and prior asthma exacerbations. The unmatched 7 Nov row is not added to the score.", evidence: [{ label: "22 Oct ED", provenance: ed2 }, { label: "Asthma", provenance: asthma }] },
      { key: "T", label: "Time sensitivity", score: 1, max: 3, rationale: "Review today or the next business day. The identity task is separate from urgency.", evidence: [{ label: "Unmatched row", provenance: unmatched }] },
      { key: "B", label: "Barriers", score: 1, max: 2, rationale: "Unsuccessful outreach because the primary phone is disconnected.", evidence: [{ label: "Phone", provenance: phone }] },
    ],
  };
}

function daniel(): Patient {
  const sensitive = pv(
    "Behavioural health record",
    "15 Aug 2026",
    "15 Aug 2026",
    "Verified",
    "BH-1004",
    "Restricted assessment. Authorised team only.",
    "Behavioural-health assessment on 15 Aug. Detail is restricted.",
  );
  const housing = pv(
    "SDOH assessment",
    "1 Feb 2026",
    "1 Feb 2026",
    "Stale",
    "SDOH-1004-H",
    "Housing instability and financial strain reported",
    "Housing instability and financial strain. Assessment is 9+ months old.",
  );
  const transport = pv("SDOH assessment", "1 Feb 2026", "1 Feb 2026", "Stale", "SDOH-1004-T", "Transport sometimes difficult", "Transport is sometimes difficult. Source assessment is stale.");
  const sms = pv("Outreach log", "2 Nov 2026 · 9:00 AM", "2 Nov 2026 · 9:00 AM", "Verified", "OUT-1004", "SMS delivered. No reply. Delivered is not read.", "SMS delivered 2 Nov. No reply. Delivered ≠ read.");
  const preference = pv("Safe-contact preference", "1 Feb 2026", "1 Feb 2026", "Verified", "CTC-1004", "Text-first. No voicemail. Phone attempt suppressed.", "Text first. No voicemail. Phone attempts are suppressed.");
  const referral = pv("Referral registry", "20 Aug 2026", "20 Aug 2026", "Pending", "REF-1004", "BH referral submitted. No return status.", "Referral was submitted. Submitted is not accepted or scheduled.");
  const claim = pv("Claims platform", "12 Jun 2026", "19 Jun 2026", "Verified", "CLM-1004", "Outpatient BH claim June, adjudicated 30 Jun", "June outpatient behavioural-health claim only.");
  const eligibility = pv("Member eligibility", "1 Mar 2026", "1 Mar 2026", "Verified", "ELIG-1004", "Commercial active", "Commercial plan active.");
  const allergy = pv("Allergy list", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ALG-1004", "", "Missing");
  const labs = pv("Laboratory", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "LAB-1004", "", "Missing");
  const instructions = pv("Clinical documents", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "INS-1004", "", "Missing");
  const hospitalMissing = pv("ADT feed", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "ADT-1004", "No current ADT event", "No current ADT event.");
  const rxMissing = pv("Pharmacy benefit manager", "9 Nov 2026", "9 Nov 2026 · 8:00 AM", "Missing", "RX-1004", "", "No medication record in this feed.");
  const pcp = pv("Member eligibility", "1 Mar 2026", "1 Mar 2026", "Verified", "PCP-1004", "PCP Luis Romero MD", "Dr. Luis Romero");
  const dq = pv("SDOH assessment", "1 Feb 2026", "1 Feb 2026", "Stale", "DQ-1004", "Social-needs assessment 9+ months old", "Stale: social-needs assessment is 9+ months old.");

  return {
    id: "SYN-1004",
    name: "Daniel Ortiz",
    age: 39,
    plan: "Commercial",
    planShort: "Commercial",
    programme: "Behavioural health",
    programmeTag: "Behavioural health + housing",
    priority: "Routine",
    factors: { c: 1, t: 1, b: 1 },
    why: "Outdated social-needs assessment and incomplete referral status",
    factorChips: ["Routine clinical need", "Reassessment barrier"],
    prepareFor: "Prepare to reconfirm current needs using safe contact preferences",
    dueLabel: "1–2 business days",
    dueRank: 4,
    primaryAction: "outreach",
    dataQuality: { tone: "amber", text: "Stale: social-needs assessment is 9+ months old.", provenance: dq },
    identity: "Verified",
    language: "English",
    pcp: "Dr. Luis Romero",
    pcpProvenance: pcp,
    eligibilityStart: "1 Mar 2026",
    eligibilityEnd: "28 Feb 2027",
    eligibilityProvenance: eligibility,
    contact: { value: "SMS only", channel: "SMS", bestTime: "Text first, no voicemail", verified: true, provenance: preference },
    permissions: [{ who: "Safe-contact rule", scope: "Text first. Do not leave voicemail. Phone attempts stay suppressed.", warning: "Do not switch channel without a new preference." }],
    conditions: [],
    allergies: [{ name: "Missing", provenance: allergy }],
    labs: [{ label: "Key labs", value: "Missing", provenance: labs }],
    dischargeInstructions: { text: "Missing", provenance: instructions },
    recentEvent: { title: "No current hospital event", provenance: hospitalMissing },
    medications: [
      {
        id: "none",
        name: "No medication on file",
        ordered: { label: "Missing", provenance: rxMissing },
        dispensed: { label: "Missing", provenance: rxMissing },
        reported: { label: "Missing", provenance: rxMissing },
        administered: { label: "Missing", provenance: rxMissing },
      },
    ],
    hospital: [
      { id: "h1", title: "No current ADT event", detail: "No admission is on the ADT feed.", eventTime: "—", receivedTime: "—", provenance: hospitalMissing },
    ],
    sdoh: [
      { id: "s1", barrier: "Housing instability reported 1 Feb", provenance: housing },
      { id: "s2", barrier: "Financial strain reported 1 Feb", provenance: housing },
      { id: "s3", barrier: "Transport sometimes difficult", provenance: transport },
    ],
    sensitive: {
      title: "Behavioural-health assessment",
      body: "An assessment was recorded on 15 Aug 2026. The note is limited to the authorised team. This demo does not add a diagnosis beyond the restricted record.",
      provenance: sensitive,
    },
    outreach: [
      { id: "o1", time: "2 Nov 2026 · 9:00 AM", channel: "SMS", outcome: "SMS delivered (not read/consent)", person: "Not confirmed", provenance: sms },
    ],
    tasks: [
      { id: "t1", title: "Re-screen social needs", owner: RN_NAME, due: "11 Nov 2026", status: "Open", source: "rule" },
    ],
    appointments: [
      { id: "a1", kind: "referral", title: "Behavioural health referral", when: "Submitted 20 Aug 2026", state: "requested", provenance: referral },
    ],
    claims: [
      { id: "c1", description: "Outpatient behavioural-health claim", serviceDate: "12 Jun 2026", receivedDate: "19 Jun 2026", adjudicationDate: "30 Jun 2026", provenance: claim },
    ],
    aiSummary: {
      sentences: [
        { text: "Social-needs information is from 1 Feb and is stale.", cite: 1 },
        { text: "A behavioural-health referral was submitted and has no return status. Submitted is not accepted or scheduled.", cite: 2 },
        { text: "Contact preference is text-first with no voicemail. The 2 Nov SMS was delivered, which is not the same as read.", cite: 3 },
      ],
      citations: [
        { n: 1, label: "Stale social needs", provenance: housing },
        { n: 2, label: "Referral", provenance: referral },
        { n: 3, label: "SMS", provenance: sms },
      ],
    },
    nextActions: [
      { id: "na1", title: "Reconfirm housing and safe-contact preferences", detail: "Use text. Do not phone or leave voicemail.", playbook: "Social needs rescreen v1", owner: RN_NAME, due: "11 Nov 2026" },
      { id: "na2", title: "Review referral status without assuming it was accepted", detail: "Submitted on 20 Aug. No return status.", playbook: "Social needs rescreen v1", owner: RN_NAME, due: "11 Nov 2026" },
      { id: "na3", title: "Coordinate support only after needs and permissions are confirmed", detail: "The February assessment is too old to treat as current.", playbook: "Social needs rescreen v1", owner: RN_NAME, due: "12 Nov 2026" },
    ],
    callBrief: {
      points: ["Text first. No voicemail. Phone is suppressed.", "SMS on 2 Nov was delivered and not answered.", "Housing and financial strain notes are from 1 Feb and are stale.", "BH referral submitted, with no return status."],
      lastSuccess: "No two-way conversation. Delivered SMS is not a read receipt.",
      concerns: ["Whether housing is still unstable.", "Whether the referral went anywhere."],
    },
    careGoals: ["Reconfirm current needs with the safe-contact preference.", "Do not treat a submitted referral as scheduled."],
    playbook: "Social needs rescreen v1",
    factorDetails: [
      { key: "C", label: "Clinical need", score: 1, max: 3, rationale: "Routine review. There is no new acute event in the open record.", evidence: [{ label: "Restricted assessment date", provenance: sensitive }] },
      { key: "T", label: "Time sensitivity", score: 1, max: 3, rationale: "Reassessment is due in 1–2 business days, not same-day.", evidence: [{ label: "Stale screen", provenance: housing }] },
      { key: "B", label: "Barriers", score: 1, max: 2, rationale: "Social-needs data is stale and the referral status is incomplete.", evidence: [{ label: "Referral", provenance: referral }] },
    ],
  };
}

export const patients: Patient[] = [eleanor(), priya(), marcus(), olivia(), daniel()];

export function getPatient(id: string | undefined) {
  return patients.find((patient) => patient.id === id);
}

import { Link } from "react-router-dom";
import { Clock3 } from "lucide-react";
import type { Patient, PriorityBand } from "@/types";
import { scoreOf } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PriorityPill } from "@/components/shared/PriorityPill";
import { InfoTip } from "@/components/shared/InfoTip";
import { useWorkbench } from "@/store/workbench";
import { cn } from "@/lib/utils";

function Meter({ score, max, filled }: { score: number; max: number; filled: string }) {
  return (
    <div className="mt-2 flex gap-1" aria-hidden>
      {Array.from({ length: max }).map((_, index) => (
        <span key={index} className={cn("h-2 flex-1 rounded-full", index < score ? filled : "bg-slate-200")} />
      ))}
    </div>
  );
}

export function QueueCard({
  patient,
  priority,
  overrideReason,
  onOverride,
}: {
  patient: Patient;
  priority: PriorityBand;
  overrideReason?: string;
  onOverride: () => void;
}) {
  const llm = useWorkbench((s) => s.llmUnavailable);
  const openEvidence = useWorkbench((s) => s.openEvidence);
  const total = scoreOf(patient);

  return (
    <article className="glass glass-hover p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/member/${patient.id}`} className="text-[16px] font-semibold hover:text-indigo-800">
              {patient.name}
            </Link>
            <span className="text-[13px] text-slate-500">{patient.age} · {patient.planShort}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-medium text-slate-700">
              {patient.programmeTag}
            </span>
          </div>
          <p className="mt-1 text-[12px] tabular-nums text-slate-500">
            {patient.id} · {patient.plan}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <PriorityPill band={priority} />
          {overrideReason ? <span className="text-[12px] text-slate-500">Overridden by RN</span> : null}
        </div>
      </div>

      <p className="mt-4 text-[14px] leading-6 text-slate-800">{patient.why}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {patient.factorChips.map((chip) => (
          <span key={chip} className="rounded-full bg-slate-100 px-2 py-1 text-[12px] font-medium text-slate-700">
            {chip}
          </span>
        ))}
      </div>

      <p className={cn("mt-4 text-[13px] leading-5", llm ? "text-slate-700" : "rounded-xl bg-violet-50/80 px-3 py-2 text-violet-950")}>
        {llm ? "Template · " : "✦ "}
        {patient.prepareFor}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-[13px] text-slate-600">
          <Clock3 className="h-4 w-4" aria-hidden />
          {patient.dueLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={patient.primaryAction === "member" ? "primary" : "outline"} size="sm">
            <Link to={`/member/${patient.id}`}>Open Member 360</Link>
          </Button>
          <Button asChild variant={patient.primaryAction === "outreach" ? "primary" : "outline"} size="sm">
            <Link to={`/outreach/${patient.id}`}>Prepare outreach</Link>
          </Button>
        </div>
      </div>

      {patient.dataQuality ? (
        <button
          type="button"
          onClick={() => openEvidence(patient.dataQuality!.provenance, "Data-quality task")}
          className={cn(
            "mt-4 w-full rounded-xl px-4 py-3 text-left ring-1 ring-inset transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
            patient.dataQuality.tone === "purple" ? "bg-purple-50 text-purple-950 ring-purple-200" : "bg-amber-50 text-amber-950 ring-amber-200",
          )}
        >
          <span className="text-[12px] font-semibold uppercase tracking-wide">Data-quality task</span>
          <span className="mt-1 block text-[13px] leading-5">{patient.dataQuality.text}</span>
        </button>
      ) : null}

      <Accordion type="single" collapsible className="mt-2">
        <AccordionItem value="why" className="border-0">
          <div className="flex items-center gap-2">
            <AccordionTrigger className="flex-1">Why am I seeing this patient?</AccordionTrigger>
            <InfoTip label="What is C/T/B?">
              C is clinical need (0–3), T is time sensitivity (0–3), and B is barriers (0–2). The total is an operational review-order index out of 8. Deterministic rules calculate it. AI does not set this score, and it is not a clinical risk score.
            </InfoTip>
          </div>
          <AccordionContent>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-end justify-between gap-4">
                <p className="text-[12px] font-medium uppercase tracking-wide text-slate-500">Rule-calculated index</p>
                <p className="text-[20px] font-semibold tabular-nums">{total}/8</p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {patient.factorDetails.map((factor) => (
                  <div key={factor.key}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium">{factor.key} · {factor.label}</span>
                      <span className="tabular-nums text-slate-500">{factor.score}/{factor.max}</span>
                    </div>
                    <Meter
                      score={factor.score}
                      max={factor.max}
                      filled={factor.key === "C" ? "bg-indigo-500" : factor.key === "T" ? "bg-teal-500" : "bg-amber-500"}
                    />
                    <p className="mt-2 text-[13px] leading-5 text-slate-600">{factor.rationale}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {factor.evidence.map((item) => (
                        <button
                          key={item.provenance.recordId}
                          type="button"
                          onClick={() => openEvidence(item.provenance, item.label)}
                          className="text-[12px] font-medium text-indigo-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {overrideReason ? (
                <p className="mt-4 text-[13px] text-slate-600">Override reason: {overrideReason}</p>
              ) : null}
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={onOverride}>
                  Override priority
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
}

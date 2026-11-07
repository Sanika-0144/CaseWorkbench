import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, PanelRight, Rows3 } from "lucide-react";
import { patients } from "@/data/patients";
import { recentChanges } from "@/data/activity";
import { bandRank, cn, scoreOf } from "@/lib/utils";
import type { PriorityBand, Programme } from "@/types";
import { PROGRAMMES } from "@/types";
import { useWorkbench } from "@/store/workbench";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Menu, MenuItem } from "@/components/ui/dropdown";
import { PriorityPill } from "@/components/shared/PriorityPill";
import { LlmBanner } from "@/components/shared/LlmBanner";
import { InfoTip } from "@/components/shared/InfoTip";
import { QueueCard } from "@/components/queue/QueueCard";
import { OverrideDialog } from "@/components/queue/OverrideDialog";

let warmed = false;
type BandFilter = "All" | PriorityBand;
type SortKey = "Priority" | "Due time";

export function QueuePage() {
  const [ready, setReady] = useState(warmed);
  const [band, setBand] = useState<BandFilter>("All");
  const [programme, setProgramme] = useState<Programme | "All">("All");
  const [dqOnly, setDqOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("Priority");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [overrideId, setOverrideId] = useState<string | null>(null);
  const overrides = useWorkbench((s) => s.overrides);
  const panelOpen = useWorkbench((s) => s.panelOpen);
  const togglePanel = useWorkbench((s) => s.togglePanel);
  const llm = useWorkbench((s) => s.llmUnavailable);

  useEffect(() => {
    document.title = "Priority Queue · CaseWorkbench";
    if (warmed) return;
    const timer = window.setTimeout(() => {
      warmed = true;
      setReady(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  const ranked = useMemo(() => {
    return patients
      .map((patient) => ({ patient, priority: overrides[patient.id]?.band ?? patient.priority }))
      .filter((row) => (band === "All" ? true : row.priority === band))
      .filter((row) => (programme === "All" ? true : row.patient.programme === programme))
      .filter((row) => (dqOnly ? Boolean(row.patient.dataQuality) : true))
      .sort((a, b) => {
        if (sort === "Due time") return a.patient.dueRank - b.patient.dueRank;
        const byBand = bandRank(a.priority) - bandRank(b.priority);
        if (byBand !== 0) return byBand;
        return scoreOf(b.patient) - scoreOf(a.patient);
      });
  }, [band, programme, dqOnly, sort, overrides]);

  const counts = {
    High: patients.filter((p) => (overrides[p.id]?.band ?? p.priority) === "High").length,
    Medium: patients.filter((p) => (overrides[p.id]?.band ?? p.priority) === "Medium").length,
    Routine: patients.filter((p) => (overrides[p.id]?.band ?? p.priority) === "Routine").length,
    dq: patients.filter((p) => p.dataQuality).length,
  };

  if (!ready) {
    return (
      <div className="space-y-4" aria-busy="true" aria-live="polite">
        <Skeleton className="h-16 w-2/3" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-40" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight">Good morning, Maria</h1>
          <p className="mt-2 text-[14px] text-slate-600">6 new discharge alerts since Friday · 5 members need review today</p>
          <p className="mt-2 text-[13px] text-slate-500">One trusted member picture. One clear next action.</p>
        </div>
        <IconButton label={panelOpen ? "Hide today's panel" : "Show today's panel"} onClick={togglePanel}>
          <PanelRight className="h-4 w-4" />
        </IconButton>
      </div>

      {llm ? (
        <div className="mt-4">
          <LlmBanner />
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(
          [
            ["High", counts.High, "High", "border-rose-200/80 bg-rose-50/90", "text-rose-700", "text-rose-800", "ring-rose-400"],
            ["Medium", counts.Medium, "Medium", "border-amber-200/80 bg-amber-50/90", "text-amber-800", "text-amber-950", "ring-amber-400"],
            ["Routine", counts.Routine, "Routine", "border-emerald-200/80 bg-emerald-50/90", "text-emerald-800", "text-emerald-950", "ring-emerald-400"],
          ] as const
        ).map(([label, count, value, card, labelTone, numberTone, ring]) => (
          <button
            key={label}
            type="button"
            onClick={() => setBand(band === value ? "All" : value)}
            className={cn(
              "rounded-2xl border p-4 text-left shadow-card backdrop-blur-md transition duration-200",
              card,
              band === value && cn("ring-2", ring),
            )}
          >
            <span className={cn("inline-flex items-center gap-2 text-[12px] font-medium", labelTone)}>
              <span className={cn("h-2 w-2 rounded-full", value === "High" ? "bg-rose-500" : value === "Medium" ? "bg-amber-500" : "bg-emerald-500")} aria-hidden />
              {label}
            </span>
            <span className={cn("mt-2 block text-[28px] font-semibold tabular-nums", numberTone)}>{count}</span>
          </button>
        ))}
        <div className={cn("rounded-2xl border border-purple-200/80 bg-purple-50/90 p-4 text-left shadow-card backdrop-blur-md", dqOnly && "ring-2 ring-purple-400")}>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-purple-800">
            <button type="button" onClick={() => setDqOnly((value) => !value)} className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
              <span className="h-2 w-2 rounded-full bg-purple-500" aria-hidden />
              Data-quality tasks
            </button>
            <InfoTip label="Data quality is separate">
              A data-quality task is not a clinical urgency score. Missing data is not low risk.
            </InfoTip>
          </span>
          <button type="button" onClick={() => setDqOnly((value) => !value)} className="mt-2 block text-[28px] font-semibold tabular-nums text-purple-950">
            {counts.dq}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(["All", "High", "Medium", "Routine"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={band === item}
            onClick={() => setBand(item)}
            className={cn(
              "h-8 rounded-full px-3 text-[13px] font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              item === "All" && (band === item ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200"),
              item === "High" && (band === item ? "bg-rose-600 text-white" : "bg-rose-50 text-rose-800 ring-1 ring-rose-200"),
              item === "Medium" && (band === item ? "bg-amber-500 text-amber-950" : "bg-amber-50 text-amber-900 ring-1 ring-amber-200"),
              item === "Routine" && (band === item ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"),
            )}
          >
            {item}
          </button>
        ))}
        <label className="ml-2 inline-flex items-center gap-2 text-[13px] text-slate-600">
          <span className="sr-only">Programme</span>
          <select
            aria-label="Programme"
            value={programme}
            onChange={(event) => setProgramme(event.target.value as Programme | "All")}
            className="h-8 rounded-xl border border-slate-200 bg-white px-2 text-[13px]"
          >
            <option value="All">All programmes</option>
            {PROGRAMMES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="inline-flex items-center gap-2 text-[13px] text-slate-700">
          <Switch checked={dqOnly} onCheckedChange={setDqOnly} aria-label="Has data-quality task" />
          Has data-quality task
        </label>
        <Menu
          trigger={
            <Button variant="outline" size="sm">
              Sort: {sort}
            </Button>
          }
        >
          <MenuItem active={sort === "Priority"} onSelect={() => setSort("Priority")}>
            Priority
          </MenuItem>
          <MenuItem active={sort === "Due time"} onSelect={() => setSort("Due time")}>
            Due time
          </MenuItem>
        </Menu>
        <div className="ml-auto flex gap-1">
          <IconButton label="Card view" onClick={() => setView("cards")} className={view === "cards" ? "bg-slate-100" : ""}>
            <LayoutGrid className="h-4 w-4" />
          </IconButton>
          <IconButton label="Table view" onClick={() => setView("table")} className={view === "table" ? "bg-slate-100" : ""}>
            <Rows3 className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className={cn("mt-6 grid gap-4", panelOpen && "xl:grid-cols-[minmax(0,1fr)_320px]")}>
        <div className="min-w-0">
          {ranked.length === 0 ? (
            <div className="glass px-6 py-16 text-center">
              <p className="text-[20px] font-semibold">No members in this view</p>
              <p className="mt-2 text-[14px] text-slate-600">One trusted member picture. One clear next action.</p>
              <Button className="mt-4" variant="outline" onClick={() => { setBand("All"); setProgramme("All"); setDqOnly(false); }}>
                Clear filters
              </Button>
            </div>
          ) : view === "cards" ? (
            <div className="space-y-4">
              {ranked.map(({ patient, priority }) => (
                <QueueCard
                  key={patient.id}
                  patient={patient}
                  priority={priority}
                  overrideReason={overrides[patient.id]?.reason}
                  onOverride={() => setOverrideId(patient.id)}
                />
              ))}
            </div>
          ) : (
            <div className="glass overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-[13px]">
                <thead className="text-[12px] uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Member</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Why</th>
                    <th className="px-4 py-3 font-medium">Due</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ranked.map(({ patient, priority }) => (
                    <tr key={patient.id} className="border-t border-slate-100">
                      <td className="px-4 py-3">
                        <Link to={`/member/${patient.id}`} className="font-medium hover:text-indigo-800">{patient.name}</Link>
                        <p className="text-[12px] text-slate-500">{patient.id} · {patient.programmeTag}</p>
                      </td>
                      <td className="px-4 py-3"><PriorityPill band={priority} /></td>
                      <td className="max-w-sm px-4 py-3 leading-5">{patient.why}</td>
                      <td className="px-4 py-3">{patient.dueLabel}</td>
                      <td className="px-4 py-3">
                        <Link to={patient.primaryAction === "outreach" ? `/outreach/${patient.id}` : `/member/${patient.id}`} className="font-medium text-indigo-700">
                          {patient.primaryAction === "outreach" ? "Prepare outreach" : "Open Member 360"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {panelOpen ? (
          <aside className="space-y-4">
            <section className="glass p-4">
              <h2 className="text-[16px] font-semibold">Today's capacity</h2>
              <p className="mt-2 text-[13px] leading-5 text-slate-600">5 reviews are queued. Work High before Routine. Data-quality tasks stay on their own strip.</p>
              <div className="mt-4 flex gap-1" aria-label="5 of 8 review slots">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} className={cn("h-2 flex-1 rounded-full", index < 5 ? "bg-indigo-500" : "bg-slate-200")} />
                ))}
              </div>
              <p className="mt-2 text-[12px] tabular-nums text-slate-500">5 of 8 review slots · 48 active cases</p>
            </section>
            <section className="glass p-4">
              <h2 className="text-[16px] font-semibold">Recent changes</h2>
              <ul className="mt-3 space-y-3">
                {recentChanges.map((item) => (
                  <li key={item.id} className="text-[13px] leading-5">
                    <span className="font-medium text-slate-500">{item.time}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        ) : null}
      </div>

      <footer className="mt-6 space-y-2 text-[12px] leading-5 text-slate-500">
        <p>Priority is an operational review-order index, not a clinical risk score.</p>
        <p>AI understands and drafts. Deterministic rules calculate priority. The RN verifies, decides and approves.</p>
      </footer>

      <OverrideDialog
        key={overrideId ?? "none"}
        patientId={overrideId}
        open={Boolean(overrideId)}
        onOpenChange={(open) => {
          if (!open) setOverrideId(null);
        }}
      />
    </div>
  );
}

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, RefreshCw, Search, Settings } from "lucide-react";
import { patients } from "@/data/patients";
import { recentChanges } from "@/data/activity";
import { DEMO_DATE } from "@/types";
import { useWorkbench } from "@/store/workbench";
import { IconButton } from "@/components/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export function TopBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const lastRefreshed = useWorkbench((s) => s.lastRefreshed);
  const refreshFeeds = useWorkbench((s) => s.refreshFeeds);
  const llmUnavailable = useWorkbench((s) => s.llmUnavailable);
  const setLlmUnavailable = useWorkbench((s) => s.setLlmUnavailable);
  const showP0 = useWorkbench((s) => s.showP0);
  const setShowP0 = useWorkbench((s) => s.setShowP0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return patients.filter((patient) => {
      const haystack = [patient.name, patient.id, ...(patient.aliases ?? [])].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200/80 bg-white/75 px-6 py-3 backdrop-blur-md">
      <div className="relative min-w-[220px] flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search members by name or ID"
          placeholder="Search members by name or ID"
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-[14px] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
        {open && query.trim() ? (
          <div className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
            {results.length === 0 ? (
              <p className="px-4 py-3 text-[13px] text-slate-500">No members match that search.</p>
            ) : (
              <ul>
                {results.map((patient) => (
                  <li key={patient.id}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        navigate(`/member/${patient.id}`);
                        setQuery("");
                        setOpen(false);
                      }}
                    >
                      <span className="font-medium">{patient.name}</span>
                      <span className="tabular-nums text-slate-500">{patient.id}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={refreshFeeds}
        className="inline-flex h-8 items-center gap-2 rounded-lg px-2 text-[12px] text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Last refreshed {lastRefreshed}
      </button>

      <div className="flex items-center gap-3 text-[12px] text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          Data feeds OK
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${llmUnavailable ? "bg-amber-500" : "bg-emerald-500"}`} aria-hidden />
          {llmUnavailable ? "LLM service unavailable" : "LLM service OK"}
        </span>
      </div>

      <p className="text-[13px] font-medium tabular-nums text-slate-700">{DEMO_DATE}</p>

      <Popover>
        <PopoverTrigger asChild>
          <IconButton label="Notifications" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-96">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">Notifications</p>
          <ul className="mt-3 space-y-3">
            {recentChanges.map((item) => (
              <li key={item.id} className="text-[13px] leading-5">
                <span className="font-medium text-slate-500">{item.time}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <IconButton label="Demo settings">
            <Settings className="h-4 w-4" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">Demo settings</p>
          <label className="mt-4 flex items-center justify-between gap-4">
            <span>LLM unavailable</span>
            <Switch checked={llmUnavailable} onCheckedChange={setLlmUnavailable} aria-label="Simulate LLM unavailable" />
          </label>
          <label className="mt-4 flex items-center justify-between gap-4">
            <span>Show P0 safety banner</span>
            <Switch checked={showP0} onCheckedChange={setShowP0} aria-label="Show P0 safety banner" />
          </label>
        </PopoverContent>
      </Popover>

      <span className="rounded-full border border-dashed border-slate-300 bg-white/80 px-3 py-1 text-[12px] text-slate-600">
        Synthetic data – demo only
      </span>
    </header>
  );
}

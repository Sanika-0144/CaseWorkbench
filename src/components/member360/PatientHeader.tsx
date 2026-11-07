import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { patients } from "@/data/patients";
import type { Patient, PriorityBand, TaskItem } from "@/types";
import { RN_NAME } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PriorityPill } from "@/components/shared/PriorityPill";
import { StatusChip } from "@/components/shared/StatusChip";
import { ProvenanceRow } from "@/components/shared/ProvenanceRow";
import { useWorkbench } from "@/store/workbench";

export function PatientHeader({ patient, priority }: { patient: Patient; priority: PriorityBand }) {
  const navigate = useNavigate();
  const addTask = useWorkbench((s) => s.addTask);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("2026-11-10");

  return (
    <header className="glass sticky top-0 z-20 bg-white/85 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[28px] font-semibold tracking-tight">{patient.name}</h1>
            <PriorityPill band={priority} />
            <StatusChip status={patient.identity === "Verified" ? "Verified" : "Unmatched"} />
          </div>
          <p className="mt-2 text-[13px] text-slate-600">
            {patient.age} yrs · <span className="tabular-nums">{patient.id}</span> · {patient.plan}
          </p>
          <p className="mt-1 text-[13px] text-slate-600">
            Eligible {patient.eligibilityStart} – {patient.eligibilityEnd} · {patient.language} · PCP {patient.pcp}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
            <span className={patient.contact.verified ? "text-emerald-800" : "text-orange-800"}>
              {patient.contact.verified ? "Verified contact" : "Contact not verified"}: {patient.contact.value}
            </span>
            <span className="text-slate-500">
              {patient.contact.channel} · {patient.contact.bestTime}
            </span>
          </div>
          <ProvenanceRow provenance={patient.contact.provenance} title="Contact" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-[12px] text-slate-500">
            <span className="sr-only">Switch member</span>
            <select
              aria-label="Switch member"
              value={patient.id}
              onChange={(event) => navigate(`/member/${event.target.value}`)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px]"
            >
              {patients.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.id}
                </option>
              ))}
            </select>
          </label>
          <Button asChild size="sm">
            <Link to={`/outreach/${patient.id}`}>Prepare outreach</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Add task
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen} title="Add task" description="The task stays open until completion evidence is recorded.">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim()) return;
            const task: TaskItem = {
              id: `manual-${Date.now()}`,
              title: title.trim(),
              owner: RN_NAME,
              due,
              status: "Open",
              source: "human",
            };
            addTask(patient.id, task);
            setTitle("");
            setOpen(false);
          }}
        >
          <label className="block text-[12px] font-medium text-slate-600">
            Title
            <Input className="mt-2" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>
          <label className="block text-[12px] font-medium text-slate-600">
            Due
            <Input className="mt-2" type="date" value={due} onChange={(event) => setDue(event.target.value)} required />
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Save task</Button>
          </div>
        </form>
      </Dialog>
    </header>
  );
}

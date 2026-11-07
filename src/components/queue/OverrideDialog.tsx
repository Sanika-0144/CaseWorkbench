import { useState } from "react";
import type { PriorityBand } from "@/types";
import { getPatient } from "@/data/patients";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useWorkbench } from "@/store/workbench";

const bands: PriorityBand[] = ["High", "Medium", "Routine"];

export function OverrideDialog({
  patientId,
  open,
  onOpenChange,
}: {
  patientId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const patient = patientId ? getPatient(patientId) : undefined;
  const current = useWorkbench((s) => (patientId ? s.overrides[patientId]?.band ?? patient?.priority : undefined));
  const overridePriority = useWorkbench((s) => s.overridePriority);
  const initial = current ?? patient?.priority ?? "Medium";
  const [band, setBand] = useState<PriorityBand>(initial);
  const [reason, setReason] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Override priority"
      description="This changes the review order only. The rule score stays. AI cannot set priority."
    >
      {patient ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!reason.trim()) return;
            overridePriority(patient.id, band, reason.trim());
            setReason("");
            onOpenChange(false);
          }}
        >
          <p className="text-[14px] font-medium">{patient.name}</p>
          <fieldset>
            <legend className="text-[12px] font-medium text-slate-600">New review band</legend>
            <div className="mt-2 flex gap-2">
              {bands.map((item) => (
                <label key={item} className="inline-flex items-center gap-2 text-[13px]">
                  <input
                    type="radio"
                    name="band"
                    value={item}
                    checked={band === item}
                    onChange={() => setBand(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="text-[12px] font-medium text-slate-600">Reason</span>
            <Textarea
              className="mt-2"
              required
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Why are you changing the review order?"
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!reason.trim()}>
              Save override
            </Button>
          </div>
        </form>
      ) : null}
    </Dialog>
  );
}

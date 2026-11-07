import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientHeader } from "@/components/member360/PatientHeader";
import { OverviewTab } from "@/components/member360/OverviewTab";
import {
  AppointmentsTab,
  CarePlanTab,
  ClaimsTab,
  ClinicalTab,
  HospitalTab,
  MedicationsTab,
  OutreachHistoryTab,
  SocialTab,
} from "@/components/member360/RecordTabs";
import { usePatientBundle } from "@/store/workbench";

const tabs = [
  ["overview", "Overview"],
  ["clinical", "Clinical History"],
  ["medications", "Medications"],
  ["hospital", "Hospital Timeline"],
  ["social", "Social Profile"],
  ["outreach", "Outreach History"],
  ["care", "Care Plan"],
  ["appointments", "Appointments/Referrals"],
  ["claims", "Claims"],
] as const;

export function MemberPage() {
  const { id } = useParams();
  const { patient, priority, tasks, outreach } = usePatientBundle(id);
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "overview";

  useEffect(() => {
    document.title = patient ? `${patient.name} · Member 360` : "Member 360";
  }, [patient]);

  if (!patient || !priority) {
    return (
      <div className="glass px-6 py-16 text-center">
        <h1 className="text-[20px] font-semibold">Member not found</h1>
        <p className="mt-2 text-[14px] text-slate-600">That ID is not in the synthetic panel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PatientHeader patient={patient} priority={priority} />
      <Tabs
        value={tabs.some(([value]) => value === tab) ? tab : "overview"}
        onValueChange={(value) => setParams(value === "overview" ? {} : { tab: value }, { replace: true })}
      >
        <TabsList aria-label="Member sections">
          {tabs.map(([value, label]) => (
            <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview" className="mt-4">
          <OverviewTab patient={patient} tasks={tasks} attempts={outreach} onViewProfile={() => setParams({ tab: "social" })} />
        </TabsContent>
        <TabsContent value="clinical" className="mt-4"><ClinicalTab patient={patient} /></TabsContent>
        <TabsContent value="medications" className="mt-4"><MedicationsTab patient={patient} /></TabsContent>
        <TabsContent value="hospital" className="mt-4"><HospitalTab patient={patient} /></TabsContent>
        <TabsContent value="social" className="mt-4"><SocialTab patient={patient} /></TabsContent>
        <TabsContent value="outreach" className="mt-4"><OutreachHistoryTab attempts={outreach} /></TabsContent>
        <TabsContent value="care" className="mt-4"><CarePlanTab patient={patient} tasks={tasks} /></TabsContent>
        <TabsContent value="appointments" className="mt-4"><AppointmentsTab patient={patient} /></TabsContent>
        <TabsContent value="claims" className="mt-4"><ClaimsTab patient={patient} /></TabsContent>
      </Tabs>
    </div>
  );
}

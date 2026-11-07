import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { QueuePage } from "@/pages/QueuePage";
import { MemberPage } from "@/pages/MemberPage";
import { OutreachPage } from "@/pages/OutreachPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<QueuePage />} />
          <Route path="/member/:id" element={<MemberPage />} />
          <Route path="/outreach/:id" element={<OutreachPage />} />
          <Route path="*" element={<QueuePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

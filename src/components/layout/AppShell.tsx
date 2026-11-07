import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EvidenceDrawer } from "@/components/shared/EvidenceDrawer";
import { Toaster } from "@/components/shared/Toaster";
import { P0Banner } from "@/components/shared/LlmBanner";
import { useWorkbench } from "@/store/workbench";

export function AppShell() {
  const location = useLocation();
  const showP0 = useWorkbench((s) => s.showP0);

  return (
    <div className="app-bg flex h-screen overflow-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <Breadcrumbs />
        {showP0 ? <P0Banner /> : null}
        <main id="main" className="flex-1 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="mx-auto w-full max-w-[1400px] p-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <EvidenceDrawer />
      <Toaster />
    </div>
  );
}

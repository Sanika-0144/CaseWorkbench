import { NavLink, useLocation } from "react-router-dom";
import { LayoutList, PanelLeft, Phone, Stethoscope, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkbench } from "@/store/workbench";
import { IconButton } from "@/components/ui/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const links = [
  { label: "Priority Queue", icon: LayoutList, to: "/", end: true },
  { label: "Member 360", icon: UserRound, to: "/member/SYN-1001", end: false, match: "/member" },
  { label: "Outreach & Documentation", icon: Phone, to: "/outreach/SYN-1001", end: false, match: "/outreach" },
];

export function Sidebar() {
  const collapsed = useWorkbench((s) => s.sidebarCollapsed);
  const toggle = useWorkbench((s) => s.toggleSidebar);
  const { pathname } = useLocation();
  const memberMatch = pathname.match(/\/(?:member|outreach)\/([^/]+)/);
  const currentId = memberMatch?.[1] ?? "SYN-1001";

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-md transition-[width] duration-200",
        collapsed ? "w-[72px]" : "w-60",
      )}
    >
      <div className={cn("flex items-center gap-2 px-4 py-4", collapsed && "flex-col px-2")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 text-white">
          <Stethoscope className="h-4 w-4" aria-hidden />
        </div>
        {collapsed ? null : (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold tracking-tight">CaseWorkbench</p>
          </div>
        )}
        <IconButton label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={toggle}>
          <PanelLeft className="h-4 w-4" />
        </IconButton>
      </div>
      <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 px-2">
        {links.map((link) => {
          const to = link.match ? `${link.match}/${currentId}` : link.to;
          const Icon = link.icon;
          const item = (
            <NavLink
              key={link.label}
              to={to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex h-10 items-center gap-2 rounded-xl px-3 text-[13px] font-medium text-slate-600 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  collapsed && "justify-center px-0",
                  isActive ? "bg-indigo-50 text-indigo-900" : "hover:bg-slate-100",
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {collapsed ? <span className="sr-only">{link.label}</span> : <span className="truncate">{link.label}</span>}
            </NavLink>
          );
          if (!collapsed) return item;
          return (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>{item}</TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
      <div className={cn("border-t border-slate-200 p-3", collapsed && "px-2")}>
        <div className={cn("rounded-2xl bg-slate-50 p-3", collapsed && "p-2")}>
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[12px] font-semibold text-indigo-800">
              MA
            </div>
            {collapsed ? null : (
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold">Maria Alvarez, RN</p>
                <p className="text-[12px] text-slate-500">48 active cases</p>
              </div>
            )}
          </div>
          {collapsed ? null : (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[12px] text-slate-500">
                <span>Today</span>
                <span className="tabular-nums">5/8</span>
              </div>
              <div className="mt-2 flex gap-1" role="meter" aria-valuenow={5} aria-valuemin={0} aria-valuemax={8} aria-label="5 of 8 review slots">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className={cn("h-1.5 flex-1 rounded-full", index < 5 ? "bg-gradient-to-r from-indigo-600 to-teal-500" : "bg-slate-200")}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

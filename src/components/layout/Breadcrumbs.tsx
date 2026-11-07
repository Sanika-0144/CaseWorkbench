import { Link, useLocation } from "react-router-dom";
import { getPatient } from "@/data/patients";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const member = pathname.match(/^\/member\/([^/]+)/);
  const outreach = pathname.match(/^\/outreach\/([^/]+)/);
  const id = member?.[1] ?? outreach?.[1];
  if (!id) return null;
  const patient = getPatient(id);
  const name = patient?.name ?? id;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-200/70 bg-white/50 px-6 py-2 text-[13px] text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            Queue
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          {outreach ? (
            <Link to={`/member/${id}`} className="hover:text-slate-900">
              {name}
            </Link>
          ) : (
            <span className="font-medium text-slate-900">{name}</span>
          )}
        </li>
        {outreach ? (
          <>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-900">Outreach</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}

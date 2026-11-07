import { useWorkbench } from "@/store/workbench";

export function Toaster() {
  const toasts = useWorkbench((s) => s.toasts);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(360px,calc(100%-32px))] flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} role="status" className="glass pointer-events-auto bg-white px-4 py-3">
          <p className="text-[14px] font-semibold">{toast.title}</p>
          {toast.body ? <p className="mt-1 text-[13px] leading-5 text-slate-600">{toast.body}</p> : null}
        </div>
      ))}
    </div>
  );
}

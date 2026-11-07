export function LlmBanner() {
  return (
    <div
      role="status"
      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-5 text-amber-950"
    >
      Template-based reason shown; AI explanation unavailable
    </div>
  );
}

export function P0Banner() {
  return (
    <div
      role="alert"
      className="border-b border-rose-200 bg-rose-600 px-6 py-3 text-[14px] font-medium text-white"
    >
      P0 safety trigger – follow plan's urgent protocol; bypasses routine score.
    </div>
  );
}

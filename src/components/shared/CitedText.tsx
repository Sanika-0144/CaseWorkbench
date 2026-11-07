import type { Citation, SummarySentence } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useWorkbench } from "@/store/workbench";

function Cite({ citation }: { citation: Citation }) {
  const openEvidence = useWorkbench((s) => s.openEvidence);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="ml-0.5 align-super text-[11px] font-semibold text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          aria-label={`Evidence ${citation.n}: ${citation.label}`}
        >
          {citation.n}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <p className="text-[12px] font-semibold text-slate-500">Evidence {citation.n}</p>
        <p className="mt-2 font-medium text-slate-900">{citation.label}</p>
        <dl className="mt-2 space-y-1 text-[13px]">
          <div className="flex justify-between gap-4"><dt>Source</dt><dd>{citation.provenance.source}</dd></div>
          <div className="flex justify-between gap-4"><dt>Record</dt><dd className="tabular-nums">{citation.provenance.recordId}</dd></div>
          <div className="flex justify-between gap-4"><dt>Date</dt><dd>{citation.provenance.effectiveDate}</dd></div>
        </dl>
        <button
          type="button"
          className="mt-3 text-[13px] font-medium text-indigo-700"
          onClick={() => openEvidence(citation.provenance, citation.label)}
        >
          View raw values
        </button>
      </PopoverContent>
    </Popover>
  );
}

export function CitedText({ sentences, citations }: { sentences: SummarySentence[]; citations: Citation[] }) {
  return (
    <p className="text-[14px] leading-6 text-slate-800">
      {sentences.map((sentence, index) => {
        const citation = sentence.cite ? citations.find((item) => item.n === sentence.cite) : undefined;
        return (
          <span key={index}>
            {sentence.text}
            {citation ? <Cite citation={citation} /> : null}{" "}
          </span>
        );
      })}
    </p>
  );
}

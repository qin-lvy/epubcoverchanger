"use client";

import Link from "next/link";

interface UsageLimitModalProps {
  type: "anonymous" | "logged-in";
  onClose: () => void;
}

export default function UsageLimitModal({
  type,
  onClose,
}: UsageLimitModalProps) {
  const isAnonymous = type === "anonymous";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="usage-limit-title"
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="usage-limit-title"
          className="mb-4 text-lg font-bold text-gray-800"
        >
          Workflow feature coming soon
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-500">
          {isAnonymous
            ? "Single EPUB cover changes are currently free. Future account features will focus on heavier workflows."
            : "Future Pro features will focus on batch processing, saved presets, and higher workflow limits."}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <Link
            href={isAnonymous ? "/login" : "/pricing"}
            className="flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            {isAnonymous ? "Learn more" : "View pricing"}
          </Link>
        </div>
      </div>
    </div>
  );
}

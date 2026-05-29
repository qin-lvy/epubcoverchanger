"use client";

import { Check, Lock } from "lucide-react";
import { FREE_SIZES, PREMIUM_SIZES, type CoverSize } from "@/lib/cover-sizes";

interface CoverSizeSelectorProps {
  selected: CoverSize;
  onChange: (size: CoverSize) => void;
}

function SizeCard({
  size,
  isSelected,
  onClick,
  locked,
}: {
  size: CoverSize;
  isSelected: boolean;
  onClick: () => void;
  locked?: boolean;
}) {
  return (
    <button
      key={size.id}
      type="button"
      onClick={locked ? undefined : onClick}
      className={`relative rounded-xl border-2 px-3 py-3 text-left transition-all duration-150 ${
        locked
          ? "cursor-default border-gray-100 bg-gray-50 opacity-60"
          : isSelected
            ? "cursor-pointer border-[#2563EB] bg-[#EFF6FF] shadow-[0_0_0_1px_#2563EB]"
            : "cursor-pointer border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {isSelected && !locked && (
        <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563EB]">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      {locked && (
        <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-300">
          <Lock className="h-3 w-3 text-white" />
        </span>
      )}
      <p
        className={`pr-5 text-sm font-semibold ${
          isSelected && !locked ? "text-[#2563EB]" : "text-gray-800"
        }`}
      >
        {size.label}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        {size.width > 0
          ? `${size.width} x ${size.height} (${size.ratio})`
          : "No resize"}
      </p>
      <p className="mt-2 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {size.sourceLabel}
      </p>
      <p className="mt-2 text-[11px] leading-snug text-gray-500">
        {size.note}
      </p>
    </button>
  );
}

export default function CoverSizeSelector({
  selected,
  onChange,
}: CoverSizeSelectorProps) {
  return (
    <div className="mx-auto mt-6 max-w-[860px]">
      <h3 className="mb-3 text-center text-sm font-semibold text-gray-700">
        Select a platform-ready cover preset
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {FREE_SIZES.map((size) => (
          <SizeCard
            key={size.id}
            size={size}
            isSelected={selected.id === size.id}
            onClick={() => onChange(size)}
          />
        ))}
      </div>

      {PREMIUM_SIZES.length > 0 && (
        <>
          <p className="mt-4 mb-2 text-center text-xs font-medium tracking-wide text-gray-400 uppercase">
            More platforms · <span className="text-[#2563EB]">Pro</span>
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
            {PREMIUM_SIZES.map((size) => (
              <SizeCard
                key={size.id}
                size={size}
                isSelected={selected.id === size.id}
                onClick={() => onChange(size)}
                locked
              />
            ))}
          </div>
        </>
      )}

      {selected.width > 0 && (
        <p className="mt-3 text-center text-sm text-gray-500">
          Output:{" "}
          <span className="font-semibold text-gray-800">
            {selected.width} x {selected.height}px
          </span>{" "}
          <span className="text-gray-400">({selected.ratio})</span>
          {" · "}
          <span className="font-medium text-gray-600">
            {selected.sourceLabel}
          </span>
        </p>
      )}
    </div>
  );
}

"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface CoverUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export default function CoverUploader({
  onFileSelect,
  isLoading = false,
}: CoverUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div
      className={`flex-1 cursor-pointer rounded-xl border-2 border-dashed px-8 py-12 text-center transition-[border-color,background,border-style] duration-200 ${
        isDragOver
          ? "border-solid border-primary bg-primary-light"
          : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-[#F0F5FF]"
      }`}
      role="button"
      tabIndex={0}
      aria-label="Upload new cover image"
      onClick={() => !isLoading && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isLoading) inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-[24px] bg-primary px-9 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLoading) inputRef.current?.click();
        }}
      >
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        {isLoading ? "Processing..." : "Upload New Cover"}
      </button>
      <p className="mt-3 text-sm text-gray-400">or drop an image</p>
      <p className="mt-1 text-xs text-gray-400">.jpg .png .webp</p>
    </div>
  );
}

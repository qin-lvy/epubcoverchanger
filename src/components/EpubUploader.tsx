"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n";

interface EpubUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export default function EpubUploader({
  onFileSelect,
  isLoading = false,
}: EpubUploaderProps) {
  const { t } = useLocale();
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
    <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] max-lg:max-w-full max-lg:p-6">
      <div
        role="button"
        tabIndex={0}
        aria-label={t("uploader.epub")}
        className={`flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-8 py-12 text-center transition-[border-color,background,border-style] duration-200 ${
          isDragOver
            ? "border-solid border-primary bg-primary-light"
            : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-[#F0F5FF]"
        }`}
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
          accept=".epub"
          multiple={false}
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
          {isLoading ? t("uploader.processing") : t("uploader.epub")}
        </button>
        <p className="mt-3 text-sm text-gray-400">{t("uploader.dropFile")}</p>
        <p className="mt-2 text-xs text-gray-400">
          {t("uploader.epubHelp")}
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-gray-400">
        {t("uploader.agreement")} {" "}
        <Link
          href="/terms"
          className="text-gray-400 underline hover:text-gray-500"
        >
          {t("uploader.terms")}
        </Link>
        . {t("uploader.privacyLead")} {" "}
        <Link
          href="/privacy"
          className="text-gray-400 underline hover:text-gray-500"
        >
          {t("uploader.privacy")}
        </Link>
        .
      </p>
    </div>
  );
}

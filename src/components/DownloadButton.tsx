"use client";

import { Download, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import type JSZip from "jszip";
import { replaceCoverAndDownload } from "@/lib/epub";

interface DownloadButtonProps {
  zip: JSZip;
  coverPath: string;
  newCoverFile: File;
  originalFileName: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export default function DownloadButton({
  zip,
  coverPath,
  newCoverFile,
  originalFileName,
  onSuccess,
  onError,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    const result = await replaceCoverAndDownload(
      zip,
      coverPath,
      newCoverFile,
      originalFileName,
    );
    setIsDownloading(false);

    if (result.success) {
      onSuccess?.();
    } else {
      onError?.(result.error ?? "Download failed. Please try again.");
    }
  }, [coverPath, newCoverFile, onError, onSuccess, originalFileName, zip]);

  return (
    <>
      <button
        type="button"
        disabled={isDownloading}
        onClick={handleDownload}
        className="mx-auto mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-10 py-3.5 text-base font-semibold text-white transition-[background,transform] duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
      >
        {isDownloading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Download className="h-5 w-5" />
        )}
        Download Updated EPUB
      </button>

      <p className="mt-3 text-center text-sm text-gray-400">
        Free for single EPUB cover changes. Pro workflow features are coming later.
      </p>
    </>
  );
}
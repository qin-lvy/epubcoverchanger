"use client";

import {
  CheckCircle2,
  Download,
  ExternalLink,
  Loader2,
  Share2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type JSZip from "jszip";
import {
  generateUpdatedEpub,
  saveGeneratedEpub,
} from "@/lib/epub";
import { captureToolEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/i18n";
import {
  TOOL_FAILURE_EVENT,
  TOOL_FUNNEL_EVENTS,
  TOOL_SAVE_EVENT,
} from "@/lib/tool-analytics";

interface DownloadButtonProps {
  zip: JSZip;
  coverPath: string | null;
  newCoverFile: File;
  originalFileName: string;
  workflowId?: string;
  onError?: (message: string) => void;
}

// English copy is retained here as the contract for the localized labels:
// "Save or Open EPUB" and "On iPhone, choose Save to Files or open it in Apple Books from the system panel."

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function canShareFile(file: File) {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.share !== "function" ||
    typeof navigator.canShare !== "function"
  ) {
    return false;
  }

  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

export default function DownloadButton({
  zip,
  coverPath,
  newCoverFile,
  originalFileName,
  workflowId,
  onError,
}: DownloadButtonProps) {
  const { t } = useLocale();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFile, setGeneratedFile] = useState<File | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!generatedUrl) return;
    return () => URL.revokeObjectURL(generatedUrl);
  }, [generatedUrl]);

  const captureSaveClick = useCallback(() => {
    if (workflowId) {
      captureToolEvent(TOOL_SAVE_EVENT, { workflow_id: workflowId });
    }
  }, [workflowId]);

  const handleGenerate = useCallback(async () => {
    if (workflowId) {
      captureToolEvent(TOOL_FUNNEL_EVENTS[4], { workflow_id: workflowId });
    }

    setIsGenerating(true);
    setSaveMessage(null);
    const result = await generateUpdatedEpub(
      zip,
      coverPath,
      newCoverFile,
      originalFileName,
    );
    setIsGenerating(false);

    if (!result.success || !result.file) {
      if (workflowId) {
        captureToolEvent(TOOL_FAILURE_EVENT, {
          workflow_id: workflowId,
          stage: "download",
          reason: "generation_error",
        });
      }
      onError?.(result.error ?? t("error.epubGeneration"));
      return;
    }

    setGeneratedFile(result.file);
    setGeneratedUrl(URL.createObjectURL(result.file));
    if (workflowId) {
      captureToolEvent(TOOL_FUNNEL_EVENTS[5], { workflow_id: workflowId });
    }

    if (isIosDevice()) {
      setSaveMessage(t("download.ready"));
      return;
    }

    try {
      await saveGeneratedEpub(result.file);
      setSaveMessage(t("download.started", result.file.name));
    } catch {
      setSaveMessage(t("download.options"));
    }
  }, [
    coverPath,
    newCoverFile,
    onError,
    originalFileName,
    t,
    workflowId,
    zip,
  ]);

  const handleShare = useCallback(async () => {
    if (!generatedFile || !canShareFile(generatedFile)) return;

    captureSaveClick();
    try {
      await navigator.share({
        files: [generatedFile],
        title: generatedFile.name,
      });
      setSaveMessage(
        t("download.shareClosed"),
      );
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setSaveMessage(
        t("download.shareUnavailable"),
      );
    }
  }, [captureSaveClick, generatedFile, t]);

  const handleDirectSave = useCallback(() => {
    captureSaveClick();
    setSaveMessage(
      t("download.saveRequested"),
    );
  }, [captureSaveClick, t]);

  if (generatedFile && generatedUrl) {
    const shareSupported = canShareFile(generatedFile);
    const showLinkFallbacks = !isIosDevice() || !shareSupported;

    return (
      <div
        role="status"
        className="mx-auto mt-6 max-w-[560px] rounded-xl border border-green-200 bg-green-50 p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2 font-semibold text-green-800">
          <CheckCircle2 className="h-5 w-5" />
          {t("download.generated")}
        </div>
        <p className="mt-1 break-all text-sm text-green-700">
          {generatedFile.name}
        </p>
        {saveMessage && (
          <p className="mt-2 text-sm text-gray-700">{saveMessage}</p>
        )}

        <div className="mt-4 flex flex-col items-stretch justify-center gap-2 sm:flex-row">
          {shareSupported && (
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              <Share2 className="h-4 w-4" />
              {t("download.saveOpen")}
            </button>
          )}
          {showLinkFallbacks && (
            <>
              <a
                href={generatedUrl}
                download={generatedFile.name}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectSave}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4" />
                {t("download.direct")}
              </a>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectSave}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:text-primary-hover"
              >
                <ExternalLink className="h-4 w-4" />
                {t("download.open")}
              </a>
            </>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-600">
          {t("download.iphone")}
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={isGenerating}
        onClick={handleGenerate}
        className="mx-auto mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-10 py-3.5 text-base font-semibold text-white transition-[background,transform] duration-150 hover:bg-primary-hover active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
      >
        {isGenerating ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Download className="h-5 w-5" />
        )}
        {isGenerating ? t("download.generating") : t("download.button")}
      </button>

      <p className="mt-3 text-center text-sm text-gray-400">
        {t("download.freeNote")}
      </p>
    </>
  );
}

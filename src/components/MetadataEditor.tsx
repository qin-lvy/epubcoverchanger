"use client";

import type JSZip from "jszip";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Plus,
  RefreshCw,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { captureToolEvent } from "@/lib/analytics";
import { formatFileSize, isValidEpub, saveGeneratedEpub } from "@/lib/epub";
import {
  changedFields,
  isValidLanguageTag,
  loadEpubMetadata,
  saveEpubMetadata,
  type EpubMetadata,
} from "@/lib/epub-metadata";
import { createWorkflowId, METADATA_EVENTS, TOOL_FAILURE_EVENT } from "@/lib/tool-analytics";
import EpubUploader from "./EpubUploader";
import Toast from "./Toast";

const MAX_EPUB_FILE_SIZE = 100 * 1024 * 1024;

const COMMON_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "pt-BR", label: "Portuguese (Brazil)" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
];

const FIELD_LABELS: Record<keyof EpubMetadata, string> = {
  title: "title",
  authors: "author",
  language: "language",
  publisher: "publisher",
  description: "description",
};

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function canShareFile(file: File) {
  try {
    return typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

interface LoadedBook {
  zip: JSZip;
  fileName: string;
  fileSize: number;
  original: EpubMetadata;
  hadLanguage: boolean;
}

export default function MetadataEditor() {
  const formId = useId();
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [book, setBook] = useState<LoadedBook | null>(null);
  const [form, setForm] = useState<EpubMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [savedFile, setSavedFile] = useState<File | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const closeToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!savedUrl) return;
    return () => URL.revokeObjectURL(savedUrl);
  }, [savedUrl]);

  const fail = useCallback(
    (id: string, stage: "epub_validation" | "epub_parse" | "download", reason: "invalid_file_type" | "file_too_large" | "drm_protected" | "parse_error" | "generation_error", message: string) => {
      captureToolEvent(TOOL_FAILURE_EVENT, { workflow_id: id, tool: "metadata", stage, reason });
      setToast(message);
    },
    [],
  );

  const reset = useCallback(() => {
    setBook(null);
    setForm(null);
    setSavedFile(null);
    setSavedUrl(null);
    setSaveMessage(null);
    setWorkflowId(null);
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
      const id = createWorkflowId();
      setWorkflowId(id);
      captureToolEvent(METADATA_EVENTS[0], { workflow_id: id });

      if (!isValidEpub(file)) {
        fail(id, "epub_validation", "invalid_file_type", "Please choose a .epub file.");
        return;
      }
      if (file.size > MAX_EPUB_FILE_SIZE) {
        fail(id, "epub_validation", "file_too_large", "This EPUB is too large. Please use a file under 100 MB.");
        return;
      }

      setIsLoading(true);
      try {
        const loaded = await loadEpubMetadata(file);
        if (loaded.isDrmProtected) {
          fail(id, "epub_parse", "drm_protected", "This EPUB is DRM-protected and cannot be edited. DRM-free files work.");
          return;
        }
        captureToolEvent(METADATA_EVENTS[1], { workflow_id: id, had_language: loaded.hasLanguage });
        const original = {
          ...loaded.metadata,
          authors: loaded.metadata.authors.length ? loaded.metadata.authors : [""],
        };
        setBook({
          zip: loaded.zip,
          fileName: file.name,
          fileSize: file.size,
          original: loaded.metadata,
          hadLanguage: loaded.hasLanguage,
        });
        setForm(original);
        setSavedFile(null);
        setSavedUrl(null);
        setSaveMessage(null);
      } catch {
        fail(id, "epub_parse", "parse_error", "This file appears to be damaged. Please try another EPUB.");
      } finally {
        setIsLoading(false);
      }
    },
    [fail],
  );

  if (!book || !form) {
    return (
      <>
        <div className="flex justify-center">
          <EpubUploader onFileSelect={handleFile} isLoading={isLoading} />
        </div>
        {toast && <Toast message={toast} onClose={closeToast} />}
      </>
    );
  }

  const update = <K extends keyof EpubMetadata>(key: K, value: EpubMetadata[K]) => {
    setForm({ ...form, [key]: value });
    setSavedFile(null);
    setSaveMessage(null);
  };
  const changes = changedFields(book.original, form);
  const languageValue = form.language.trim();
  const titleError = form.title.trim() ? null : "The title can't be empty.";
  const languageError = !languageValue
    ? book.hadLanguage
      ? "Keep a language code; EPUB files need one."
      : null
    : isValidLanguageTag(languageValue)
      ? null
      : "Use a language code such as en, es or pt-BR.";
  const canSave = changes.length > 0 && !titleError && !languageError && !isSaving;

  const handleSave = async () => {
    if (!canSave) return;
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const file = await saveEpubMetadata(book.zip, form, book.fileName);
      setSavedFile(file);
      setSavedUrl(URL.createObjectURL(file));
      setBook({
        ...book,
        original: { ...form, authors: form.authors.map((author) => author.trim()).filter(Boolean) },
        hadLanguage: book.hadLanguage || languageValue !== "",
      });
      if (workflowId) {
        captureToolEvent(METADATA_EVENTS[2], { workflow_id: workflowId, changed_fields: changes.join(",") });
      }
      if (isIosDevice() && canShareFile(file)) {
        setSaveMessage("Your EPUB is ready. Tap Save or Open EPUB below.");
        return;
      }
      await saveGeneratedEpub(file);
      setSaveMessage(`Download started: ${file.name}`);
    } catch {
      if (workflowId) fail(workflowId, "download", "generation_error", "Saving failed. Please try again.");
      else setToast("Saving failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!savedFile) return;
    try {
      await navigator.share({ files: [savedFile], title: savedFile.name });
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setSaveMessage("The share panel isn't available. Use Direct download instead.");
      }
    }
  };

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-[15px] text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary-light focus:outline-none";
  const label = "mb-1.5 block text-sm font-semibold text-gray-800";

  return (
    <div className="mx-auto w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:p-8">
      <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-700">
          <FileText className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
          <span className="truncate font-medium">{book.fileName}</span>
          <span className="shrink-0 text-gray-400">{formatFileSize(book.fileSize)}</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Change EPUB
        </button>
      </div>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <div>
          <label htmlFor={`${formId}-title`} className={label}>
            Title
          </label>
          <input
            id={`${formId}-title`}
            className={input}
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            aria-invalid={Boolean(titleError)}
          />
          {titleError && <p className="mt-1 text-sm text-red-600">{titleError}</p>}
        </div>

        <fieldset>
          <legend className={label}>Author</legend>
          <div className="space-y-2">
            {form.authors.map((author, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className={input}
                  value={author}
                  aria-label={`Author ${index + 1}`}
                  onChange={(event) =>
                    update(
                      "authors",
                      form.authors.map((value, i) => (i === index ? event.target.value : value)),
                    )
                  }
                />
                {form.authors.length > 1 && (
                  <button
                    type="button"
                    aria-label={`Remove author ${index + 1}`}
                    onClick={() => update("authors", form.authors.filter((_, i) => i !== index))}
                    className="shrink-0 rounded-lg border border-gray-300 px-3 text-gray-500 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => update("authors", [...form.authors, ""])}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add another author
          </button>
        </fieldset>

        <div>
          <label htmlFor={`${formId}-language`} className={label}>
            Language
          </label>
          {!book.hadLanguage && (
            <div className="mb-2 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>
                This book has no language set. Send to Kindle can reject files
                without one (error E999). Pick the language the book is written
                in.
              </p>
            </div>
          )}
          <input
            id={`${formId}-language`}
            className={input}
            value={form.language}
            placeholder="e.g. en"
            onChange={(event) => update("language", event.target.value)}
            aria-invalid={Boolean(languageError)}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {COMMON_LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => update("language", language.code)}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  languageValue === language.code
                    ? "border-primary bg-primary-light text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {language.label} · {language.code}
              </button>
            ))}
          </div>
          {languageError && <p className="mt-1 text-sm text-red-600">{languageError}</p>}
        </div>

        <div>
          <label htmlFor={`${formId}-publisher`} className={label}>
            Publisher <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <input
            id={`${formId}-publisher`}
            className={input}
            value={form.publisher}
            onChange={(event) => update("publisher", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor={`${formId}-description`} className={label}>
            Description <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id={`${formId}-description`}
            className={`${input} min-h-[96px]`}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          {isSaving ? "Saving..." : "Save updated EPUB"}
        </button>
        <p className="text-center text-sm text-gray-500">
          {changes.length
            ? `Changing: ${changes.map((key) => FIELD_LABELS[key]).join(", ")}`
            : "Edit a field to enable saving. Only the fields you change are rewritten."}
        </p>
      </form>

      {savedFile && savedUrl && (
        <div role="status" className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
          <div className="flex items-center justify-center gap-2 font-semibold text-green-800">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            EPUB updated
          </div>
          {saveMessage && <p className="mt-1 text-sm text-gray-700">{saveMessage}</p>}
          <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
            {canShareFile(savedFile) && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                Save or Open EPUB
              </button>
            )}
            <a
              href={savedUrl}
              download={savedFile.name}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Direct download
            </a>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={closeToast} />}
    </div>
  );
}

"use client";

import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  FileText,
  RefreshCw,
  Shield,
  Smartphone,
} from "lucide-react";
import type JSZip from "jszip";
import { useCallback, useMemo, useState } from "react";
import {
  checkDRM,
  extractCover,
  formatFileSize,
  isCoverTooLarge,
  isValidCoverImage,
  isValidEpub,
} from "@/lib/epub";
import {
  formatDimensions,
  getBlobDimensions,
  getImageDimensions,
  FREE_SIZES,
  type CoverSize,
  type CoverTransform,
  type ImageDimensions,
} from "@/lib/cover-sizes";
import BeforeAfterSlider from "./BeforeAfterSlider";
import CoverCropEditor from "./CoverCropEditor";
import CoverSizeSelector from "./CoverSizeSelector";
import CoverUploader from "./CoverUploader";
import DownloadButton from "./DownloadButton";
import EpubUploader from "./EpubUploader";
import Toast from "./Toast";

type ToolState = "initial" | "cover-select" | "preview";

const MAX_EPUB_FILE_SIZE = 100 * 1024 * 1024;

const PLACEHOLDER_BEFORE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="360" viewBox="0 0 240 360">
      <rect width="240" height="360" fill="#E5E7EB"/>
      <text x="120" y="180" text-anchor="middle" fill="#9CA3AF" font-family="sans-serif" font-size="14">No cover found</text>
    </svg>`,
  );

function revokeObjectUrl(url: string | null, preservedUrl?: string | null) {
  if (url && url !== preservedUrl && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

function HeroLeft() {
  return (
    <div className="flex-1 max-lg:mt-6">
      <h1 className="mb-4 text-[32px] leading-[1.1] font-extrabold text-[#111827] lg:text-[48px]">
        Change your EPUB cover in seconds
      </h1>
      <p className="mb-8 text-base text-[#374151] lg:text-xl">
        100% Automatically and{" "}
        <span className="ml-1.5 inline-block rounded-md bg-primary px-3 py-0.5 text-base font-bold text-white">
          Free
        </span>
      </p>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
            <Shield className="h-5 w-5 text-success" />
          </span>
          <span className="ml-3 text-[15px] font-medium text-[#1F2937]">
            Files never leave your browser
          </span>
        </li>
        <li className="flex items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </span>
          <span className="ml-3 text-[15px] font-medium text-[#1F2937]">
            Before / After preview slider
          </span>
        </li>
        <li className="flex items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100">
            <Smartphone className="h-5 w-5 text-accent" />
          </span>
          <span className="ml-3 text-[15px] font-medium text-[#1F2937]">
            Works on desktop and mobile
          </span>
        </li>
      </ul>
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
          Platform-ready cover presets
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Amazon Kindle", color: "#FF9900", icon: "K" },
            { name: "Apple Books", color: "#007AFF", icon: "A" },
            { name: "Kobo", color: "#BF0000", icon: "K" },
            { name: "Google Play", color: "#34A853", icon: "G" },
            { name: "Standard EPUB", color: "#6B7280", icon: "E" },
          ].map((platform) => (
            <span
              key={platform.name}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                style={{ backgroundColor: platform.color }}
              >
                {platform.icon}
              </span>
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CoverReplacer() {
  const [state, setState] = useState<ToolState>("initial");
  const [isProcessingEpub, setIsProcessingEpub] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [epubZip, setEpubZip] = useState<JSZip | null>(null);
  const [epubFileName, setEpubFileName] = useState("");
  const [epubFileSize, setEpubFileSize] = useState(0);
  const [coverPath, setCoverPath] = useState<string | null>(null);
  const [beforeImageUrl, setBeforeImageUrl] = useState<string | null>(null);
  const [beforeImageDimensions, setBeforeImageDimensions] =
    useState<ImageDimensions | null>(null);
  const [afterImageUrl, setAfterImageUrl] = useState<string | null>(null);
  const [uploadedCoverFile, setUploadedCoverFile] = useState<File | null>(null);
  const [uploadedCoverPreviewUrl, setUploadedCoverPreviewUrl] = useState<
    string | null
  >(null);
  const [uploadedCoverDimensions, setUploadedCoverDimensions] =
    useState<ImageDimensions | null>(null);
  const [exportedCoverFile, setExportedCoverFile] = useState<File | null>(null);
  const [exportedCoverDimensions, setExportedCoverDimensions] =
    useState<ImageDimensions | null>(null);
  const [coverTransform, setCoverTransform] = useState<CoverTransform | null>(
    null,
  );
  const [selectedSize, setSelectedSize] = useState<CoverSize>(FREE_SIZES[0]);
  const [showCropEditor, setShowCropEditor] = useState(false);
  const [pendingCoverFile, setPendingCoverFile] = useState<File | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const resetAll = useCallback(() => {
    revokeObjectUrl(beforeImageUrl);
    revokeObjectUrl(afterImageUrl, uploadedCoverPreviewUrl);
    revokeObjectUrl(uploadedCoverPreviewUrl);
    setState("initial");
    setEpubZip(null);
    setEpubFileName("");
    setEpubFileSize(0);
    setCoverPath(null);
    setBeforeImageUrl(null);
    setBeforeImageDimensions(null);
    setAfterImageUrl(null);
    setUploadedCoverFile(null);
    setUploadedCoverPreviewUrl(null);
    setUploadedCoverDimensions(null);
    setExportedCoverFile(null);
    setExportedCoverDimensions(null);
    setCoverTransform(null);
    setSelectedSize(FREE_SIZES[0]);
    setShowCropEditor(false);
    setPendingCoverFile(null);
  }, [afterImageUrl, beforeImageUrl, uploadedCoverPreviewUrl]);

  const handleChangeEpub = useCallback(() => {
    if (beforeImageUrl && beforeImageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(beforeImageUrl);
    }
    setEpubZip(null);
    setEpubFileName("");
    setEpubFileSize(0);
    setCoverPath(null);
    setBeforeImageUrl(null);
    setBeforeImageDimensions(null);
    setState("initial");
  }, [beforeImageUrl]);

  const handleEpubSelect = useCallback(
    async (file: File) => {
      if (!isValidEpub(file)) {
        showToast("Please upload a valid .epub file");
        return;
      }
      if (file.size > MAX_EPUB_FILE_SIZE) {
        showToast("This EPUB is too large. Please use a file under 100MB.");
        return;
      }

      setIsProcessingEpub(true);
      try {
        const result = await extractCover(file);

        if (checkDRM(result.zip)) {
          showToast(
            "This EPUB is DRM-protected and cannot be edited. DRM-free files work perfectly.",
          );
          setIsProcessingEpub(false);
          return;
        }

        setEpubZip(result.zip);
        setEpubFileName(result.fileName);
        setEpubFileSize(result.fileSize);
        setCoverPath(result.coverPath);

        if (beforeImageUrl && beforeImageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(beforeImageUrl);
        }

        if (result.coverBlob) {
          const url = URL.createObjectURL(result.coverBlob);
          setBeforeImageUrl(url);
          getBlobDimensions(result.coverBlob)
            .then(setBeforeImageDimensions)
            .catch(() => setBeforeImageDimensions(null));
        } else {
          setBeforeImageUrl(null);
          setBeforeImageDimensions(null);
          showToast(
            "No cover image found in this EPUB. You can still add one by uploading your cover image.",
          );
        }

        if (exportedCoverFile && afterImageUrl) {
          setState("preview");
        } else {
          setState("cover-select");
        }
      } catch {
        showToast(
          "This file appears to be corrupted. Please try another EPUB.",
        );
      } finally {
        setIsProcessingEpub(false);
      }
    },
    [afterImageUrl, beforeImageUrl, exportedCoverFile, showToast],
  );

  const handleCoverSelect = useCallback(
    async (file: File) => {
      if (!isValidCoverImage(file)) {
        showToast("Please upload an image file (JPG, PNG, or WebP)");
        return;
      }
      if (isCoverTooLarge(file)) {
        showToast("Cover image is too large. Please use an image under 10MB.");
        return;
      }

      try {
        const dimensions = await getImageDimensions(file);
        const previewUrl = URL.createObjectURL(file);
        revokeObjectUrl(afterImageUrl, uploadedCoverPreviewUrl);
        revokeObjectUrl(uploadedCoverPreviewUrl);

        setUploadedCoverFile(file);
        setUploadedCoverPreviewUrl(previewUrl);
        setUploadedCoverDimensions(dimensions);
        setCoverTransform(null);

        setAfterImageUrl(null);
        setExportedCoverFile(null);
        setExportedCoverDimensions(null);

        if (selectedSize.width === 0) {
          setAfterImageUrl(previewUrl);
          setExportedCoverFile(file);
          setExportedCoverDimensions(dimensions);
          setShowCropEditor(false);
          setPendingCoverFile(null);
          setState("preview");
          return;
        }

        setPendingCoverFile(file);
        setShowCropEditor(true);
      } catch {
        showToast("Failed to load image. Please try another file.");
      }
    },
    [afterImageUrl, showToast, selectedSize, uploadedCoverPreviewUrl],
  );

  const handleCropConfirm = useCallback(
    (
      exportedFile: File,
      transform: CoverTransform,
      outputDimensions: ImageDimensions,
    ) => {
      revokeObjectUrl(afterImageUrl, uploadedCoverPreviewUrl);
      const url = URL.createObjectURL(exportedFile);
      setAfterImageUrl(url);
      setExportedCoverFile(exportedFile);
      setExportedCoverDimensions(outputDimensions);
      setCoverTransform(transform);
      setShowCropEditor(false);
      setPendingCoverFile(null);
      setState("preview");
    },
    [afterImageUrl, uploadedCoverPreviewUrl],
  );
  const handleCropCancel = useCallback(() => {
    setShowCropEditor(false);
    setPendingCoverFile(null);
  }, []);

  const effectiveCoverPath = useMemo(() => {
    return coverPath ?? "images/cover.jpg";
  }, [coverPath]);

  const beforeForSlider = beforeImageUrl ?? PLACEHOLDER_BEFORE;
  const activeTargetDimensions =
    uploadedCoverDimensions && selectedSize.width === 0
      ? uploadedCoverDimensions
      : selectedSize.width > 0 && selectedSize.height > 0
        ? { width: selectedSize.width, height: selectedSize.height }
        : null;

  const previewAspectProps =
    activeTargetDimensions
      ? {
          aspectWidth: activeTargetDimensions.width,
          aspectHeight: activeTargetDimensions.height,
        }
      : {};

  if (state === "preview" && afterImageUrl && exportedCoverFile && epubZip) {
    return (
      <section className="bg-gray-50 px-6 py-12 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Preview your new cover
          </h2>

          <BeforeAfterSlider
            beforeImage={beforeForSlider}
            afterImage={afterImageUrl}
            showcase
            {...previewAspectProps}
          />

          <div className="mx-auto mt-4 grid max-w-[760px] gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                Original EPUB cover
              </p>
              <p className="mt-1 font-semibold text-gray-800">
                {formatDimensions(beforeImageDimensions)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                New exported cover
              </p>
              <p className="mt-1 font-semibold text-gray-800">
                {formatDimensions(exportedCoverDimensions)} ·{" "}
                {coverTransform?.mode ?? "original"}
              </p>
            </div>
          </div>

          <CoverSizeSelector
            selected={selectedSize}
            onChange={(size) => {
              setSelectedSize(size);
              if (
                uploadedCoverFile &&
                uploadedCoverDimensions &&
                uploadedCoverPreviewUrl
              ) {
                revokeObjectUrl(afterImageUrl, uploadedCoverPreviewUrl);
                if (size.width === 0) {
                  setAfterImageUrl(uploadedCoverPreviewUrl);
                  setExportedCoverFile(uploadedCoverFile);
                  setExportedCoverDimensions(uploadedCoverDimensions);
                  setCoverTransform(null);
                  return;
                }
                setAfterImageUrl(null);
                setExportedCoverFile(null);
                setExportedCoverDimensions(null);
                setPendingCoverFile(uploadedCoverFile);
                setShowCropEditor(true);
                setState("cover-select");
              }
            }}
          />

          <DownloadButton
            zip={epubZip}
            coverPath={effectiveCoverPath}
            newCoverFile={exportedCoverFile}
            originalFileName={epubFileName}
            onError={showToast}
          />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            <button
              type="button"
              onClick={handleChangeEpub}
              className="cursor-pointer text-sm text-primary hover:text-primary-hover"
            >
              Change EPUB
            </button>
            <button
              type="button"
              onClick={() => {
                revokeObjectUrl(afterImageUrl, uploadedCoverPreviewUrl);
                revokeObjectUrl(uploadedCoverPreviewUrl);
                setAfterImageUrl(null);
                setUploadedCoverFile(null);
                setUploadedCoverPreviewUrl(null);
                setUploadedCoverDimensions(null);
                setExportedCoverFile(null);
                setExportedCoverDimensions(null);
                setCoverTransform(null);
                setPendingCoverFile(null);
                setShowCropEditor(false);
                setState("cover-select");
              }}
              className="cursor-pointer text-sm text-primary hover:text-primary-hover"
            >
              Change Cover
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="cursor-pointer text-sm text-primary hover:text-primary-hover"
            >
              Start Over
            </button>
          </div>
        </div>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </section>
    );
  }

  if (state === "cover-select") {
    return (
      <section className="bg-gray-50 px-6 py-12 lg:px-6 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div
            className={`flex flex-col items-center gap-6 ${
              showCropEditor
                ? "lg:grid lg:grid-cols-[300px_1fr] lg:items-start"
                : "lg:flex-row lg:justify-center"
            }`}
          >
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div className="flex h-[240px] w-[180px] items-center justify-center overflow-hidden rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] lg:h-[360px] lg:w-[260px]">
              {beforeImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={beforeImageUrl}
                  alt="Current cover"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-400">
                  No cover found
                </div>
              )}
              </div>
              <p className="text-center text-xs text-gray-500">
                Original cover · {formatDimensions(beforeImageDimensions)}
              </p>
            </div>

            <ArrowDown className="h-6 w-6 text-gray-400 lg:hidden" />
            {!showCropEditor && (
              <ArrowRight className="mx-6 hidden h-6 w-6 shrink-0 text-gray-400 lg:block" />
            )}

            {!showCropEditor && (
              <div className="w-full max-w-[480px] rounded-2xl bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] max-lg:max-w-full max-lg:p-6">
                <div className="mb-4">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Target platform
                  </label>
                  <select
                    value={selectedSize.id}
                    onChange={(e) => {
                      const found = FREE_SIZES.find((s) => s.id === e.target.value);
                      if (found) setSelectedSize(found);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    {FREE_SIZES.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.label}{" "}
                        {size.width > 0
                          ? `(${size.width} x ${size.height})`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <CoverUploader onFileSelect={handleCoverSelect} />
              </div>
            )}

            {showCropEditor &&
              pendingCoverFile &&
              uploadedCoverPreviewUrl &&
              selectedSize.width > 0 && (
              <CoverCropEditor
                key={`${selectedSize.id}-${pendingCoverFile.name}-${pendingCoverFile.size}`}
                imageFile={pendingCoverFile}
                imagePreviewUrl={uploadedCoverPreviewUrl}
                imageDimensions={
                  uploadedCoverDimensions ?? {
                    width: selectedSize.width,
                    height: selectedSize.height,
                  }
                }
                targetWidth={selectedSize.width}
                targetHeight={selectedSize.height}
                targetLabel={selectedSize.label}
                onCropConfirm={handleCropConfirm}
                onCancel={handleCropCancel}
              />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>
                {epubFileName} ({formatFileSize(epubFileSize)})
              </span>
            </div>
            <button
              type="button"
              onClick={resetAll}
              className="flex cursor-pointer items-center gap-1 text-sm text-primary hover:text-primary-hover"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Change file
            </button>
          </div>
        </div>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-6 pt-16 pb-16 lg:px-6 lg:pt-28 lg:pb-28">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <HeroLeft />
        <EpubUploader
          onFileSelect={handleEpubSelect}
          isLoading={isProcessingEpub}
        />
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
}

"use client";

import { Check, ImageIcon, Move, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BACKGROUND_COLORS,
  COVER_EDITOR_DISPLAY_WIDTH,
  centerTransform,
  exportPositionedCover,
  formatDimensions,
  getInitialFitMode,
  getModeScale,
  type CoverBackground,
  type CoverFitMode,
  type CoverTransform,
  type ImageDimensions,
} from "@/lib/cover-sizes";

interface CoverCropEditorProps {
  imageFile: File;
  imagePreviewUrl: string;
  imageDimensions: ImageDimensions;
  targetWidth: number;
  targetHeight: number;
  targetLabel: string;
  onCropConfirm: (
    exportedFile: File,
    transform: CoverTransform,
    outputDimensions: ImageDimensions,
  ) => void;
  onCancel: () => void;
}

type EditorFitMode = Exclude<CoverFitMode, "original">;

const EDITOR_FIT_MODES: EditorFitMode[] = ["fit", "fill"];

const MODE_COPY: Record<EditorFitMode, { label: string; helper: string }> = {
  fit: {
    label: "Fit entire image",
    helper: "Keeps every pixel visible; empty space is filled with background.",
  },
  fill: {
    label: "Fill cover",
    helper: "Fills the cover edge to edge; some image edges may be cropped.",
  },
};

function getDisplayDimensions(targetWidth: number, targetHeight: number) {
  const width = Math.min(COVER_EDITOR_DISPLAY_WIDTH, window.innerWidth - 48);
  return {
    width,
    height: Math.round(width * (targetHeight / targetWidth)),
  };
}

function constrainTransform(
  transform: CoverTransform,
  imageDimensions: ImageDimensions,
  displayDimensions: ImageDimensions,
): CoverTransform {
  const scaledWidth = imageDimensions.width * transform.scale;
  const scaledHeight = imageDimensions.height * transform.scale;

  const next = { ...transform };

  if (scaledWidth <= displayDimensions.width) {
    next.x = (displayDimensions.width - scaledWidth) / 2;
  } else {
    const minX = displayDimensions.width - scaledWidth;
    next.x = Math.min(0, Math.max(minX, next.x));
  }

  if (scaledHeight <= displayDimensions.height) {
    next.y = (displayDimensions.height - scaledHeight) / 2;
  } else {
    const minY = displayDimensions.height - scaledHeight;
    next.y = Math.min(0, Math.max(minY, next.y));
  }

  return next;
}

export default function CoverCropEditor({
  imageFile,
  imagePreviewUrl,
  imageDimensions,
  targetWidth,
  targetHeight,
  targetLabel,
  onCropConfirm,
  onCancel,
}: CoverCropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [displayDimensions, setDisplayDimensions] = useState<ImageDimensions>({
    width:
      typeof window === "undefined"
        ? COVER_EDITOR_DISPLAY_WIDTH
        : Math.min(COVER_EDITOR_DISPLAY_WIDTH, window.innerWidth - 48),
    height:
      typeof window === "undefined"
        ? Math.round(COVER_EDITOR_DISPLAY_WIDTH * (targetHeight / targetWidth))
        : Math.round(
            Math.min(COVER_EDITOR_DISPLAY_WIDTH, window.innerWidth - 48) *
              (targetHeight / targetWidth),
          ),
  });

  const initialMode = useMemo(
    () => getInitialFitMode(imageDimensions, { width: targetWidth, height: targetHeight }),
    [imageDimensions, targetHeight, targetWidth],
  );

  const [transform, setTransform] = useState<CoverTransform>(() =>
    centerTransform(initialMode, imageDimensions, displayDimensions),
  );

  useEffect(() => {
    const updateDisplay = () =>
      setDisplayDimensions(getDisplayDimensions(targetWidth, targetHeight));
    window.addEventListener("resize", updateDisplay);
    return () => {
      window.removeEventListener("resize", updateDisplay);
    };
  }, [targetHeight, targetWidth]);

  useEffect(() => {
    const updateDisplay = () =>
      setDisplayDimensions(getDisplayDimensions(targetWidth, targetHeight));
    window.addEventListener("orientationchange", updateDisplay);
    return () => window.removeEventListener("orientationchange", updateDisplay);
  }, [targetHeight, targetWidth]);

  const fitScale = useMemo(
    () => getModeScale("fit", imageDimensions, displayDimensions),
    [displayDimensions, imageDimensions],
  );
  const fillScale = useMemo(
    () => getModeScale("fill", imageDimensions, displayDimensions),
    [displayDimensions, imageDimensions],
  );
  const minScale = fitScale;
  const maxScale = Math.max(fillScale * 3, fitScale * 3);

  const setMode = useCallback(
    (mode: CoverFitMode) => {
      setTransform((current) =>
        constrainTransform(
          centerTransform(mode, imageDimensions, displayDimensions, current.background),
          imageDimensions,
          displayDimensions,
        ),
      );
    },
    [displayDimensions, imageDimensions],
  );

  const setBackground = useCallback((background: CoverBackground) => {
    setTransform((current) => ({ ...current, background }));
  }, []);

  const setScale = useCallback(
    (scale: number) => {
      setTransform((current) => {
        const centerX = displayDimensions.width / 2;
        const centerY = displayDimensions.height / 2;
        const imageCenterX = (centerX - current.x) / current.scale;
        const imageCenterY = (centerY - current.y) / current.scale;
        const next = {
          ...current,
          scale,
          x: centerX - imageCenterX * scale,
          y: centerY - imageCenterY * scale,
        };
        return constrainTransform(next, imageDimensions, displayDimensions);
      });
    },
    [displayDimensions, imageDimensions],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        posX: transform.x,
        posY: transform.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [transform.x, transform.y],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setTransform((current) =>
        constrainTransform(
          {
            ...current,
            x: dragStart.current.posX + dx,
            y: dragStart.current.posY + dy,
          },
          imageDimensions,
          displayDimensions,
        ),
      );
    },
    [displayDimensions, imageDimensions, isDragging],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    setMode(transform.mode);
  }, [setMode, transform.mode]);

  const handleConfirm = useCallback(async () => {
    setIsConfirming(true);
    try {
      const outputDimensions =
        transform.mode === "original"
          ? imageDimensions
          : { width: targetWidth, height: targetHeight };
      const exportedFile = await exportPositionedCover({
        file: imageFile,
        targetWidth: outputDimensions.width,
        targetHeight: outputDimensions.height,
        transform,
        displayWidth: displayDimensions.width,
        mimeType: imageFile.type || "image/jpeg",
      });
      onCropConfirm(exportedFile, transform, outputDimensions);
    } catch {
      onCancel();
    } finally {
      setIsConfirming(false);
    }
  }, [
    displayDimensions.width,
    imageDimensions,
    imageFile,
    onCancel,
    onCropConfirm,
    targetHeight,
    targetWidth,
    transform,
  ]);

  const targetDimensions = { width: targetWidth, height: targetHeight };
  const willUpscale =
    transform.mode !== "original" &&
    (imageDimensions.width < targetWidth || imageDimensions.height < targetHeight);
  const ratioMismatch =
    Math.abs(
      imageDimensions.width / imageDimensions.height -
        targetDimensions.width / targetDimensions.height,
    ) /
      (targetDimensions.width / targetDimensions.height) >
    0.08;

  return (
    <div className="mx-auto mt-8 w-full max-w-[980px]">
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
          <Move className="h-4 w-4" />
          <span>Position your cover image</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {targetLabel}: {targetWidth} x {targetHeight}px · Source:{" "}
          {formatDimensions(imageDimensions)}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl border-2 border-dashed border-blue-400 shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
            style={{
              width: displayDimensions.width,
              height: displayDimensions.height,
              background: BACKGROUND_COLORS[transform.background],
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {imagePreviewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreviewUrl}
                alt="Cover positioning preview"
                draggable={false}
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                  width: imageDimensions.width * transform.scale,
                  height: imageDimensions.height * transform.scale,
                  left: transform.x,
                  top: transform.y,
                }}
              />
            )}

            <div className="absolute right-2 bottom-2 rounded bg-black/65 px-2 py-1 font-mono text-[10px] text-white">
              {transform.mode === "original"
                ? formatDimensions(imageDimensions)
                : `${targetWidth} x ${targetHeight}`}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Fit mode
            </p>
            <div className="grid gap-2">
              {EDITOR_FIT_MODES.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setMode(mode)}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    transform.mode === mode
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {MODE_COPY[mode].label}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    {MODE_COPY[mode].helper}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {transform.mode !== "original" && (
            <>
              <div className="mt-4">
                <label className="flex items-center justify-between text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  <span>Zoom</span>
                  <span>{Math.round((transform.scale / fitScale) * 100)}%</span>
                </label>
                <input
                  type="range"
                  min={minScale}
                  max={maxScale}
                  step={(maxScale - minScale) / 100}
                  value={transform.scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  Background
                </p>
                <div className="flex gap-2">
                  {(["white", "light-gray", "black"] as CoverBackground[]).map(
                    (background) => (
                      <button
                        key={background}
                        type="button"
                        onClick={() => setBackground(background)}
                        className={`h-9 flex-1 rounded-lg border text-xs font-medium ${
                          transform.background === background
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-gray-200"
                        }`}
                        style={{
                          background: BACKGROUND_COLORS[background],
                          color: background === "black" ? "#FFFFFF" : "#111827",
                        }}
                      >
                        {background === "light-gray" ? "Gray" : background}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
            <p className="flex gap-2">
              <ImageIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                We never stretch your image. Fit may add background; Fill may crop.
              </span>
            </p>
            {ratioMismatch && transform.mode === "fill" && (
              <p className="font-medium text-amber-700">
                Fill mode will crop because this image has a different ratio.
              </p>
            )}
            {willUpscale && (
              <p className="font-medium text-amber-700">
                This image is smaller than the selected output size, so sharpness may not improve.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isConfirming}
              className="inline-flex flex-[2] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-70"
            >
              <Check className="h-4 w-4" />
              {isConfirming ? "Exporting..." : "Confirm Cover"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

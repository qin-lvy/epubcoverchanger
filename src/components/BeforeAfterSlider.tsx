"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  height?: number;
  initialPosition?: number;
  large?: boolean;
  showcase?: boolean;
  aspectWidth?: number;
  aspectHeight?: number;
}

function CenteredBook({
  src,
  alt,
  aspectWidth,
  aspectHeight,
}: {
  src: string;
  alt: string;
  aspectWidth?: number;
  aspectHeight?: number;
}) {
  const displayWidth = 320;
  const displayHeight =
    aspectWidth && aspectHeight
      ? Math.round(displayWidth * (aspectHeight / aspectWidth))
      : 480;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={displayWidth}
        height={displayHeight}
        className="rounded-[8px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          objectFit: "contain",
        }}
        draggable={false}
      />
    </div>
  );
}

function ShowcaseBookSlider({
  beforeImage,
  afterImage,
  initialPosition,
  aspectWidth,
  aspectHeight,
}: {
  beforeImage: string;
  afterImage: string;
  initialPosition: number;
  aspectWidth?: number;
  aspectHeight?: number;
}) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafId = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => setSliderPosition(percent));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [updatePosition]);

  const startDrag = (clientX: number) => {
    isDragging.current = true;
    updatePosition(clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[560px] w-full max-w-[800px] cursor-col-resize overflow-hidden rounded-2xl select-none"
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches[0]) startDrag(e.touches[0].clientX);
      }}
      role="slider"
      aria-label="Before and after cover comparison"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After — full scene */}
      <div className="pointer-events-none absolute inset-0 bg-[#DBEAFE]">
        <CenteredBook
          src={afterImage}
          alt="New cover"
          aspectWidth={aspectWidth}
          aspectHeight={aspectHeight}
        />
      </div>

      {/* Before — clipped scene */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#F3E8E0] will-change-[clip-path]"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <CenteredBook
          src={beforeImage}
          alt="Original cover"
          aspectWidth={aspectWidth}
          aspectHeight={aspectHeight}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute top-0 z-10 h-full"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-[3px] bg-white" />
        <div
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.12)] transition-[width,height,box-shadow] duration-200 hover:h-[52px] hover:w-[52px] hover:shadow-[0_6px_28px_rgba(0,0,0,0.22),0_2px_12px_rgba(37,99,235,0.2)]"
          onMouseDown={(e) => {
            e.stopPropagation();
            startDrag(e.clientX);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            if (e.touches[0]) startDrag(e.touches[0].clientX);
          }}
          aria-hidden="true"
        >
          <ChevronsLeftRight className="h-5 w-5 text-[#6B7280]" />
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-4 left-4 z-[5] rounded-xl bg-black/55 px-3 py-1.5 text-xs font-semibold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 bottom-4 z-[5] rounded-xl bg-[rgba(37,99,235,0.85)] px-3 py-1.5 text-xs font-semibold text-white">
        After
      </span>
    </div>
  );
}

function DefaultCoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        draggable={false}
      />
    </div>
  );
}

function ClassicBeforeAfterSlider({
  beforeImage,
  afterImage,
  height,
  initialPosition,
  large,
}: {
  beforeImage: string;
  afterImage: string;
  height?: number;
  initialPosition: number;
  large: boolean;
}) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafId = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => setSliderPosition(percent));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updatePosition(e.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [updatePosition]);

  const startDrag = (clientX: number) => {
    isDragging.current = true;
    updatePosition(clientX);
  };

  const sizeClasses = large
    ? "max-w-[720px] h-[320px] md:h-[420px]"
    : "max-w-[640px] h-[280px] md:h-[360px]";

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full cursor-col-resize overflow-hidden rounded-2xl select-none ${sizeClasses}`}
      style={height !== undefined ? { height } : undefined}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches[0]) startDrag(e.touches[0].clientX);
      }}
      role="slider"
      aria-label="Before and after cover comparison"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#DBEAFE]">
        <DefaultCoverImage src={afterImage} alt="New cover" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[#F3E8E0] will-change-[clip-path]"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <DefaultCoverImage src={beforeImage} alt="Original cover" />
      </div>

      <div
        className="pointer-events-none absolute top-0 z-10 h-full"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-[3px] bg-white" />
        <div
          className="pointer-events-auto absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border-2 border-[#D1D5DB] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:border-primary hover:shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
          onMouseDown={(e) => {
            e.stopPropagation();
            startDrag(e.clientX);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            if (e.touches[0]) startDrag(e.touches[0].clientX);
          }}
          aria-hidden="true"
        >
          <ChevronsLeftRight className="h-[18px] w-[18px] text-[#6B7280]" />
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-4 left-4 z-[5] rounded-xl bg-black/55 px-3 py-1.5 text-xs font-semibold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 bottom-4 z-[5] rounded-xl bg-[rgba(37,99,235,0.85)] px-3 py-1.5 text-xs font-semibold text-white">
        After
      </span>
    </div>
  );
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  height,
  initialPosition = 50,
  large = false,
  showcase = false,
  aspectWidth,
  aspectHeight,
}: BeforeAfterSliderProps) {
  if (showcase) {
    return (
      <ShowcaseBookSlider
        beforeImage={beforeImage}
        afterImage={afterImage}
        initialPosition={initialPosition}
        aspectWidth={aspectWidth}
        aspectHeight={aspectHeight}
      />
    );
  }

  return (
    <ClassicBeforeAfterSlider
      beforeImage={beforeImage}
      afterImage={afterImage}
      height={height}
      initialPosition={initialPosition}
      large={large}
    />
  );
}

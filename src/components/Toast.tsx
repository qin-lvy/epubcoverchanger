"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      className="animate-slide-in fixed top-20 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-lg border border-[#FECACA] bg-[#FEE2E2] px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
    >
      <AlertCircle className="h-[18px] w-[18px] shrink-0 text-[#DC2626]" />
      <span className="text-sm text-[#991B1B]">{message}</span>
    </div>
  );
}

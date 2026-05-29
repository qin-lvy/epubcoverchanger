"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { capturePageView } from "@/lib/analytics";

export default function AnalyticsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    capturePageView(pathname);
  }, [pathname]);

  return children;
}
"use client";

import { useLocale } from "@/lib/i18n";

export default function TrustBar() {
  const { t } = useLocale();
  return (
    <div className="border-y border-gray-200 bg-white px-6 py-4">
      <p className="text-center text-sm text-gray-500">
        {t("trust")}
      </p>
    </div>
  );
}

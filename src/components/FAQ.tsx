"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/lib/faq-data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white px-6 py-12 lg:py-20">
      <div className="mx-auto max-w-[768px]">
        <h2 className="mb-10 text-center text-[36px] font-extrabold text-[#111827]">
          Frequently asked questions
        </h2>
        <div>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="mb-2 overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-base font-medium text-[#1F2937]">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-gray-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="animate-slide-down px-5 pb-4">
                    <p className="text-[15px] leading-[1.7] text-gray-500">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

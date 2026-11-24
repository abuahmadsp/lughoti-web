"use client";

import { useState } from "react";
import { faqs } from "@/lib/curriculum";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "./icons";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line/70 overflow-hidden rounded-3xl border border-line/80 bg-surface/70">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-paper/60 sm:px-6"
              >
                <span className="text-[15px] font-semibold leading-6 text-ink">
                  {faq.q}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border border-line/80 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 border-emerald-600/30 text-emerald-800 dark:text-emerald-200",
                  )}
                >
                  <IconChevronDown className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

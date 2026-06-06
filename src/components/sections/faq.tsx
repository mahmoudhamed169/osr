"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" ariaLabel={t("title")}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mx-auto mt-12 max-w-2xl divide-y divide-osr-ink/10 rounded-2xl border border-osr-ink/10 bg-card">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start font-semibold text-osr-ink"
                >
                  {item.q}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-osr-orange-deep transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
                hidden={!isOpen}
                className="px-6 pb-5 text-sm text-muted-foreground"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  X, PhoneCall, Check, Loader2, CalendarCheck, AlertCircle,
  UtensilsCrossed, Scissors, Package, HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const ACTIVITY_OPTIONS = [
  { value: "food",     icon: UtensilsCrossed, labelKey: "activityOptions.food",     descKey: "activityOptions.foodDesc" },
  { value: "crafts",   icon: Scissors,        labelKey: "activityOptions.crafts",   descKey: "activityOptions.craftsDesc" },
  { value: "products", icon: Package,         labelKey: "activityOptions.products", descKey: "activityOptions.productsDesc" },
  { value: "other",    icon: HelpCircle,      labelKey: "activityOptions.other",    descKey: "activityOptions.otherDesc" },
] as const;

export function ConsultationModal() {
  const t = useTranslations("consultation");
  const [open, setOpen]             = useState(false);
  const [status, setStatus]         = useState<Status>("idle");
  const [selected, setSelected]     = useState<string[]>([]);
  const [rings, setRings]           = useState(false);
  const btnRef                      = useRef<HTMLButtonElement>(null);
  const ringsTimer                  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastAttract                 = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      // Show ping rings, hide after 2.2s
      setRings(true);
      clearTimeout(ringsTimer.current);
      ringsTimer.current = setTimeout(() => setRings(false), 2200);

      // Bounce animation — throttled to once per 1.5s
      const now = Date.now();
      if (now - lastAttract.current > 1500) {
        lastAttract.current = now;
        const el = btnRef.current;
        if (el) {
          el.classList.remove("cta-btn-attract");
          void el.offsetWidth; // force reflow to restart animation
          el.classList.add("cta-btn-attract");
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(ringsTimer.current);
    };
  }, []);

  function toggleActivity(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function handleClose() {
    setOpen(false);
    if (status === "success") {
      setStatus("idle");
      setSelected([]);
    }
  }

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name:          (form.elements.namedItem("name")          as HTMLInputElement).value,
      phone:         (form.elements.namedItem("phone")         as HTMLInputElement).value,
      activityTypes: selected,
      preferredTime: (form.elements.namedItem("preferredTime") as HTMLSelectElement).value,
      notes:         (form.elements.namedItem("notes")         as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-osr-ink/15 bg-osr-cream/40 px-4 py-2.5 text-sm text-osr-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-osr-orange focus:bg-white focus:ring-2 focus:ring-osr-orange/25";

  return (
    <>
      {/* ── Floating button ── */}
      <div className="cta-btn-float fixed bottom-6 end-6 z-40">
        {rings && (
          <>
            <span className="absolute inset-0 rounded-full bg-osr-orange/40 animate-ping pointer-events-none" aria-hidden="true" />
            <span className="absolute inset-0 rounded-full bg-osr-orange/20 animate-ping [animation-delay:600ms] pointer-events-none" aria-hidden="true" />
          </>
        )}
        <button
          ref={btnRef}
          onClick={() => setOpen(true)}
          aria-label={t("buttonLabel")}
          onAnimationEnd={(e) => {
            if (e.animationName === "ctaAttract") {
              e.currentTarget.classList.remove("cta-btn-attract");
            }
          }}
          className={cn(
            "relative flex items-center gap-2.5 rounded-full",
            "bg-osr-orange px-5 py-3 text-sm font-bold text-osr-ink shadow-lift",
            "transition-shadow duration-200 hover:shadow-glow active:scale-95 active:transition-transform",
          )}
        >
          <CalendarCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{t("buttonLabel")}</span>
        </button>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-osr-ink/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Card */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="h-1.5 w-full bg-osr-orange" aria-hidden="true" />

            {/* Scrollable inner */}
            <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              {/* Close */}
              <button
                onClick={handleClose}
                aria-label={t("close")}
                className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-osr-cream-2 hover:text-osr-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-osr-orange/15 text-osr-orange-deep">
                    <Check className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <p className="font-display text-xl font-bold text-osr-ink">{t("successTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("successBody")}</p>
                  <Button variant="primary" size="md" onClick={handleClose} className="mt-2">
                    {t("close")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-osr-orange/15">
                      <PhoneCall className="h-5 w-5 text-osr-orange-deep" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-osr-ink">{t("title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {status === "error" && (
                      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {t("errorMsg")}
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="c-name" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("name")} <span className="text-osr-red">*</span>
                      </label>
                      <input id="c-name" name="name" type="text" required autoComplete="name" className={inputCls} placeholder={t("namePlaceholder")} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="c-phone" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("phone")} <span className="text-osr-red">*</span>
                      </label>
                      <input id="c-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" className={inputCls} placeholder={t("phonePlaceholder")} />
                    </div>

                    {/* Activity type — multi-select cards */}
                    <div>
                      <p className="mb-2 text-xs font-semibold text-osr-ink">
                        {t("activityType")}
                        <span className="ms-1.5 text-[11px] font-normal text-muted-foreground">{t("multiSelectHint")}</span>
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {ACTIVITY_OPTIONS.map(({ value, icon: Icon, labelKey, descKey }) => {
                          const active = selected.includes(value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => toggleActivity(value)}
                              className={cn(
                                "flex flex-col gap-1.5 rounded-xl border-2 p-3 text-start transition-all duration-150",
                                active
                                  ? "border-osr-orange bg-osr-orange/10"
                                  : "border-osr-ink/10 bg-osr-cream/30 hover:border-osr-orange/40 hover:bg-osr-orange/5",
                              )}
                            >
                              <span className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                                active ? "bg-osr-orange text-white" : "bg-osr-ink/8 text-osr-ink/60",
                              )}>
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className={cn("text-xs font-bold leading-tight", active ? "text-osr-orange-deep" : "text-osr-ink")}>
                                {t(labelKey)}
                              </span>
                              <span className="text-[11px] leading-tight text-muted-foreground">
                                {t(descKey)}
                              </span>
                              {active && (
                                <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-osr-orange-deep">
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                  {t("selected")}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preferred time */}
                    <div>
                      <label htmlFor="c-time" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("preferredTime")}
                      </label>
                      <select id="c-time" name="preferredTime" className={inputCls} defaultValue="">
                        <option value="" disabled>{t("selectPlaceholder")}</option>
                        <option value="morning">{t("timeOptions.morning")}</option>
                        <option value="afternoon">{t("timeOptions.afternoon")}</option>
                        <option value="evening">{t("timeOptions.evening")}</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="c-notes" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("notes")}
                      </label>
                      <textarea id="c-notes" name="notes" rows={2} className={inputCls} placeholder={t("notesPlaceholder")} />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t("submitting")}
                        </span>
                      ) : t("submit")}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, Bike, Check, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function DeliveryPartnerModal() {
  const t = useTranslations("deliveryPartner");
  const [open, setOpen]     = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  function handleClose() {
    setOpen(false);
    if (status === "success") setStatus("idle");
  }

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      company:     (form.elements.namedItem("company")     as HTMLInputElement).value,
      contactName: (form.elements.namedItem("contactName") as HTMLInputElement).value,
      phone:       (form.elements.namedItem("phone")       as HTMLInputElement).value,
      email:       (form.elements.namedItem("email")       as HTMLInputElement).value,
      cities:      (form.elements.namedItem("cities")      as HTMLInputElement).value,
      fleetSize:   (form.elements.namedItem("fleetSize")   as HTMLSelectElement).value,
      notes:       (form.elements.namedItem("notes")       as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/delivery-partner", {
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
    "w-full rounded-xl border border-osr-ink/15 bg-osr-cream/40 px-4 py-2.5 text-sm text-osr-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-osr-red focus:bg-white focus:ring-2 focus:ring-osr-red/20";

  return (
    <>
      {/* ── Partner banner trigger ── */}
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-between gap-4 rounded-2xl
                   border border-osr-orange/25 bg-osr-orange/10 px-6 py-5
                   text-start transition-all duration-300
                   hover:bg-osr-orange/20 hover:border-osr-orange/50"
      >
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-osr-orange/20 text-osr-orange transition-colors group-hover:bg-osr-orange group-hover:text-white">
            <Bike className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-white">
              {t("bannerTitle")}
            </p>
            <p className="mt-0.5 text-sm text-white/60">
              {t("bannerSubtitle")}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-osr-orange opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </button>

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
            <div className="h-1.5 w-full bg-osr-red" aria-hidden="true" />

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
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-osr-red/10 text-osr-red">
                    <Check className="h-8 w-8" aria-hidden="true" />
                  </span>
                  <p className="font-display text-xl font-bold text-osr-ink">{t("successTitle")}</p>
                  <p className="text-sm text-muted-foreground">{t("successBody")}</p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleClose}
                    className="mt-2 bg-osr-red hover:bg-osr-red-deep"
                  >
                    {t("close")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-5">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-osr-red/10">
                      <Bike className="h-5 w-5 text-osr-red" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-osr-ink">{t("title")}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                    {status === "error" && (
                      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {t("errorMsg")}
                      </div>
                    )}

                    {/* Company name */}
                    <div>
                      <label htmlFor="dp-company" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("company")} <span className="text-osr-red">*</span>
                      </label>
                      <input id="dp-company" name="company" type="text" required autoComplete="organization" className={inputCls} placeholder={t("companyPlaceholder")} />
                    </div>

                    {/* Contact name */}
                    <div>
                      <label htmlFor="dp-contact" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("contactName")} <span className="text-osr-red">*</span>
                      </label>
                      <input id="dp-contact" name="contactName" type="text" required autoComplete="name" className={inputCls} placeholder={t("contactNamePlaceholder")} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="dp-phone" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("phone")} <span className="text-osr-red">*</span>
                      </label>
                      <input id="dp-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" className={inputCls} placeholder={t("phonePlaceholder")} />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="dp-email" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("email")}
                      </label>
                      <input id="dp-email" name="email" type="email" autoComplete="email" dir="ltr" className={inputCls} placeholder={t("emailPlaceholder")} />
                    </div>

                    {/* Cities */}
                    <div>
                      <label htmlFor="dp-cities" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("cities")}
                      </label>
                      <input id="dp-cities" name="cities" type="text" className={inputCls} placeholder={t("citiesPlaceholder")} />
                    </div>

                    {/* Fleet size */}
                    <div>
                      <label htmlFor="dp-fleet" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("fleetSize")}
                      </label>
                      <select id="dp-fleet" name="fleetSize" className={inputCls} defaultValue="">
                        <option value="" disabled>{t("selectPlaceholder")}</option>
                        <option value="1-5">1 – 5</option>
                        <option value="6-20">6 – 20</option>
                        <option value="21-50">21 – 50</option>
                        <option value="50+">+50</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="dp-notes" className="mb-1 block text-xs font-semibold text-osr-ink">
                        {t("notes")}
                      </label>
                      <textarea id="dp-notes" name="notes" rows={2} className={inputCls} placeholder={t("notesPlaceholder")} />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-osr-red hover:bg-osr-red-deep"
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

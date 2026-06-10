"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Mail, Phone, Check, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name:     (form.elements.namedItem("name")     as HTMLInputElement).value,
      email:    (form.elements.namedItem("email")    as HTMLInputElement).value,
      company:  (form.elements.namedItem("company")  as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message:  (form.elements.namedItem("message")  as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
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
    "w-full rounded-xl border border-osr-ink/15 bg-card px-4 py-3 text-osr-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-osr-orange focus:ring-2 focus:ring-osr-orange/30";

  return (
    <Section id="contact" ariaLabel={t("title")} className="bg-osr-cream-2">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="osr-eyebrow">{t("eyebrow")}</span>
          <h2 className="osr-headline mt-4 text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10">
            <h3 className="text-sm font-semibold text-osr-ink">{t("infoTitle")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-osr-ink/8 bg-white px-4 py-3.5 transition-all hover:border-osr-orange/30 hover:shadow-soft"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-osr-orange/12 text-osr-orange-deep transition-colors group-hover:bg-osr-orange group-hover:text-white">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] text-muted-foreground">{t("emailLabel")}</p>
                    <p className="text-sm font-medium text-osr-ink" dir="ltr">{siteConfig.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-osr-ink/8 bg-white px-4 py-3.5 transition-all hover:border-osr-orange/30 hover:shadow-soft"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-osr-orange/12 text-osr-orange-deep transition-colors group-hover:bg-osr-orange group-hover:text-white">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] text-muted-foreground">{t("phoneLabel")}</p>
                    <p className="text-sm font-medium text-osr-ink" dir="ltr">{siteConfig.phone}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal index={1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-osr-ink/10 bg-card p-6 shadow-soft sm:p-8"
            noValidate
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-14 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-osr-orange/15 text-osr-orange-deep">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </span>
                <p className="font-display text-xl font-semibold text-osr-ink">
                  {t("successTitle")}
                </p>
                <p className="text-sm text-muted-foreground">{t("successBody")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {t("errorMsg")}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-osr-ink">
                    {t("name")}
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={inputCls} />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-osr-ink">
                    {t("email")}
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-osr-ink">
                    {t("company")}
                  </label>
                  <input id="company" name="company" type="text" autoComplete="organization" className={inputCls} />
                </div>

                <div>
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-osr-ink">
                    {t("interest")}
                  </label>
                  <select id="interest" name="interest" className={inputCls} defaultValue="customer">
                    <option value="customer">{t("interestOptions.customer")}</option>
                    <option value="provider">{t("interestOptions.provider")}</option>
                    <option value="enterprise">{t("interestOptions.enterprise")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-osr-ink">
                    {t("message")}
                  </label>
                  <textarea id="message" name="message" rows={4} required className={inputCls} />
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
                  ) : (
                    t("submit")
                  )}
                </Button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

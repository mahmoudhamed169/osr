"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Mail, Phone, Check } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this to your backend / CRM / email service.
    setSent(true);
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
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-3 text-osr-ink hover:text-osr-orange-deep">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-osr-orange/15 text-osr-orange-deep">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-3 text-osr-ink hover:text-osr-orange-deep" dir="ltr">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-osr-orange/15 text-osr-orange-deep">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {siteConfig.phone}
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
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-osr-orange/15 text-osr-orange-deep">
                  <Check className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="font-display text-lg font-semibold text-osr-ink">
                  {t("submit")} ✓
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  {t("submit")}
                </Button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AppStoreButtons } from "@/components/ui/app-badges";
import { apps } from "@/config/apps";
import type { Locale } from "@/i18n/routing";
import { Star, Bike, ArrowUpRight } from "lucide-react";

export function Download() {
  const t = useTranslations("download");
  const locale = useLocale() as Locale;
  const downloadable = apps.filter((a) => a.links.appStore || a.links.googlePlay);

  return (
    <Section id="download" ariaLabel={t("title")}>
      <div className="relative overflow-hidden rounded-[2rem] bg-osr-ink px-6 py-16 text-white sm:px-12">
        {/* bg texture */}
        <div className="osr-pattern pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div className="pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-osr-orange/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -start-16 h-72 w-72 rounded-full bg-osr-red/20 blur-3xl" aria-hidden="true" />

        <div className="relative">
          {/* Heading */}
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="osr-eyebrow border-white/20 bg-white/10 text-osr-orange">
              {t("eyebrow")}
            </span>
            <h2 className="osr-headline mt-4 text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 text-pretty text-white/70 sm:text-lg">{t("subtitle")}</p>
          </Reveal>

          {/* App cards */}
          <ul className="relative mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {downloadable.map((app, i) => (
              <Reveal as="li" key={app.id} index={i % 2}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold">
                      {app.name[locale]}
                    </h3>
                    {app.rating ? (
                      <span className="inline-flex items-center gap-1 text-sm text-osr-orange">
                        <Star className="h-4 w-4 fill-osr-orange" aria-hidden="true" />
                        {app.rating.toFixed(1)}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-white/65">{app.tagline[locale]}</p>
                  <AppStoreButtons
                    className="mt-auto"
                    appStore={app.links.appStore}
                    googlePlay={app.links.googlePlay}
                    appStoreLabel={t("appStore")}
                    googlePlayLabel={t("googlePlay")}
                  />
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Partner card — شركات التوصيل */}
          <Reveal className="mx-auto mt-4 max-w-3xl">
            <a
              href="https://your-partner-url.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl
                         border border-osr-orange/25 bg-osr-orange/10 px-6 py-5
                         transition-all duration-300
                         hover:bg-osr-orange/20 hover:border-osr-orange/50"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-osr-orange/20 text-osr-orange transition-colors group-hover:bg-osr-orange group-hover:text-white">
                  <Bike className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-white">
                    {t("partnerTitle")}
                  </p>
                  <p className="mt-0.5 text-sm text-white/60">
                    {t("partnerSubtitle")}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="h-5 w-5 shrink-0 text-osr-orange opacity-70
                           transition-all duration-300
                           group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>

        </div>
      </div>
    </Section>
  );
}
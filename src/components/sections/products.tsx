import { useLocale, useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { apps } from "@/config/apps";
import type { Locale } from "@/i18n/routing";
import { ShoppingBag, Home, Bike, LayoutDashboard, type LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingBag,
  Home,
  Bike,
  LayoutDashboard,
};

export function Products() {
  const t = useTranslations("products");
  const locale = useLocale() as Locale;

  return (
    <Section id="products" ariaLabel={t("title")} className="bg-osr-cream-2">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2">
        {apps.map((app, i) => {
          const Icon = ICON_MAP[app.icon] ?? ShoppingBag;
          return (
            <Reveal as="li" key={app.id} index={i % 2}>
              <article className="group flex h-full items-start gap-5 rounded-2xl border border-osr-ink/10 bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-osr-orange to-osr-red text-white shadow-soft">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wide text-osr-orange-deep">
                    {t(`audience.${app.audience}`)}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-osr-ink">
                    {app.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {app.tagline[locale]}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import {
  Zap,
  Route,
  CreditCard,
  BarChart3,
  KeyRound,
  Boxes,
} from "lucide-react";

const ICONS = [Zap, Route, CreditCard, BarChart3, KeyRound, Boxes];

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <Section id="features" ariaLabel={t("title")}>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Zap;
          return (
            <Reveal as="li" key={item.title} index={i % 3}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-osr-ink/10 bg-card p-6 shadow-soft transition-all hover:shadow-lift">
                <div className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-osr-orange/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-osr-orange/15 text-osr-orange-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-osr-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Gauge, Sparkle, Expand, LineChart } from "lucide-react";

const ICONS = [Gauge, Sparkle, Expand, LineChart];

export function Why() {
  const t = useTranslations("why");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <Section id="why" ariaLabel={t("title")} className="bg-osr-cream-2">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = ICONS[i] ?? Gauge;
          return (
            <Reveal as="li" key={item.title} index={i}>
              <div className="h-full rounded-2xl border border-osr-ink/10 bg-card p-6 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-osr-orange/15 text-osr-orange-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-osr-ink">
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

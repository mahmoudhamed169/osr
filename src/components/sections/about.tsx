import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Layers, TrendingUp, ShieldCheck } from "lucide-react";

const ICONS = [Layers, TrendingUp, ShieldCheck];

export function About() {
  const t = useTranslations("about");
  const points = t.raw("points") as { title: string; body: string }[];

  return (
    <Section id="about" ariaLabel={t("title")}>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <SectionHeading
          align="start"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("body")}
        />
        <ul className="space-y-4">
          {points.map((point, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <Reveal as="li" key={point.title} index={i}>
                <div className="flex gap-4 rounded-2xl border border-osr-ink/10 bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-osr-orange/15 text-osr-orange-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-osr-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{point.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <Section ariaLabel={t("title")}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-osr-ink/10 bg-osr-ink/10 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.label} index={i} className="bg-card">
            <div className="px-6 py-10 text-center">
              <dt className="font-display text-4xl font-extrabold text-gradient sm:text-5xl">
                {item.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{item.label}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

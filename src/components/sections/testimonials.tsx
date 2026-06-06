import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Quote } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as { quote: string; name: string; role: string }[];

  return (
    <Section ariaLabel={t("title")}>
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <ul className="mt-14 grid gap-5 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal as="li" key={item.name} index={i}>
            <figure className="flex h-full flex-col rounded-2xl border border-osr-ink/10 bg-card p-7 shadow-soft">
              <Quote className="h-8 w-8 text-osr-orange/40 flip-x" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-pretty text-osr-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-osr-ink/10 pt-4">
                <span className="block font-semibold text-osr-ink">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

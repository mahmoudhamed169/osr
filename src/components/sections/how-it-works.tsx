import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; body: string }[];

  return (
    <Section id="how-it-works" ariaLabel={t("title")}>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ol className="relative mt-14 grid gap-8 md:grid-cols-4">
        {/* connecting line on desktop */}
        <div
          className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-osr-orange/40 to-transparent md:block"
          aria-hidden="true"
        />
        {steps.map((step, i) => (
          <Reveal as="li" key={step.title} index={i} className="relative">
            <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-osr-red font-display text-xl font-bold text-white shadow-soft">
              {i + 1}
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-osr-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

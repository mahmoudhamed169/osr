import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

// Placeholder partner names — swap for real client logos when available.
const PARTNERS = ["Aramco", "stc", "Almarai", "Jahez", "Mrsool", "Tamara", "noon", "Saudia"];

export function Partners() {
  const t = useTranslations("partners");
  const row = [...PARTNERS, ...PARTNERS];

  return (
    <section aria-label={t("title")} className="border-y border-osr-ink/10 bg-card py-14">
      <div className="container">
        <Reveal className="text-center">
          <span className="osr-eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 font-display text-xl font-semibold text-osr-ink">
            {t("title")}
          </h2>
        </Reveal>
      </div>

      <div className="mask-fade-x mt-8 overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 px-6" aria-hidden="true">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="font-display text-2xl font-bold tracking-tight text-osr-ink/30"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

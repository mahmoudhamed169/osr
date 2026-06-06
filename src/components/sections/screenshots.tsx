import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const SCREENS = [
  { key: "login", src: "/screens/login.jpg" },
  { key: "browse", src: "/screens/browse.jpg" },
  { key: "detail", src: "/screens/detail.jpg" },
] as const;

export function Screenshots() {
  const t = useTranslations("screenshots");

  return (
    <Section id="screenshots" ariaLabel={t("title")} className="relative overflow-hidden">
      {/* 3D brand orbs as atmosphere */}
      <div className="osr-orb osr-orb-orange animate-float-slow absolute start-[6%] top-16 h-24 w-24 opacity-50 blur-sm" aria-hidden="true" />
      <div className="osr-orb osr-orb-red animate-float absolute end-[8%] bottom-12 h-20 w-20 opacity-50 blur-sm" aria-hidden="true" />

      <div className="relative">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <ul className="mt-14 grid justify-items-center gap-10 sm:grid-cols-3 sm:gap-6">
          {SCREENS.map((s, i) => (
            <Reveal as="li" key={s.key} index={i} className="w-[240px]">
              <div className="osr-device w-[240px]">
                <Image
                  src={s.src}
                  alt={t(`captions.${s.key}`)}
                  width={620}
                  height={1192}
                  loading="lazy"
                  sizes="240px"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 text-center font-semibold text-osr-ink">
                {t(`captions.${s.key}`)}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

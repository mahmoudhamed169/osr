import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/ui/logo";
import { Users, Store, Bike, LayoutDashboard } from "lucide-react";

const ICONS = [Users, Store, Bike, LayoutDashboard];

export function Ecosystem() {
  const t = useTranslations("ecosystem");
  const nodes = t.raw("nodes") as { title: string; body: string }[];

  return (
    <Section id="ecosystem" ariaLabel={t("title")} className="bg-osr-cream-2">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <div className="relative mx-auto mt-14 max-w-5xl">
        {/* central core badge */}
        <Reveal className="mb-10 flex justify-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-osr-orange/25 bg-card px-14 py-10 shadow-glow">
            <Logo showWordmark={true} className="h-20 w-auto" />
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-osr-orange-deep/70">
              {t("coreLabel")}
            </span>
          </div>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {nodes.map((node, i) => {
            const Icon = ICONS[i] ?? Users;
            return (
              <Reveal as="li" key={node.title} index={i}>
                <div className="group h-full rounded-2xl border border-osr-ink/10 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-osr-red/10 text-osr-red transition-colors group-hover:bg-osr-red group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-osr-ink">
                    {node.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {node.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

import { useTranslations } from "next-intl";
import {
  UtensilsCrossed,
  Scissors,
  Package,
  Clock,
  ClipboardList,
  CalendarHeart,
  Sparkles,
  PenTool,
  Gift,
  Zap,
  Wrench,
  Ribbon,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/ui/logo";

type Subcategory = { title: string };
type Category = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subcategories: Subcategory[];
};

const CATEGORY_ICONS: LucideIcon[] = [UtensilsCrossed, Scissors, Package];

const SUB_ICONS: LucideIcon[][] = [
  [Clock, ClipboardList, CalendarHeart],
  [Sparkles, PenTool, Gift],
  [Zap, Wrench, Ribbon],
];

const CARD_THEMES = [
  {
    iconBg: "from-[#F9B233] to-[#c47a0b]",
    iconShadow: "shadow-[0_12px_28px_-6px_rgba(196,122,11,0.65)]",
    accent: "text-[#e8941a]",
    chipBg: "bg-[#F9B233]/10 border-[#F9B233]/20 text-[#c47a0b]",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(249,178,51,0.25),0_24px_48px_-12px_rgba(196,122,11,0.30)]",
    topBar: "from-[#F9B233] to-[#c47a0b]",
  },
  {
    iconBg: "from-[#e8304a] to-[#8c0a1f]",
    iconShadow: "shadow-[0_12px_28px_-6px_rgba(140,10,31,0.65)]",
    accent: "text-[#e8304a]",
    chipBg: "bg-[#C8102E]/10 border-[#C8102E]/20 text-[#c0162e]",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(200,16,46,0.25),0_24px_48px_-12px_rgba(140,10,31,0.30)]",
    topBar: "from-[#e8304a] to-[#8c0a1f]",
  },
  {
    iconBg: "from-[#d4820a] to-[#7a4500]",
    iconShadow: "shadow-[0_12px_28px_-6px_rgba(122,69,0,0.65)]",
    accent: "text-[#d4820a]",
    chipBg: "bg-[#d4820a]/10 border-[#d4820a]/20 text-[#a35f07]",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(212,130,10,0.25),0_24px_48px_-12px_rgba(122,69,0,0.30)]",
    topBar: "from-[#d4820a] to-[#7a4500]",
  },
] as const;

export function Categories() {
  const t = useTranslations("categories");
  const categories = t.raw("items") as Category[];

  return (
    <section
      id="categories"
      aria-label={t("title")}
      className="relative overflow-hidden scroll-mt-24 py-20 sm:py-28
                 bg-[#110a04]"
    >
      {/* pattern texture */}
      <div
        className="osr-pattern pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      />
      {/* ambient glows */}
      <div className="pointer-events-none absolute -start-48 top-0 h-[480px] w-[480px] rounded-full bg-[#F9B233]/6 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -end-48 bottom-0 h-[480px] w-[480px] rounded-full bg-[#C8102E]/6 blur-[140px]" aria-hidden="true" />

      <div className="container relative">

        {/* ── Heading ── */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
              <Logo showWordmark={false} />
              <div className="h-5 w-px bg-white/15" aria-hidden="true" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                {t("eyebrow")}
              </span>
            </div>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-white/50 sm:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* ── Cards ── */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const theme = CARD_THEMES[i] ?? CARD_THEMES[0];
            const Icon = CATEGORY_ICONS[i] ?? Package;
            const subs = SUB_ICONS[i] ?? [Zap, ClipboardList, Gift];

            return (
              <Reveal key={cat.id} index={i}>
                <div
                  className={[
                    "group relative overflow-hidden rounded-2xl",
                    "border border-white/8 bg-white/[0.035]",
                    "p-6 transition-all duration-400",
                    "hover:border-white/15 hover:bg-white/[0.055]",
                    theme.glow,
                  ].join(" ")}
                >
                  {/* colored top bar — visible on hover */}
                  <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${theme.topBar}`} />

                  {/* icon + title row */}
                  <div className="flex items-center gap-4">
                    <div
                      className={[
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                        "bg-gradient-to-br",
                        theme.iconBg,
                        theme.iconShadow,
                      ].join(" ")}
                    >
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white/90 leading-tight">
                        {cat.title}
                      </h3>
                      <p className={`mt-0.5 text-xs font-medium ${theme.accent}`}>
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* description */}
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {cat.description}
                  </p>

                  {/* divider */}
                  <div className="my-5 h-px bg-white/8" />

                  {/* sub-categories */}
                  <div className="flex flex-wrap gap-2">
                    {cat.subcategories.map((sub, si) => {
                      const SubIcon = subs[si] ?? Zap;
                      return (
                        <span
                          key={sub.title}
                          className={[
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
                            "text-xs font-medium",
                            theme.chipBg,
                          ].join(" ")}
                        >
                          <SubIcon className="h-3 w-3 shrink-0" aria-hidden="true" />
                          {sub.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Bottom type badges ── */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: t("readyBadge"), Icon: Clock },
            { label: t("customBadge"), Icon: PenTool },
            { label: t("occasionBadge"), Icon: CalendarHeart },
          ].map(({ label, Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10
                         bg-white/5 px-4 py-2 text-sm font-medium text-white/60"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
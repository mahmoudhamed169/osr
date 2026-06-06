import { useTranslations } from "next-intl";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const stats = [
    { value: "2M+", key: "orders" },
    { value: "5K+", key: "providers" },
    { value: "99.9%", key: "uptime" },
  ] as const;

  return (
    <section
      id="main"
      className="relative overflow-hidden bg-osr-warm pt-28 lg:pt-36"
      aria-label="Introduction"
    >
      {/* subtle brand food-pattern texture */}
      <div className="osr-pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 end-[-10%] h-[28rem] w-[28rem] rounded-full bg-osr-orange/20 blur-3xl" aria-hidden="true" />

      <div className="container relative grid items-center gap-12 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <div>
          <Reveal index={0}>
            <span className="osr-eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t("eyebrow")}
            </span>
          </Reveal>

          <Reveal index={1}>
            <h1 className="osr-headline mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              {t.rich("title", {
                hl: (chunks) => <span className="text-gradient">{chunks}</span>,
              })}
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#ecosystem">
                <Button variant="primary" size="lg" className="group">
                  {t("primaryCta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 flip-x" />
                </Button>
              </a>
              <a href="#download">
                <Button variant="outline" size="lg">
                  {t("secondaryCta")}
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal index={4}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-osr-ink/10 pt-8">
              {stats.map((s) => (
                <div key={s.key}>
                  <dt className="font-display text-2xl font-bold text-osr-ink sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">
                    {t(`stats.${s.key}`)}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Real app screen in a device frame, framed by 3D brand shapes */}
        <Reveal index={3} className="relative mx-auto flex w-full max-w-md items-center justify-center [perspective:1400px]">
          <div className="osr-ring3d animate-spin-3d -end-2 top-6 h-52 w-52" aria-hidden="true" />
          <div className="osr-orb osr-orb-orange animate-float-slow -start-1 top-4 h-28 w-28" aria-hidden="true" />
          <div className="osr-orb osr-orb-red animate-float bottom-16 -end-2 h-20 w-20" aria-hidden="true" />

          <div className="osr-device animate-float w-[266px]">
            <Image
              src="/screens/browse.jpg"
              alt="OSR customer app — browsing services"
              width={620}
              height={1192}
              priority
              sizes="266px"
              className="h-auto w-full"
            />
          </div>

          <div className="absolute -start-6 top-16 z-10 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/80 px-3.5 py-2.5 text-[13px] font-semibold shadow-lift backdrop-blur">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-osr-orange to-osr-orange-deep text-white">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </span>
            {t("chip1")}
          </div>
          <div className="absolute bottom-24 -end-7 z-10 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/80 px-3.5 py-2.5 text-[13px] font-semibold shadow-lift backdrop-blur">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-osr-red to-osr-red-deep text-white">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            {t("chip2")}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

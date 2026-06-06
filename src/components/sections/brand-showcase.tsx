import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function BrandShowcase({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section
      aria-label={isAr ? "هويتنا البصرية" : "Our Brand Identity"}
      className="relative overflow-hidden scroll-mt-24 bg-[#faf7f2] py-20 sm:py-28"
    >
      <div className="osr-pattern pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true" />

      <div className="container relative">

        <Reveal className="mx-auto max-w-xl text-center">
          <span className="osr-eyebrow">
            {isAr ? "هويتنا البصرية" : "Our Brand Identity"}
          </span>
          <h2 className="osr-headline mt-4 text-3xl sm:text-4xl lg:text-[2.6rem]">
            {isAr ? "علامة تجارية تحكي قصة" : "A brand that tells a story"}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {isAr
              ? "كل تفصيلة في هوية OSR تعكس روح الأسرة المنتجة — دافئة، أصيلة، وجديرة بالثقة."
              : "Every detail in OSR's identity reflects the spirit of productive families — warm, authentic, and trustworthy."}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* App — full width, object-cover no gaps */}
          <Reveal index={0} className="lg:col-span-2">
            <div className="group relative w-full overflow-hidden rounded-3xl
                            border border-osr-ink/8 shadow-soft
                            transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative w-full" style={{ paddingBottom: "45%" }}>
                <Image
                  src="/osr-brand-app.png"
                  alt={isAr ? "تطبيق OSR على الأيفون" : "OSR app on iPhone"}
                  fill
                  sizes="100vw"
                  className="object-cover object-center
                             transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 px-7 py-6">
                  <p className="font-display text-xl font-bold text-white">
                    {isAr ? "تطبيق OSR" : "OSR App"}
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {isAr ? "متوفر على App Store و Google Play" : "Available on App Store & Google Play"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Shirt */}
          <Reveal index={1}>
            <div className="group relative overflow-hidden rounded-3xl
                            border border-osr-ink/8 bg-[#f3ede4] shadow-soft
                            transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative w-full" style={{ paddingBottom: "80%" }}>
                <Image
                  src="/osr-brand-shirt.png"
                  alt={isAr ? "الزي الرسمي" : "Official Polo Shirt"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center p-8
                             transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 px-6 py-5">
                  <p className="font-display text-lg font-bold text-white">
                    {isAr ? "الزي الرسمي" : "Official Uniform"}
                  </p>
                  <p className="mt-0.5 text-sm text-white/65">
                    {isAr ? "بولو بألوان العلامة التجارية" : "Polo in brand colours"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bag */}
          <Reveal index={2}>
            <div className="group relative overflow-hidden rounded-3xl
                            border border-osr-ink/8 bg-[#f3ede4] shadow-soft
                            transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative w-full" style={{ paddingBottom: "80%" }}>
                <Image
                  src="/osr-brand-bag.png"
                  alt={isAr ? "كيس التسوق الرسمي" : "Official Tote Bag"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center p-8
                             transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 px-6 py-5">
                  <p className="font-display text-lg font-bold text-white">
                    {isAr ? "كيس التسوق" : "Tote Bag"}
                  </p>
                  <p className="mt-0.5 text-sm text-white/65">
                    {isAr ? "تصميم مميز بنقوش الهوية" : "Branded identity pattern"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { About } from "@/components/sections/about";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Features } from "@/components/sections/features";
import { Products } from "@/components/sections/products";
import { Screenshots } from "@/components/sections/screenshots";
import { Download } from "@/components/sections/download";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Why } from "@/components/sections/why";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Partners } from "@/components/sections/partners";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { BrandShowcase } from "@/components/sections/brand-showcase";

import {
  OrganizationSchema,
  WebsiteSchema,
  FaqSchema,
  MobileAppSchema,
  BreadcrumbSchema,
} from "@/components/seo/json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const faqItems = t.raw("items") as { q: string; a: string }[];

  return (
    <>
      {/* Structured data — server-rendered, no client JS cost */}
      <OrganizationSchema />
      <WebsiteSchema locale={locale} />
      <MobileAppSchema locale={locale} />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        locale={locale}
        items={[{ name: tn("ecosystem"), path: "" }]}
      />

      <Hero />
      <Categories />
      <Partners />
      <About />
      <BrandShowcase locale={locale} />
      <Ecosystem />
      <Features />
      <Products />
      <Screenshots />
      <Download />
      <HowItWorks />
      <Why />
      <Stats />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}

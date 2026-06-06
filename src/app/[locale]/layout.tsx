import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, localeDirection, isValidLocale, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { plexSans, plexArabic } from "../fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

// Pre-render every locale at build time for fully static delivery.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.url}/${l}`])
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    keywords: t("keywords"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName }],
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: { ...languages, "x-default": `${siteConfig.url}/${siteConfig.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      url: `${siteConfig.url}/${locale}`,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title: t("title"),
      description: t("description"),
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  // Messages for the client provider (consumed by client components).
  const messages = await getMessages();

  const dir = localeDirection[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(plexSans.variable, plexArabic.variable)}
      style={{
        // Map the active locale's font onto the design-system variables.
        ["--font-sans" as string]: locale === "ar" ? "var(--font-plex-arabic)" : "var(--font-plex-sans)",
        ["--font-display" as string]: locale === "ar" ? "var(--font-plex-arabic)" : "var(--font-plex-sans)",
      }}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

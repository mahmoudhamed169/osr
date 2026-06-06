import { siteConfig } from "@/config/site";
import { apps } from "@/config/apps";
import type { Locale } from "@/i18n/routing";

/** Renders a JSON-LD script. Server-rendered, zero client cost. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is fully controlled by our config — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon.png`,
        sameAs: Object.values(siteConfig.social),
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          contactType: "customer support",
          availableLanguage: ["Arabic", "English"],
        },
      }}
    />
  );
}

export function WebsiteSchema({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: `${siteConfig.url}/${locale}`,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/${locale}?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

export function MobileAppSchema({ locale }: { locale: Locale }) {
  const published = apps.filter((a) => a.links.appStore || a.links.googlePlay);
  return (
    <>
      {published.map((app) => (
        <JsonLd
          key={app.id}
          data={{
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: app.name[locale],
            operatingSystem: "iOS, Android",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
            ...(app.rating && app.ratingCount
              ? {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: app.rating,
                    ratingCount: app.ratingCount,
                  },
                }
              : {}),
            ...(app.links.appStore ? { downloadUrl: app.links.appStore } : {}),
          }}
        />
      ))}
    </>
  );
}

export function BreadcrumbSchema({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}/${locale}${item.path}`,
        })),
      }}
    />
  );
}

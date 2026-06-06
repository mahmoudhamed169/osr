/**
 * Single source of truth for site-wide constants.
 * Swap these values once and they propagate through SEO, schema, and UI.
 */
export const siteConfig = {
  name: "OSR",
  legalName: "OSR Technologies",
  // Replace with the production domain before deploy.
  url: "https://osr.example",
  defaultLocale: "ar" as const,
  locales: ["ar", "en"] as const,
  twitter: "@osr",
  email: "hello@osr.example",
  phone: "+966500000000",
  social: {
    twitter: "https://twitter.com/osr",
    instagram: "https://instagram.com/osr",
    linkedin: "https://linkedin.com/company/osr",
  },
  // Used by Organization schema + Open Graph.
  ogImage: "/og.png",
  themeColor: "#F9B233",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Single source of truth for site-wide constants.
 * Swap these values once and they propagate through SEO, schema, and UI.
 */
export const siteConfig = {
  name: "OSR",
  legalName: "OSR Technologies",
  // Replace with the production domain before deploy.
  url: "https://osr.sa",
  defaultLocale: "ar" as const,
  locales: ["ar", "en"] as const,
  twitter: "@osr",
  email: "support@osr.sa",
  phone: "+966172211310",
  social: {
    instagram: "https://www.instagram.com/osr.ksa/",
    tiktok: "https://www.tiktok.com/@osr.ksa",
    snapchat: "https://www.snapchat.com/@osr.ksa",
    whatsapp: "https://wa.me/966172211310",
  },
  // Used by Organization schema + Open Graph.
  ogImage: "/og.png",
  themeColor: "#F9B233",
} as const;

export type SiteConfig = typeof siteConfig;

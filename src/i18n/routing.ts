import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  // Arabic is the primary market locale.
  defaultLocale: "ar",
  // Always prefix so /ar and /en are explicit, canonical SEO routes.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Narrow an unknown value to a supported locale. */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && (routing.locales as readonly string[]).includes(value);
}

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const localeLabel: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

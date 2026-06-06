import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

// English / Latin. next/font self-hosts, subsets, and emits zero layout shift.
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

// Arabic. Loaded only where needed via the body variable.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

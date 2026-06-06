import type { ReactNode } from "react";
import "./globals.css";

// The real <html>/<body> live in [locale]/layout so we can set lang + dir
// per locale. This root simply forwards children.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

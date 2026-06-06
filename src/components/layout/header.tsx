"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { key: "categories", href: "#categories" },
  { key: "ecosystem", href: "#ecosystem" },
  { key: "features", href: "#features" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "download", href: "#download" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-osr-ink/10 bg-osr-cream/85 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-osr-red focus:px-4 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <nav
        className="container flex h-16 items-center justify-between gap-4 lg:h-20"
        aria-label="Primary"
      >
        <Link href="/" aria-label="OSR home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-osr-ink/80 transition-colors hover:bg-osr-ink/5 hover:text-osr-ink"
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <a href="#contact">
            <Button variant="accent" size="sm">
              {t("cta")}
            </Button>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-osr-ink/15 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-osr-ink/10 bg-osr-cream lg:hidden"
        >
          <ul className="container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-osr-ink hover:bg-osr-ink/5"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-3 px-1">
              <LanguageSwitcher />
              <a href="#contact" className="flex-1" onClick={() => setOpen(false)}>
                <Button variant="accent" className="w-full">
                  {t("cta")}
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

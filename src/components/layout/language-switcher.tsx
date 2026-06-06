"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabel, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const other = routing.locales.find((l) => l !== locale)!;

  function switchTo(target: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: target });
    });
  }

  return (
    <button
      type="button"
      onClick={() => switchTo(other)}
      disabled={isPending}
      aria-label={`Switch language to ${localeLabel[other]}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-osr-ink/15 px-3.5 py-2 text-sm font-semibold text-osr-ink transition-colors hover:border-osr-orange hover:bg-osr-orange/5",
        className
      )}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span>{localeLabel[other]}</span>
    </button>
  );
}

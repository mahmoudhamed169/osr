import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-extrabold text-gradient">404</p>
      <p className="mt-4 text-muted-foreground">Page not found.</p>
      <Link href="/" className="mt-8">
        <Button variant="accent">{t("cta")}</Button>
      </Link>
    </div>
  );
}

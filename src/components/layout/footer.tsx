import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  const groups = [
    {
      title: t("product"),
      links: [
        { label: t("links.categories"), href: "#categories" },
        { label: t("links.ecosystem"), href: "#ecosystem" },
        { label: t("links.features"), href: "#features" },
        { label: t("links.products"), href: "#products" },
        { label: t("links.download"), href: "#download" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("links.about"), href: "#about" },
        { label: t("links.contact"), href: "#contact" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("links.privacy"), href: "#" },
        { label: t("links.terms"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-osr-ink/10 bg-osr-cream-2">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">{t("tagline")}</p>
            <div className="mt-6 flex gap-3">
              <a href={siteConfig.social.twitter} aria-label="Twitter" className="grid h-10 w-10 place-items-center rounded-full border border-osr-ink/15 text-osr-ink transition-colors hover:border-osr-orange hover:text-osr-orange-deep">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={siteConfig.social.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-osr-ink/15 text-osr-ink transition-colors hover:border-osr-orange hover:text-osr-orange-deep">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-osr-ink/15 text-osr-ink transition-colors hover:border-osr-orange hover:text-osr-orange-deep">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold text-osr-ink">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-osr-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-osr-ink/10 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {t("rights")}
          </p>
          <Link href="/" className="hover:text-osr-ink">
            {siteConfig.url.replace("https://", "")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

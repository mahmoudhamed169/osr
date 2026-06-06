import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  className,
  children,
  ariaLabel,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("scroll-mt-24 py-20 sm:py-28", className)}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      <span className="osr-eyebrow">{eyebrow}</span>
      <h2 className="osr-headline mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

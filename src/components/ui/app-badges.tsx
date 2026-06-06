import { cn } from "@/lib/utils";

function Badge({
  href,
  store,
  line1,
  line2,
}: {
  href?: string;
  store: "apple" | "google";
  line1: string;
  line2: string;
}) {
  const disabled = !href;
  const content = (
    <span
      className={cn(
        "group inline-flex h-[3.25rem] items-center gap-3 rounded-xl bg-osr-ink px-4 text-white transition-all",
        disabled ? "cursor-not-allowed opacity-40" : "hover:bg-black hover:shadow-lift"
      )}
    >
      <span className="shrink-0" aria-hidden="true">
        {store === "apple" ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
            <path d="M16.365 1.43c0 1.14-.42 2.2-1.26 3.06-.99 1.01-2.18 1.6-3.46 1.5-.06-1.14.46-2.32 1.27-3.13.9-.9 2.45-1.55 3.45-1.43zM20.5 17.1c-.62 1.42-.92 2.05-1.72 3.31-1.12 1.74-2.7 3.91-4.66 3.93-1.74.02-2.18-1.13-4.55-1.12-2.36.01-2.85 1.14-4.59 1.12-1.96-.02-3.46-1.98-4.58-3.72C-2.4 16.9-2.7 11.2-.5 8.07 1.05 5.86 3.5 4.5 5.78 4.5c2.32 0 3.78 1.26 5.69 1.26 1.85 0 2.98-1.27 5.66-1.27 2.04 0 4.2 1.11 5.74 3.03-5.05 2.77-4.23 9.98-2.07 11.58z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7">
            <path d="M3.6 1.5 13 11 3.6 20.5c-.4-.2-.6-.6-.6-1.1V2.6c0-.5.2-.9.6-1.1z" fill="#34A853" />
            <path d="M16.8 7.6 13 11 3.6 1.5c.4-.2.9-.2 1.4.1l11.8 6z" fill="#EA4335" />
            <path d="M16.8 14.4 5 20.4c-.5.3-1 .3-1.4.1L13 11z" fill="#FBBC04" />
            <path d="M20.6 9.7c.6.4.9.9.9 1.3s-.3.9-.9 1.3l-3.8 2.1L13 11l3.8-3.4z" fill="#4285F4" />
          </svg>
        )}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.625rem] uppercase tracking-wide opacity-80">{line1}</span>
        <span className="text-sm font-semibold">{line2}</span>
      </span>
    </span>
  );

  if (disabled) return content;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${line1} ${line2}`}>
      {content}
    </a>
  );
}

export function AppStoreButtons({
  appStore,
  googlePlay,
  appStoreLabel,
  googlePlayLabel,
  className,
}: {
  appStore?: string;
  googlePlay?: string;
  appStoreLabel: string;
  googlePlayLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Badge store="apple" href={appStore} line1="Download on the" line2="App Store" />
      <Badge store="google" href={googlePlay} line1="Get it on" line2="Google Play" />
    </div>
  );
}
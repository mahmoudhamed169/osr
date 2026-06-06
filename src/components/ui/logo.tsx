import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", className)} aria-label="OSR">
      {showWordmark ? (
        <Image
          src="/osr-logo-1.png"
          alt="OSR Logo"
          width={280}
          height={96}
          className="h-24 w-auto object-contain transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(200,16,46,0.6)] cursor-pointer"
          priority
        />
      ) : (
        <Image
          src="/osr-logo-1.png"
          alt="OSR"
          width={80}
          height={80}
          className="h-20 w-20 object-contain transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(200,16,46,0.6)] cursor-pointer"
          priority
        />
      )}
    </span>
  );
}
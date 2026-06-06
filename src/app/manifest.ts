import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.name,
    description: "One platform for connected service operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFBF3",
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

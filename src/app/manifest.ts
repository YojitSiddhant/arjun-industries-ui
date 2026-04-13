import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arjun Industries",
    short_name: "Arjun Industries",
    description:
      "Welding, metal fabrication, sheds, gates, grills, repair work, and farm equipment services in Bhopal.",
    start_url: getSiteUrl(),
    scope: getSiteUrl(),
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#0f766e",
    categories: ["business", "productivity"],
    lang: "en-IN",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

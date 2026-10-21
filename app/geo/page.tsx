import type { Metadata } from "next";
import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { AKNO_GEO_HTML } from "@/components/akno/akno-geo-html";

export const metadata: Metadata = {
  title: "GEO — visibilité IA | AKNO",
  description:
    "Optimisation pour les moteurs génératifs : être cité et recommandé par ChatGPT, Perplexity et les AI Overviews.",
  alternates: { canonical: "/geo" },
};

export default function GeoPage() {
  return <AknoSubPage html={AKNO_GEO_HTML} page="geo" />;
}

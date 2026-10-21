import type { Metadata } from "next";
import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { AKNO_SEO_PERF_HTML } from "@/components/akno/akno-site-seo-html";

export const metadata: Metadata = {
  title: "SEO & performance web à Annecy | AKNO",
  description:
    "Référencement naturel, Core Web Vitals et vitesse de chargement pour votre site à Annecy et en Haute-Savoie.",
  alternates: { canonical: "/seo-performance" },
};

export default function SeoPerformancePage() {
  return <AknoSubPage html={AKNO_SEO_PERF_HTML} page="seo-performance" />;
}

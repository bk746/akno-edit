import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { AKNO_SEO_PERF_HTML } from "@/components/akno/akno-site-seo-html";
import { aknoPageMetadata } from "@/lib/aknoMetadata";
import { servicePageJsonLd } from "@/lib/aknoStructuredData";

export const metadata = aknoPageMetadata({
  title: "SEO & performance à Annecy",
  description:
    "Audit technique, Core Web Vitals, contenu et SEO local : un site rapide, bien structuré et visible sur Google.",
  path: "/seo-performance",
});

export default function SeoPerformancePage() {
  return (
    <>
      <JsonLd data={servicePageJsonLd("seo-performance")} />
      <AknoSubPage html={AKNO_SEO_PERF_HTML} page="seo-performance" />
    </>
  );
}

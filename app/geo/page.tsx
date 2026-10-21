import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { AKNO_GEO_HTML } from "@/components/akno/akno-geo-html";
import { aknoPageMetadata } from "@/lib/aknoMetadata";
import { servicePageJsonLd } from "@/lib/aknoStructuredData";

export const metadata = aknoPageMetadata({
  title: "GEO : être cité par les IA",
  description:
    "Faites recommander votre entreprise par ChatGPT, Gemini, Perplexity et les AI Overviews de Google.",
  path: "/geo",
});

export default function GeoPage() {
  return (
    <>
      <JsonLd data={servicePageJsonLd("geo")} />
      <AknoSubPage html={AKNO_GEO_HTML} page="geo" />
    </>
  );
}

import { AknoEffects } from "@/components/akno/AknoEffects";
import { AKNO_HOME_HTML } from "@/components/akno/akno-home-html";
import { JsonLd } from "@/components/seo/JsonLd";
import { aknoPageMetadata } from "@/lib/aknoMetadata";
import { homeJsonLd } from "@/lib/aknoStructuredData";

export const metadata = aknoPageMetadata({
  title: "Akno — Studio web à Annecy | Sites, SEO & GEO",
  description:
    "Studio web à Annecy. Sites sur-mesure, SEO et visibilité dans les IA (GEO). Un seul interlocuteur, de la stratégie à la mise en ligne.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <div id="akno-root" dangerouslySetInnerHTML={{ __html: AKNO_HOME_HTML }} />
      <AknoEffects page="home" />
    </>
  );
}

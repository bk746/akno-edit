import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { AKNO_SITE_WEB_HTML } from "@/components/akno/akno-site-web-html";
import { aknoPageMetadata } from "@/lib/aknoMetadata";
import { servicePageJsonLd } from "@/lib/aknoStructuredData";

export const metadata = aknoPageMetadata({
  title: "Création de site web à Annecy",
  description:
    "Sites vitrines, e-commerce et refontes sur-mesure. Design soigné, code rapide, pensé pour convertir et être trouvé.",
  path: "/site-web",
});

export default function SiteWebPage() {
  return (
    <>
      <JsonLd data={servicePageJsonLd("site-web")} />
      <AknoSubPage html={AKNO_SITE_WEB_HTML} page="site-web" />
    </>
  );
}

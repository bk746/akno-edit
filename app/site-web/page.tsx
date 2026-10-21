import type { Metadata } from "next";
import { AknoSubPage } from "@/components/akno/AknoSubPage";
import { AKNO_SITE_WEB_HTML } from "@/components/akno/akno-site-web-html";

export const metadata: Metadata = {
  title: "Création de site web à Annecy | AKNO",
  description:
    "Site vitrine, landing ou e-commerce sur mesure à Annecy. Design, développement et mise en ligne avec un interlocuteur unique.",
  alternates: { canonical: "/site-web" },
};

export default function SiteWebPage() {
  return <AknoSubPage html={AKNO_SITE_WEB_HTML} page="site-web" />;
}

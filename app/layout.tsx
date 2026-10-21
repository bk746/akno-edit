import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://akno.fr";

export const metadata: Metadata = {
  title: "Studio web à Annecy | AKNO",
  description:
    "Studio web à Annecy & Haute-Savoie. Création de site, refonte, UI/UX et SEO : un interlocuteur du brief au livré. Appel de cadrage de 20 min, sans engagement.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/assets/img/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/img/icon-512.png" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "AKNO",
    title: "AKNO — Des sites que les IA recommandent",
    description:
      "Studio web à Annecy. Stratégie, UI/UX, code et SEO : un interlocuteur, du brief au livré.",
    url: siteUrl,
    images: [{ url: "/assets/img/og.webp" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#org`,
  name: "AKNO",
  alternateName: "AKNO — Studio web",
  description:
    "Studio web à Annecy : création de site sur mesure, refonte, UI/UX design, SEO et performance.",
  url: siteUrl,
  image: `${siteUrl}/assets/img/og.webp`,
  logo: `${siteUrl}/assets/img/icon-512.png`,
  telephone: "+33781990761",
  email: "aknoweb.contact@gmail.com",
  founder: {
    "@type": "Person",
    name: "Keryan Bouzerda",
    jobTitle: "Fondateur",
  },
  areaServed: [
    { "@type": "City", name: "Annecy" },
    { "@type": "AdministrativeArea", name: "Haute-Savoie" },
  ],
  knowsAbout: [
    "Création de site web",
    "Refonte de site",
    "UI/UX design",
    "SEO",
    "Performance web",
  ],
};

const introHeadScript = `try{if(!sessionStorage.getItem('akno-intro'))document.documentElement.classList.add('intro')}catch(e){}`;
const introCriticalCss =
  "#intro{display:none}.intro #intro{display:block;position:fixed;inset:0;z-index:300}.intro #intro .ibg{position:absolute;inset:0;background:#000}.intro,.intro body{overflow:hidden}.intro .nav .logo{opacity:0}.intro .ilogo{opacity:0}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: introHeadScript }}
        />
        <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

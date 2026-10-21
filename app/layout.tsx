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
    title: "AKNO — Des sites qui ramènent des clients",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

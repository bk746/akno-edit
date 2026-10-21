import serviceGraphs from "./aknoStructuredData.service.json";

export const SITE_URL = "https://akno.fr";
const ORG_ID = `${SITE_URL}/#org`;

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: "Akno",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      telephone: "+33781990761",
      email: "aknoweb.contact@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Annecy",
        addressCountry: "FR",
      },
      areaServed: [
        { "@type": "City", name: "Annecy" },
        { "@type": "AdministrativeArea", name: "Haute-Savoie" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Akno",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export function servicePageJsonLd(page: "site-web" | "seo-performance" | "geo") {
  return serviceGraphs[page];
}

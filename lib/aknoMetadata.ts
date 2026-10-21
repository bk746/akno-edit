import type { Metadata } from "next";

export const SITE_URL = "https://akno.fr";

type PageMetaInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  absoluteTitle?: boolean;
  index?: boolean;
};

export function aknoPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  index = true,
}: PageMetaInput): Metadata {
  const pageUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogTitle = absoluteTitle ? title : title;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: pageUrl,
      type: "website",
      locale: "fr_FR",
      siteName: "Akno",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: index ? { index: true, follow: true } : undefined,
  };
}

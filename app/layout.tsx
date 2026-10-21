import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/aknoMetadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Akno",
    default: "Akno — Studio web à Annecy | Sites, SEO & GEO",
  },
  description:
    "Studio web à Annecy. Sites sur-mesure, SEO et visibilité dans les IA (GEO). Un seul interlocuteur, de la stratégie à la mise en ligne.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Akno",
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

const introHeadScript = `try{if(!sessionStorage.getItem('akno-intro')&&!matchMedia('(max-width:759px)').matches)document.documentElement.classList.add('intro')}catch(e){}`;
const introCriticalCss =
  "#intro{display:none}.intro #intro{display:block;position:fixed;inset:0;z-index:300}.intro #intro .ibg{position:absolute;inset:0;background:#000}.intro,.intro body{overflow:hidden}.intro .nav .logo{opacity:0}.intro .ilogo{opacity:0}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introHeadScript }} />
        <link
          rel="preload"
          as="image"
          href="/assets/img/wall/c-lacets-1-280.webp"
          media="(max-width:759px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/img/wall/c-sublimessence-1-280.webp"
          media="(max-width:759px)"
        />
        <link
          rel="preload"
          href="/assets/fonts/mona-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: introCriticalCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

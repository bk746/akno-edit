"use client";

import { useAknoEffects } from "./useAknoEffects";

type Props = {
  html: string;
  page: "site-web" | "seo-performance" | "geo";
};

function AknoEffects({ page }: { page: Props["page"] }) {
  useAknoEffects({ page });
  return null;
}

export function AknoSubPage({ html, page }: Props) {
  return (
    <>
      <AknoEffects page={page} />
      <div id="akno-root" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}

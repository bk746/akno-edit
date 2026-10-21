"use client";

import { AKNO_HOME_HTML } from "./akno-home-html";
import { useAknoEffects } from "./useAknoEffects";

function AknoEffects() {
  useAknoEffects({ page: "home" });
  return null;
}

export function AknoSite() {
  return (
    <>
      <AknoEffects />
      <div id="akno-root" dangerouslySetInnerHTML={{ __html: AKNO_HOME_HTML }} />
    </>
  );
}

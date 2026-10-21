import { AknoEffects } from "./AknoEffects";
import { AKNO_HOME_HTML } from "./akno-home-html";

export function AknoSite() {
  return (
    <>
      <AknoEffects page="home" />
      <div id="akno-root" dangerouslySetInnerHTML={{ __html: AKNO_HOME_HTML }} />
    </>
  );
}

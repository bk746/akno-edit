import { AKNO_HERO_WALL_IMG } from "./aknoHeroWallImg";

/** Static mobile hero wall markup (4×5) for early LCP; desktop rebuilds in JS. */
export function aknoMobileWallInnerHtml(): string {
  const W = 150;
  const H = W * 0.75;
  const G = 12;
  const cols = 4;
  const rows = 5;
  const TW = cols * (W + G);
  const TH = rows * (H + G);
  let h = "";
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const n = AKNO_HERO_WALL_IMG.length;
      const q = (((i * 3 + j * 5) % n) + n) % n;
      const f = AKNO_HERO_WALL_IMG[q][1];
      const im = f === "VIDEO" ? "c-veillee-1" : f;
      const x = (((i * (W + G)) % TW) + TW) % TW - TW / 2;
      const y = (((j * (H + G)) % TH) + TH) % TH - TH / 2;
      h += `<div class="card" style="width:${W}px;height:${H}px;margin-left:${-W / 2}px;margin-top:${-H / 2}px;transform:translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)"><div class="in"><img fetchpriority="high" src="/assets/img/wall/${im}-280.webp" srcset="/assets/img/wall/${im}-280.webp 280w, /assets/img/wall/${im}.webp 560w" sizes="150px" width="560" height="420" alt="" draggable="false" decoding="async"></div></div>`;
    }
  }
  return h;
}

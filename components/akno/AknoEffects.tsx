"use client";

import { useAknoEffects } from "./useAknoEffects";

type Page = "home" | "site-web" | "seo-performance" | "geo" | "legal";

export function AknoEffects({ page }: { page: Page }) {
  useAknoEffects({ page });
  return null;
}

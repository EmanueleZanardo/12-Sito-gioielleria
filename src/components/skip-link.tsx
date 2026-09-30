"use client";

import { useTranslation } from "@/hooks/use-translation";

/**
 * "Skip to main content" link: visually hidden until it receives keyboard
 * focus, improving navigation for keyboard and screen-reader users.
 */
export function SkipLink() {
  const { t } = useTranslation("common");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none"
    >
      {t("nav.skipToContent")}
    </a>
  );
}

"use client";

import { useLocale } from "./useLocale";

type Locale = "en-US" | "pt-BR" | "es";

const messages: Record<Locale, any> = {
  "en-US": require("../../locales/en-US.json"),
  "pt-BR": require("../../locales/pt-BR.json"),
  "es": require("../../locales/es.json"),
};

export function useI18n() {
  const locale = useLocale();

  function t(key: string, defaultValue: string = ""): string {
    const keys = key.split(".");
    let value = messages[locale as Locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || defaultValue || key;
  }

  return { t, locale };
}

"use client";

import { useEffect, useState } from "react";

type Locale = "en-US" | "pt-BR" | "es";

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>("en-US");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("arkka_locale") as Locale;
      if (saved && ["en-US", "pt-BR", "es"].includes(saved)) {
        setLocale(saved);
      } else {
        const browserLang = navigator.language.slice(0, 2);
        const mapped: Locale = 
          browserLang === "pt" ? "pt-BR" : 
          browserLang === "es" ? "es" : 
          "en-US";
        setLocale(mapped);
        localStorage.setItem("arkka_locale", mapped);
      }
    } catch {
      setLocale("en-US");
    }
  }, []);

  return locale;
}

export function useI18n() {
  const locale = useLocale();
  
  const t = (key: string, defaultValue: string = key) => {
    try {
      const messages = require(`../../locales/${locale}.json`);
      const keys = key.split(".");
      let value: any = messages;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || defaultValue;
    } catch {
      return defaultValue;
    }
  };

  return { locale, t };
}

export default useI18n;

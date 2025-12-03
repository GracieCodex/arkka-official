"use client";

import { Button, Highlight } from "../button";
import { Hero, HeroTitle, HeroSubtitle } from "../hero";
import { HeroImage } from "../hero-image";
import InteractiveDashboard from "../interactive-dashboard";
import { ChevronIcon } from "../icons/chevron";
import { useI18n } from "../../lib/hooks/useI18n";

export const HomepageHero = () => {
  const { t } = useI18n();

  return (
    <Hero>
      <Button
        className="translate-y-[-1rem] animate-fade-in opacity-0"
        href="/"
        variant="secondary"
        size="small"
      >
        <span>{t("hero.badge")}</span> <Highlight>→</Highlight>
      </Button>
      <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        {t("hero.title")}
      </HeroTitle>
      <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        {t("hero.subtitle")}
      </HeroSubtitle>
      <Button
        className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]"
        href="/"
        variant="primary"
        size="large"
      >
        <span>{t("hero.cta")} </span>
        <Highlight>
          <ChevronIcon />
        </Highlight>
      </Button>
      <HeroImage />
      <InteractiveDashboard />
    </Hero>
  );
};

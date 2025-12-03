"use client";

import React from "react";
import classNames from "classnames";
import * as Logos from "./logos";

const LOGOS = [
  "vercel",
  "arc",
  "cashapp",
  "descript",
  "loom",
  "mercury",
  "opensea",
  "pitch",
  "ramp",
  "raycast",
  "retool",
];

export function LogoTicker() {
  return (
    <section className="my-12">
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-8 whitespace-nowrap py-4">
          {[...LOGOS, ...LOGOS].map((name, idx) => {
            const Comp = (Logos as any)[name.charAt(0).toUpperCase() + name.slice(1)] || Logos.Vercel;
            return (
              <div key={idx} className="inline-flex items-center opacity-60 transition-opacity hover:opacity-100">
                <div className="h-8 w-28 text-white">
                  <Comp />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LogoTicker;

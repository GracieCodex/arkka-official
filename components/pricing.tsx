"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  { id: "starter", title: "Starter", priceMonthly: 9 },
  { id: "growth", title: "Growth", priceMonthly: 29, featured: true },
  { id: "enterprise", title: "Enterprise", priceMonthly: 99 },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="my-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-semibold">Pricing that scales with you</h3>
          <p className="text-gray-300 mt-2">Simple predictable pricing — upgrade as your team grows.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">Monthly</span>
          <button
            aria-pressed={annual}
            onClick={() => setAnnual(!annual)}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-white/6 p-1"
          >
            <motion.span
              layout
              className="h-5 w-5 rounded-full bg-white"
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              style={{ transform: annual ? "translateX(28px)" : "translateX(0)" }}
            />
          </button>
          <span className="text-sm text-gray-300">Yearly</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = annual ? Math.round(p.priceMonthly * 12 * 0.8) : p.priceMonthly;
          return (
            <article
              key={p.id}
              className={`rounded-xl border p-6 ${p.featured ? "border-gradient" : "border-white/6"} bg-white/3`}
            >
              {p.featured && <div className="-mx-6 mt-[-1rem] mb-4 rounded-t-xl bg-gradient-to-r from-indigo-500 to-violet-600 p-3 text-center font-semibold">Most popular</div>}
              <h4 className="text-xl font-semibold">{p.title}</h4>
              <div className="mt-2 text-3xl font-bold">${price}{annual ? "/yr" : "/mo"}</div>
              <p className="mt-3 text-sm text-gray-300">Includes core features and priority support.</p>
              <div className="mt-6">
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-white">Choose</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Pricing;

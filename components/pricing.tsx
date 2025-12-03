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
            <motion.article
              key={p.id}
              whileHover={{ y: -4 }}
              className={`rounded-2xl glass-effect p-6 transition-all-smooth ${
                p.featured ? "border-indigo-500/50 bg-gradient-to-br from-indigo-500/10 to-violet-600/5 relative" : "border-white/8"
              }`}
            >
              {p.featured && (
                <>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none" 
                       style={{
                         background: "radial-gradient(600px circle at center, rgba(124,58,237,0.15), transparent 80%)"
                       }} />
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-1 rounded-full text-xs font-semibold">Most popular</div>
                </>
              )}
              <div className="relative z-10">
                <h4 className="text-xl font-semibold mt-3">{p.title}</h4>
                <div className="mt-2 text-3xl font-bold">${price}{annual ? "/yr" : "/mo"}</div>
                <p className="mt-3 text-sm text-gray-300">Includes core features and priority support.</p>
                <div className="mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-lg px-4 py-2 text-white font-medium transition-all-smooth ${
                      p.featured ? "bg-gradient-to-r from-indigo-600 to-violet-600" : "bg-white/10 hover:bg-white/20"
                    }`}>
                    Choose
                  </motion.button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Pricing;

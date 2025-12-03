"use client";

import { motion } from "framer-motion";
import React, { useCallback, useRef } from "react";

const services = [
  { title: "Web Engine", desc: "Fast static and dynamic sites" },
  { title: "Workspace", desc: "Teams, projects and sprints unified" },
  { title: "AI Agents", desc: "Automations and copilots for product" },
  { title: "Integrations", desc: "Connect tools and pipelines" },
  { title: "Design System", desc: "Scalable UI primitives" },
  { title: "Analytics", desc: "Live metrics and insights" },
];

export function BentoGrid() {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }, []);

  return (
    <section className="my-12">
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-semibold">What Arkka OS offers</h3>
        <p className="text-gray-300 mt-2">Modular building blocks to ship faster with AI-powered workflows.</p>
      </div>

      <div
        ref={ref}
        onMouseMove={handleMove}
        className="relative grid gap-6 md:grid-cols-3 p-6 rounded-2xl"
        style={{
          background: "radial-gradient(800px circle at var(--mx,50%) var(--my,50%), rgba(124,58,237,0.08), transparent 25%)",
        }}
      >
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08 }}
            className="relative overflow-hidden rounded-xl border border-white/6 bg-white/3 p-6 backdrop-blur-md"
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <h4 className="mb-2 text-lg font-medium">{s.title}</h4>
            <p className="text-sm text-gray-300">{s.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="rounded px-2 py-1 bg-white/6">Try demo</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default BentoGrid;

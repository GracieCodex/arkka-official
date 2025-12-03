"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function InteractiveDashboard() {
  const [issues, setIssues] = useState(0);
  const [active, setActive] = useState(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let raf: any;
    const start = Date.now();
    const duration = 1200;
    const target = { issues: 1248, active: 42, velocity: 1.7 };

    function frame() {
      const t = Math.min(1, (Date.now() - start) / duration);
      setIssues(Math.floor(target.issues * t));
      setActive(Math.floor(target.active * t));
      setVelocity(Math.round(target.velocity * t * 10) / 10);
      if (t < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 w-full max-w-[48rem] rounded-2xl glass-effect-strong p-6 glow-subtle"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300">Open issues</div>
          <div className="text-3xl font-semibold">{issues.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-300">Active sprints</div>
          <div className="text-2xl font-medium">{active}</div>
        </div>
        <div>
          <div className="text-sm text-gray-300">Velocity</div>
          <div className="text-2xl font-medium">{velocity}</div>
        </div>
      </div>
      <div className="mt-4 h-28 w-full rounded-md bg-gradient-to-b from-white/2 to-transparent p-3">
        <div className="flex h-full items-end gap-2">
          {[80, 56, 74, 92, 68, 50, 86].map((v, i) => (
            <div key={i} className="flex-1">
              <div
                style={{ height: `${v}%` }}
                className="w-full rounded-md bg-gradient-to-t from-indigo-500 to-violet-400 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default InteractiveDashboard;

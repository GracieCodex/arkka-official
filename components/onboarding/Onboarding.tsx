"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "What are you building?" },
  { id: 2, title: "Team size" },
  { id: 3, title: "Main goal" },
];

export function Onboarding() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  function next() {
    setIndex((i) => Math.min(steps.length - 1, i + 1));
  }
  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }

  return (
    <section className="my-12 p-6">
      <div className="max-w-2xl">
        <div className="mb-4 text-sm text-gray-300">Step {index + 1} of {steps.length}</div>
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <h4 className="text-2xl font-semibold">{steps[index].title}</h4>
          <div className="mt-4">
            <input
              placeholder="Type your answer..."
              className="w-full rounded-md border border-white/8 bg-transparent px-3 py-2"
              onChange={(e) => setAnswers({ ...answers, [steps[index].id]: e.target.value })}
            />
          </div>
        </motion.div>
        <div className="mt-4 flex gap-3">
          <button onClick={prev} disabled={index === 0} className="rounded px-3 py-2 bg-white/6">Back</button>
          <button onClick={next} className="rounded bg-indigo-600 px-3 py-2 text-white">{index === steps.length - 1 ? "Finish" : "Next"}</button>
        </div>
      </div>
    </section>
  );
}

export default Onboarding;

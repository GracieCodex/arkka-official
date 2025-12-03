"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: 1, title: "What are you building?", placeholder: "e.g., a SaaS platform, e-commerce store, agency website...", question: true },
  { id: 2, title: "How many people on your team?", placeholder: "e.g., solo founder, 5 people, 50+...", question: true },
  { id: 3, title: "What's your main goal?", placeholder: "e.g., launch MVP, scale to 10k users, improve SEO...", question: true },
];

export function Onboarding() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [input, setInput] = useState("");

  function next() {
    if (index < steps.length - 1) {
      setAnswers({ ...answers, [steps[index].id]: input });
      setInput("");
      setIndex((i) => Math.min(steps.length - 1, i + 1));
    } else {
      // Final step: submit
      const final = { ...answers, [steps[index].id]: input };
      console.log("Onboarding complete:", final);
      alert("Thanks! We'll follow up soon with your personalized setup plan.");
      setIndex(0);
      setAnswers({});
      setInput("");
    }
  }

  function prev() {
    if (index > 0) {
      setInput(answers[steps[index].id] || "");
      setIndex((i) => Math.max(0, i - 1));
    }
  }

  const step = steps[index];

  return (
    <section className="my-12 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <div className="text-sm text-gray-300">Step {index + 1} of {steps.length}</div>
          <div className="mt-1 h-1 w-full bg-white/6 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((index + 1) / steps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600"
            />
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-8 glow-subtle">
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 mb-4">Help us understand your needs so we can tailor your experience.</p>
              <input
                autoFocus
                placeholder={step.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                className="w-full rounded-lg glass-effect px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all-smooth"
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={prev} 
              disabled={index === 0} 
              className="rounded-lg px-4 py-2 bg-white/6 text-white disabled:opacity-40 transition-all-smooth hover:bg-white/10"
            >
              Back
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={next} 
              className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-white font-medium transition-all-smooth hover:shadow-lg hover:shadow-indigo-500/30"
            >
              {index === steps.length - 1 ? "Get Started" : "Next"}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Onboarding;

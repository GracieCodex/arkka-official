"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSpeech from "../lib/hooks/useSpeech";

export function FloatingAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem("arkka_ai_messages");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const sendingRef = useRef(false);
  const { listening, transcript, start, stop, setTranscript } = useSpeech();

  useEffect(() => {
    try {
      localStorage.setItem("arkka_ai_messages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  async function sendPrompt(prompt: string) {
    if (!prompt || sendingRef.current) return;
    sendingRef.current = true;
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    try {
      // optimistic assistant placeholder
      setMessages((m) => [...m, { role: "assistant", text: "..." }]);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data?.text || data?.message || "(no response)";

      setMessages((m) => {
        const copy = [...m];
        const lastIdx = copy.map((x) => x.role).lastIndexOf("assistant");
        if (lastIdx >= 0 && copy[lastIdx].text === "...") copy[lastIdx] = { role: "assistant", text };
        else copy.push({ role: "assistant", text });
        return copy;
      });

      // optional speech synthesis
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: "Error connecting to AI" }]);
    } finally {
      sendingRef.current = false;
      setInputValue("");
    }
  }

  // When transcript completes (user stopped speaking), auto-fill and send
  useEffect(() => {
    if (!listening && transcript && transcript.trim().length > 0) {
      const txt = transcript.trim();
      setInputValue(txt);
      sendPrompt(txt);
      setTranscript("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  return (
    <div aria-live="polite">
      <div className="fixed right-6 bottom-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="w-[22rem] max-w-[90vw] rounded-2xl glass-effect-strong p-4 shadow-primary"
            >
              <div className="flex items-center justify-between">
                <strong className="text-white">Arkka AI Concierge</strong>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="text-sm opacity-60 transition-opacity hover:opacity-100"
                >
                  ✕
                </button>
              </div>
              <div className="mt-3 h-40 overflow-auto text-sm">
                {messages.length === 0 && (
                  <div className="text-gray-300">Ask me to build a website, or say a prompt.</div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "text-right text-white" : "text-left text-gray-200"}>
                    <div className="inline-block rounded-md px-2 py-1 mt-2 bg-white/6">{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  placeholder="Try: Build me a website for a law firm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 rounded-md bg-transparent border border-white/8 px-3 py-2 text-sm text-white outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = inputValue.trim();
                      setInputValue("");
                      sendPrompt(val);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (!listening) start();
                    else stop();
                  }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white"
                >
                  {listening ? "Stop" : "Speak"}
                </button>
              </div>
              {transcript && (
                <div className="mt-2 text-xs text-gray-300">Heard: {transcript}</div>
              )}
              <div className="mt-3 text-right">
                <button
                  onClick={() => sendPrompt(transcript || "Hello")}
                  className="rounded-md bg-white/8 px-3 py-1 text-sm"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((o) => !o)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-lg"
        >
          🤖
        </motion.button>
      </div>
    </div>
  );
}

export default FloatingAI;

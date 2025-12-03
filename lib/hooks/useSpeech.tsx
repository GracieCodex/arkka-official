"use client";

import { useEffect, useRef, useState } from "react";

type Transcript = {
  text: string;
  interim: boolean;
};

export function useSpeech() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const r = new SpeechRecognition();
    r.lang = "en-US";
    r.interimResults = true;
    r.onresult = (ev: any) => {
      let final = "";
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; ++i) {
        const res = ev.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      setTranscript((prev) => (final ? prev + " " + final : prev));
    };
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
    return () => {
      try {
        r.stop();
      } catch {}
    };
  }, []);

  function start() {
    const r = recognitionRef.current;
    if (!r) return;
    try {
      r.start();
      setListening(true);
    } catch (e) {
      // already started
    }
  }

  function stop() {
    const r = recognitionRef.current;
    if (!r) return;
    try {
      r.stop();
      setListening(false);
    } catch {}
  }

  return { listening, transcript, start, stop, setTranscript };
}

export default useSpeech;

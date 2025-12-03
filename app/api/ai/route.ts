import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body?.prompt || "";

    // Primary: use OpenAI REST if OPENAI_API_KEY is set.
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 800,
        }),
      });
      const j = await r.json();
      const text = j?.choices?.[0]?.message?.content || JSON.stringify(j);
      return NextResponse.json({ text });
    }

    // If no provider configured, return helpful message so the frontend stays functional.
    return NextResponse.json({ text: "No AI provider configured. Set OPENAI_API_KEY to enable AI responses." });
  } catch (err) {
    return NextResponse.json({ text: "Error processing request" }, { status: 500 });
  }
}

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

function systemPrompt(locale: string | undefined) {
  const lang = locale?.startsWith("id") ? "id-ID" : "en-US";
  if (lang === "id-ID") {
    return "Anda adalah asisten suara untuk aplikasi JobIn. Bantu pengguna tunanetra menavigasi aplikasi, menjawab pertanyaan singkat, dan arahkan ke halaman website. Jawab singkat dan jelas.";
  }
  return "You are a voice assistant for the JobIn app. Help blind users navigate the app, answer brief questions, and direct them to pages like jobs, classes, profile, payments. Keep responses brief and clear.";
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { prompt, locale } = await req.json();
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
  }
  try {
    const apiKey = process.env.GROQ_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY missing in environment" }, { status: 500 });
    }

    const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
    const client = new Groq({ apiKey });

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt(locale) },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    const text = response.choices?.[0]?.message?.content || "";
    return NextResponse.json({ text }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch GPT response", details: error?.message || String(error) }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

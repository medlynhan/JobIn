import { NextRequest, NextResponse } from "next/server";
import { AzureOpenAI } from "openai";

function systemPrompt(locale: string | undefined) {
  const lang = locale?.startsWith("id") ? "id-ID" : "en-US";
  if (lang === "id-ID") {
    return "Anda adalah asisten suara untuk aplikasi JobIn. Bantu pengguna tunanetra menavigasi aplikasi, menjawab pertanyaan singkat, dan arahkan ke halaman seperti pekerjaan, kelas, profil, pembayaran. Jawab singkat dan jelas.";
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

  const endpoint = (process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT || "").replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY || "";
  const deployment = process.env.NEXT_PUBLIC_AZURE_OPENAI_DEPLOYMENT || "";

  if (!endpoint || !apiKey || !deployment) {
    return NextResponse.json({
      error: "Azure OpenAI configuration missing. Set NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT, NEXT_PUBLIC_AZURE_OPENAI_KEY, and NEXT_PUBLIC_AZURE_OPENAI_DEPLOYMENT in .env.",
    }, { status: 500 });
  }

  try {
    const client = new AzureOpenAI({ endpoint, apiKey, deployment, apiVersion: "2023-07-01-preview" });

    const response = await client.chat.completions.create({
      model: deployment,
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

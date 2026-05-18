import { NextResponse } from "next/server";
import { buildWebsiteAiPublicUrl, parseJsonSafe } from "../_shared";

interface SendMessageBody {
  session_id?: string;
  text?: string;
}

export async function POST(request: Request) {
  let body: SendMessageBody = {};

  try {
    body = (await request.json()) as SendMessageBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.session_id || !body.text) {
    return NextResponse.json({ error: "session_id and text are required" }, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(buildWebsiteAiPublicUrl("/cognilabsai/public/website/send-message"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: body.session_id, text: body.text }),
      cache: "no-store",
    });

    const data = await parseJsonSafe(upstreamResponse);
    if (!upstreamResponse.ok) {
      const detail =
        data && typeof data === "object" && "detail" in data
          ? String((data as { detail?: unknown }).detail)
          : null;
      const errorMessage =
        data && typeof data === "object" && "error" in data
          ? String((data as { error?: unknown }).error)
          : null;

      return NextResponse.json(
        {
          error: detail || errorMessage || "Failed to send website chat message",
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Website chat service unavailable" }, { status: 502 });
  }
}

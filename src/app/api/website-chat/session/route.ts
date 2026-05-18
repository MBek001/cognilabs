import { NextResponse } from "next/server";
import { buildWebsiteAiPublicUrl, parseJsonSafe } from "../_shared";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  try {
    const upstreamResponse = await fetch(buildWebsiteAiPublicUrl("/cognilabsai/public/website/session"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await parseJsonSafe(upstreamResponse);
    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error:
            data && typeof data === "object" && "detail" in data
              ? String((data as { detail?: unknown }).detail)
              : "Failed to open website chat session",
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Website chat service unavailable" }, { status: 502 });
  }
}

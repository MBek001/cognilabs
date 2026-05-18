import { NextResponse } from "next/server";
import { buildWebsiteAiPublicUrl, parseJsonSafe } from "../_shared";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const upstreamUrl = new URL(buildWebsiteAiPublicUrl("/cognilabsai/public/website/messages"));
    upstreamUrl.searchParams.set("session_id", sessionId);

    const upstreamResponse = await fetch(upstreamUrl.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const data = await parseJsonSafe(upstreamResponse);
    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error:
            data && typeof data === "object" && "detail" in data
              ? String((data as { detail?: unknown }).detail)
              : "Failed to fetch website chat messages",
        },
        { status: upstreamResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Website chat service unavailable" }, { status: 502 });
  }
}

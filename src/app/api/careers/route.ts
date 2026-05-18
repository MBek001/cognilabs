import { NextResponse } from "next/server";

interface CareerPayload {
  fullName: string;
  age: number;
  position: string;
  phone: string;
  message: string;
  username: string;
  file: File | null;
}

function escapeMarkdown(text: string) {
  if (!text) return "\\-";
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function getRequiredString(value: FormDataEntryValue | null, key: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing field: ${key}`);
  }
  return value.trim();
}

function parsePayload(formData: FormData): CareerPayload {
  const fullName = getRequiredString(formData.get("fullName"), "fullName");
  const position = getRequiredString(formData.get("position"), "position");
  const phone = getRequiredString(formData.get("phone"), "phone");
  const username = getRequiredString(formData.get("username"), "username");
  const ageRaw = getRequiredString(formData.get("age"), "age");
  const age = Number(ageRaw);

  if (!Number.isFinite(age) || age <= 0) {
    throw new Error("Invalid field: age");
  }

  const messageValue = formData.get("message");
  const message = typeof messageValue === "string" ? messageValue.trim() : "";
  const fileValue = formData.get("file");
  const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

  return {
    fullName,
    age,
    position,
    phone,
    message,
    username,
    file,
  };
}

function buildTelegramText(data: CareerPayload): string {
  return `
🟦 Yangi career so'rov:
👤 Ism: ${escapeMarkdown(data.fullName)}
🔢 Yosh: ${escapeMarkdown(String(data.age))}
💼 Lavozim: ${escapeMarkdown(data.position)}
👤 Telegram Username: ${escapeMarkdown(data.username)}
📞 Telefon: ${escapeMarkdown(data.phone)}
💬 Xabar: ${escapeMarkdown(data.message)}
`.trim();
}

async function sendMessageToChat(botToken: string, chatId: string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const description =
      typeof errorData === "object" && errorData && "description" in errorData
        ? String(errorData.description)
        : response.status;
    throw new Error(`Telegram message error: ${description}`);
  }
}

async function sendFileToChat(botToken: string, chatId: string, file: File, caption: string) {
  const upload = new FormData();
  upload.append("chat_id", chatId);
  upload.append("document", file, file.name || "resume");
  upload.append("caption", caption);

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: "POST",
    body: upload,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const description =
      typeof errorData === "object" && errorData && "description" in errorData
        ? String(errorData.description)
        : response.status;
    throw new Error(`Telegram file error: ${description}`);
  }
}

export async function POST(request: Request) {
  const botToken =
    process.env.COGNILABS_CAREERS_BOTID ||
    process.env.CAREERS_BOT_TOKEN ||
    process.env.LEAD_BOT_TOKEN ||
    process.env.NEXT_PUBLIC_LEAD_BOT_TOKEN;
  const chatId =
    process.env.NEXT_PUBLIC_CAREERS_CHAT_ID ||
    process.env.CAREERS_CHAT_ID ||
    process.env.ADMIN_ID1;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Server telegram configuration is missing" }, { status: 500 });
  }

  let payload: CareerPayload;

  try {
    const formData = await request.formData();
    payload = parsePayload(formData);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid form data",
      },
      { status: 400 }
    );
  }

  const text = buildTelegramText(payload);
  const caption = `CV: ${payload.fullName} (${payload.position})`;

  try {
    await sendMessageToChat(botToken, chatId, text);
    if (payload.file) {
      await sendFileToChat(botToken, chatId, payload.file, caption);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Telegram send failed" },
      { status: 502 }
    );
  }
}

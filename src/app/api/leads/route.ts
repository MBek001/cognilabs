import { NextResponse } from "next/server";

interface LeadRequestBody {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  message: string;
  budget: string;
  locale: string;
}

type ConversationLanguage = "en" | "uz" | "ru";

interface CrmCustomerPayload {
  assistant_name: string;
  conversation_language: ConversationLanguage;
  full_name: string;
  notes: string;
  phone_number: string;
  platform: string;
  status: "need_to_call";
  username: string;
}

const CRM_CUSTOMERS_API_URL = "https://api.project.cims.cognilabs.org/crm/api/customers";
const CRM_CUSTOMER_API_KEY = process.env.CRM_CUSTOMER_API_KEY || "salomat";

function normalizeConversationLanguage(locale: string): ConversationLanguage {
  if (locale === "uz" || locale === "ru") {
    return locale;
  }

  return "en";
}

function buildTelegramText(data: LeadRequestBody): string {
  return `
Yangi lead keldi:
Ism: ${data.name}
Telefon: ${data.phone}
Email: ${data.email}
Telegram: ${data.telegram}
Budjet: ${data.budget}
Xabar: ${data.message}
`.trim();
}

function resolveCrmUsername(data: LeadRequestBody): string {
  const telegram = data.telegram?.trim();
  if (telegram) return telegram;

  const email = data.email?.trim();
  if (email) return email;

  const phone = data.phone?.trim();
  if (phone) return phone;

  return data.name.trim();
}

export async function POST(request: Request) {
  let body: LeadRequestBody;

  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const crmPayload: CrmCustomerPayload = {
    assistant_name: "Website",
    conversation_language: normalizeConversationLanguage(body.locale),
    full_name: body.name,
    notes: `${body.message}; Budget: ${body.budget}`,
    phone_number: body.phone,
    platform: "Website",
    status: "need_to_call",
    username: resolveCrmUsername(body),
  };

  const botToken = process.env.LEAD_BOT_TOKEN || process.env.NEXT_PUBLIC_LEAD_BOT_TOKEN;
  const channelId = process.env.LEAD_CHANNEL_ID || process.env.NEXT_PUBLIC_LEAD_CHANNEL_ID;

  try {
    const [crmResponse, telegramResponse] = await Promise.all([
      fetch(CRM_CUSTOMERS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Key": CRM_CUSTOMER_API_KEY,
        },
        body: JSON.stringify(crmPayload),
      }),
      botToken && channelId
        ? fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: channelId,
              text: buildTelegramText(body),
              parse_mode: "Markdown",
            }),
          })
        : Promise.resolve(null),
    ]);

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text().catch(() => "");
      return NextResponse.json(
        { error: `CRM xatosi: ${crmResponse.status}${errorText ? ` - ${errorText}` : ""}` },
        { status: 502 }
      );
    }

    if (!botToken || !channelId) {
      return NextResponse.json(
        { error: "Telegram bot token yoki kanal ID topilmadi!" },
        { status: 500 }
      );
    }

    if (!telegramResponse || !telegramResponse.ok) {
      const errorData = telegramResponse
        ? await telegramResponse.json().catch(() => ({}))
        : {};
      const telegramStatus = telegramResponse?.status ?? 500;
      const description =
        typeof errorData === "object" && errorData && "description" in errorData
          ? String(errorData.description)
          : telegramStatus;
      return NextResponse.json({ error: `Telegram xatosi: ${description}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Leadni yuborishda xatolik:", error);
    return NextResponse.json({ error: "Lead yuborishda xatolik yuz berdi" }, { status: 500 });
  }
}

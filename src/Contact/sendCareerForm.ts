import { errorToast, successToast } from "./response-toasts";

interface CareerFormData {
  fullName: string;
  age: number;
  position: string;
  phone: string;
  message: string;
  file: File | null;
}

// Markdown escape
function escapeMarkdown(text: string) {
  if (!text) return "-";
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function sendCareerFormToAdmin(data: CareerFormData) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_COGNILABS_CAREERS_CAREERS_BOTID;
  const CHAT_ID = process.env.NEXT_PUBLIC_ADMIN_ID1;

  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error("Telegram config not found");
  }

  const text = `
🟦 Yangi career so'rov:
👤 Ism: ${escapeMarkdown(data.fullName)}
🎂 Yosh: ${escapeMarkdown(String(data.age))}
💼 Lavozim: ${escapeMarkdown(data.position)}
📞 Telefon: ${escapeMarkdown(data.phone)}
💬 Xabar: ${escapeMarkdown(data.message)}
`.trim();

  // 1) TEXT YUBORISH
  const textResponse = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
      }),
    }
  );

  if (!textResponse.ok) {
    throw new Error("Text send failed");
  }

  // 2) FILE YUBORISH (agar bo'lsa)
  if (data.file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("document", data.file);
    formData.append("caption", `CV: ${data.fullName} (${data.position})`);

    const fileResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!fileResponse.ok) {
      throw new Error("File send failed");
    }
  }

  return true; // ← IMPORTANT: formga success qaytadi
}

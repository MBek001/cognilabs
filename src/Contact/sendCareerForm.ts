import { errorToast, successToast } from "./response-toasts";

interface CareerFormData {
  fullName: string;
  position: string;
  phone: string;
  message: string;
  file: File | null;
}

// Markdown maxsus belgilarini escape qilish
function escapeMarkdown(text: string) {
  if (!text) return "-";
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

export async function sendCareerFormToAdmin(data: CareerFormData) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_COGNILABS_CAREERS_BOTID;
  const CHAT_ID = process.env.NEXT_PUBLIC_ADMIN_ID1;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Telegram token yoki chat ID topilmadi!");
    errorToast();
    return;
  }

  // Matnni escape qiling
  const text = `
🟦 Yangi career so'rov:
👤 Ism: ${escapeMarkdown(data.fullName)}
💼 Lavozim: ${escapeMarkdown(data.position)}
📞 Telefon: ${escapeMarkdown(data.phone)}
💬 Xabar: ${escapeMarkdown(data.message)}
`.trim();

  try {
    // Matn yuborish (Markdown-safe)
    const textResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "MarkdownV2", // escape qilingan text bilan ishlaydi
        }),
      }
    );

    if (!textResponse.ok) {
      const errorData = await textResponse.json().catch(() => ({}));
      throw new Error(`Matn yuborishda xatolik: ${errorData.description || textResponse.status}`);
    }

    // Fayl yuborish
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
        const fileErrorData = await fileResponse.json().catch(() => ({}));
        throw new Error(`Fayl yuborishda xatolik: ${fileErrorData.description || fileResponse.status}`);
      }
    }

    successToast();
  } catch (error) {
    console.error("Telegram yuborishda xatolik:", error);
    errorToast();
  }
}

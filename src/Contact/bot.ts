import { form } from "framer-motion/client";
import { errorToast, successToast } from "./response-toasts";

interface FormData {
  name: string;
  phone: string;
  email: string;
  telegram: string, 
  message: string;
  budget: string;
}

export async function sendLeadToChannel(formData: FormData): Promise<void> {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_LEAD_BOT_TOKEN;
  const CHANNEL_ID = process.env.NEXT_PUBLIC_LEAD_CHANNEL_ID;
  if (!BOT_TOKEN || !CHANNEL_ID) {
    console.error("Telegram bot token yoki kanal ID topilmadi!");
    errorToast();
    return;
  }

  const text = `
🟦 Yangi lead keldi:
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
✉️ Email: ${formData.email}
📱 Telegram: ${formData.telegram}
💰 Budjet: ${formData.budget}
💬 Xabar: ${formData.message}
`.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHANNEL_ID, // Kanal ID yoki @username
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Telegram xatosi: ${errorData.description || response.status}`);
    }

    successToast(); // Hammasi muvaffaqiyatli
  } catch (error) {
    console.error("Leadni kanalga yuborishda xatolik:", error);
    errorToast();
  }
}

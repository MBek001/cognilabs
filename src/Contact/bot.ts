import { errorToast, successToast } from "./response-toasts";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  company: string;
  budget: string;
}

export async function sendMessageToAdmin(formData: FormData): Promise<void> {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
  

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Telegram token yoki chat ID topilmadi!");
    errorToast();
    return;
  }

  const text = `
🟦 Yangi so'rov keldi:
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
✉️ Email: ${formData.email}
🏢 Kompaniya: ${formData.company}
💰 Budjet: ${formData.budget}
💬 Xabar: ${formData.message}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Telegramga yuborishda xatolik yuz berdi.");
    }

    successToast();
  } catch (error) {
    console.error("Telegramga yuborishda xatolik:", error);
    errorToast();
  }
}

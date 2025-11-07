import { errorToast, successToast } from "./response-toasts";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  budget: string;
}

export async function sendMessageToAdmin(formData: FormData): Promise<void> {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const CHAT_ID1 = process.env.NEXT_PUBLIC_ADMIN_ID1;
  const CHAT_ID2 = process.env.NEXT_PUBLIC_ADMIN_ID2; // To'g'ri nom

  // Ikkala ID ham mavjudligini tekshirish
  if (!BOT_TOKEN || !CHAT_ID1 || !CHAT_ID2) {
    console.error("Telegram token yoki chat ID topilmadi!");
    errorToast();
    return;
  }

  const text = `
🟦 Yangi so'rov keldi:
👤 Ism: ${formData.name}
📞 Telefon: ${formData.phone}
✉️ Email: ${formData.email}
💰 Budjet: ${formData.budget}
💬 Xabar: ${formData.message}
`.trim();

  // Yuborish funksiyasi
  const sendToChat = async (chatId: string) => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Telegram xatosi: ${errorData.description || response.status}`);
      }
    } catch (error) {
      console.error(`Chat ID ${chatId} ga yuborishda xatolik:`, error);
      throw error; // Xatoni tashqariga chiqarish
    }
  };

  try {
    // Ikkala admin ID ga ketma-ket yuborish
    await sendToChat(CHAT_ID1);
    await sendToChat(CHAT_ID2);

    successToast(); // Hammasi muvaffaqiyatli bo'lsa
  } catch (error) {
    errorToast(); // Agar birortasi xato bersa
  }
}
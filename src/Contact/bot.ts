import { errorToast, successToast } from "./response-toasts";

interface FormData {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  message: string;
  budget: string;
}

export async function sendLeadToChannel(formData: FormData, locale: string): Promise<void> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        locale,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const details =
        errorData && typeof errorData === "object" && "error" in errorData
          ? String(errorData.error)
          : response.statusText || "Lead yuborishda xatolik yuz berdi";
      throw new Error(details);
    }

    successToast();
  } catch (error) {
    console.error("Leadni yuborishda xatolik:", error);
    errorToast();
  }
}

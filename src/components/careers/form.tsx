"use client";
import React, { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { errorToast, successToast } from '~/Contact/response-toasts';

interface CareerFormData {
  fullName: string;
  age: number;
  position: string;
  phone: string;
  message: string;
  file: File | null;
}

function escapeMarkdown(text: string) {
  if (!text) return "-";
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

async function sendCareerFormToAdmin(data: CareerFormData) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_COGNILABS_CAREERS_BOTID;
  const CHAT_ID1 = process.env.NEXT_PUBLIC_ADMIN_ID1;
  const CHAT_ID2 = process.env.NEXT_PUBLIC_ADMIN_ID2;

  if (!BOT_TOKEN || !CHAT_ID1 || !CHAT_ID2) throw new Error("Telegram configuration not found");

  const text = `
🟦 Yangi career so'rov:
👤 Ism: ${escapeMarkdown(data.fullName)}
🔟 Yosh: ${escapeMarkdown(data.age.toString())}
💼 Lavozim: ${escapeMarkdown(data.position)}
📞 Telefon: ${escapeMarkdown(data.phone)}
💬 Xabar: ${escapeMarkdown(data.message)} 
`.trim();

  const chatIds = [CHAT_ID1, CHAT_ID2];

  for (const chatId of chatIds) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "MarkdownV2" }),
    });

    if (data.file) {
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("document", data.file);
      formData.append("caption", `CV: ${data.fullName} (${data.position})`);

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, { method: "POST", body: formData });
    }
  }
}


export default function JoinTeamForm() {
  const [formData, setFormData] = useState<CareerFormData>({
    fullName: '',
    age: 18, // default to 18 instead of 0 to avoid falsy value issues
    position: '',
    phone: '',
    message: '',
    file: null
  });
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = ['Programmer', 'AI Researcher', 'Designer', 'Marketolog'];
  const t = useTranslations("Careers");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.position || formData.age <= 0 || !agree) {
      errorToast();
      return;
    }

    setIsSubmitting(true);

    try {
      // Explicitly include age to satisfy TypeScript
      await sendCareerFormToAdmin({ ...formData, age: formData.age });
      successToast();
      setFormData({ fullName: '', age: 18, position: '', phone: '', message: '', file: null });
      setAgree(false);
    } catch {
      errorToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <motion.div
      id="form"
      className="min-h-screen bg-black flex items-center justify-center px-4 py-16 sm:py-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TITLE */}
        <motion.div className="text-center lg:text-left" variants={itemVariants}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2">{t("join")}</h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600">{t("now")}</h2>
        </motion.div>

        {/* FORM */}
        <motion.div className="bg-gray-100 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl" variants={itemVariants}>
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={containerVariants}>

            <motion.input
              type="text"
              placeholder={t("fullname")}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none transition"
              variants={itemVariants}
            />

            <motion.input
              type="tel"
              placeholder={t("phonenumber")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none transition"
              variants={itemVariants}
            />

            <motion.textarea
              placeholder={t("whyus")}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none resize-none transition"
              variants={itemVariants}
            />

            <motion.div className="relative" variants={itemVariants}>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg appearance-none focus:border-blue-600 focus:outline-none transition cursor-pointer"
              >
                <option value="" disabled>{t("position")}</option>
                {positions.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
            </motion.div>

            <motion.input
              type="number"
              placeholder={t("age")}
              value={formData.age || ""}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg focus:border-blue-600 focus:outline-none transition"
              variants={itemVariants}
            />

            <motion.label
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-600 flex items-center justify-between cursor-pointer hover:border-blue-600 transition text-sm sm:text-base"
              variants={itemVariants}
            >
              <span className="truncate">{formData.file ? formData.file.name : t("uploadres")}</span>
              <Upload size={20} />
              <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
            </motion.label>

            <motion.div className="flex items-start gap-3 pt-4" variants={itemVariants}>
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="agree" className="text-gray-600 text-sm sm:text-base leading-relaxed cursor-pointer">{t("check")}</label>
            </motion.div>

            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-black text-white py-3 sm:py-4 px-6 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-900 transition shadow-lg disabled:opacity-50"
              variants={itemVariants}
            >
              {isSubmitting ? "Sending..." : t("send")}
            </motion.button>

          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}

"use client";
import React, { useState } from 'react';
import { ChevronDown, Download, Upload } from 'lucide-react';

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
  const CHAT_ID = process.env.NEXT_PUBLIC_ADMIN_ID1;

  if (!BOT_TOKEN || !CHAT_ID) throw new Error("Telegram configuration not found");

  const text = `
🟦 Yangi career so'rov:
👤 Ism: ${escapeMarkdown(data.fullName)}
🎂 Yosh: ${escapeMarkdown(data.age.toString())}
💼 Lavozim: ${escapeMarkdown(data.position)}
📞 Telefon: ${escapeMarkdown(data.phone)}
💬 Xabar: ${escapeMarkdown(data.message)}
`.trim();

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (data.file) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("document", data.file);
    formData.append("caption", `CV: ${data.fullName} (${data.position})`);

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: formData,
    });
  }
}

export default function JoinTeamForm() {
  const [formData, setFormData] = useState<CareerFormData>({
    fullName: '',
    age: 0,
    position: '',
    phone: '',
    message: '',
    file: null
  });

  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const positions = ['Programmer', 'AI Researcher', 'Designer', 'Marketolog'];
  const ages = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({...formData, file});
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.position || !formData.age)
      return alert("Please fill in all required fields");

    if (!agree)
      return alert("Please agree to the terms");

    setIsSubmitting(true);

    try {
      await sendCareerFormToAdmin(formData);

      setFormData({
        fullName: '',
        age: 0,
        position: '',
        phone: '',
        message: '',
        file: null
      });
      setAgree(false);
    } catch {
      alert("❌ Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="form" className="min-h-screen bg-black flex items-center justify-center px-4 py-16 sm:py-20">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TITLE */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2">
            Join Our Team
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600">
            NOW!
          </h2>
        </div>

        {/* FORM */}
        <div className="bg-gray-100 rounded-[30px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl">

          <div className="space-y-6">

            {/* INPUT — Full Name */}
            <input
              type="text"
              placeholder="Full Name*"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none transition"
            />

            {/* INPUT — Phone */}
            <input
              type="tel"
              placeholder="Phone Number*"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none transition"
            />

            {/* TEXTAREA */}
            <textarea
              placeholder="Why you chose us! (Optional)"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={3}
              className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg placeholder-gray-500 focus:border-blue-600 focus:outline-none resize-none transition"
            />

            {/* SELECT — Position */}
            <div className="relative">
              <select
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg appearance-none focus:border-blue-600 focus:outline-none transition cursor-pointer"
              >
                <option value="" disabled>Position*</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
            </div>

            {/* SELECT — Age */}
            <div className="relative">
              <select
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-700 text-base sm:text-lg appearance-none focus:border-blue-600 focus:outline-none cursor-pointer transition"
              >
                <option value={0} disabled>Age*</option>
                {ages.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" size={22} />
            </div>

            {/* UPLOAD */}
            <label className="w-full bg-transparent border-b-2 border-gray-400 py-3 px-1 sm:px-2 text-gray-600 flex items-center justify-between cursor-pointer hover:border-blue-600 transition text-sm sm:text-base">
              <span className="truncate">{formData.file ? formData.file.name : "Upload Resume/Portfolio (Optional)"}</span>
              <Upload size={20} />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </label>

            {/* CHECKBOX */}
            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
              />
              <label htmlFor="agree" className="text-gray-600 text-sm sm:text-base leading-relaxed cursor-pointer">
                By checking this box, you agree to receive text messages (SMS) and calls from Cognilabs HR staff
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 sm:py-4 px-6 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-900 transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send It"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

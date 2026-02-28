"use client";
import { Star } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { sendLeadToChannel } from "~/Contact/bot";
import { motion } from "framer-motion";
import { trackEvent } from "~/lib/gtag";

interface FormData {
  name: string;
  phone: string;
  email: string;
  telegram: string;
  message: string;
  budget: string;
}

interface RequestFormProps {
  submitEventName?: string;
}

export default function RequestForm({ submitEventName }: RequestFormProps) {
  const t = useTranslations("ContactForm");
  const locale = useLocale();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    message: "",
    budget: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitEventName) {
      trackEvent(submitEventName);
    }
    setLoading(true);
    await sendLeadToChannel(formData);
    setLoading(false);

    setFormData({
      name: "",
      phone: "",
      email: "",
      telegram: "",
      message: "",
      budget: "",
    });
  };

  return (
    <div id="contact" className="bg-[#001A3A] py-20 text-white font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-between space-y-10">
          <div>
            <div className="flex items-start">
              <h4 className="text-3xl md:text-4xl font-semibold leading-snug max-w-md">
                {t("title")}
              </h4>

              {/* 🔥 Animated left-right arrow */}
              <motion.div
                className="ml-2 mt-8"
                animate={{
                  x: [-12, 8, -12],
                  opacity: [0.5, 1, 0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
              >
                <Image
                  src="/formnext.png"
                  width={80}
                  height={80}
                  alt="arrow"
                  className="mx-auto drop-shadow-md"
                />
              </motion.div>
            </div>

            <p className="mt-4 text-lg text-gray-300">
              {t("call").split(":")[0]}:
              <span className="font-semibold">{t("call").split(":")[1]}</span>
              <span >{t("phonenumber")}</span>
            </p>
          </div>

          {/* Steps */}
          <div>
            <h5 className="text-xl font-semibold mb-4">{t("whatHappens")}</h5>
            <ul className="space-y-3 text-lg p-2">
              {[t("step1"), t("step2"), t("step3")].map((step, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Image src="/check.png" width={25} height={25} alt="check" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating - Desktop */}
          <div className="hidden md:flex w-[270px] h-[60px] items-center bg-white text-black rounded-bl-3xl rounded-tr-3xl">
            <Image
              src="/clutch.png"
              width={60}
              height={60}
              alt="cognilabs"
              className="rounded-bl-3xl border p-0.5 rounded-tr-3xl"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="ml-2 font-medium text-lg">5.0</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-yellow-400 text-yellow-400 w-5 h-5 mx-px"
                  />
                ))}
              </div>
              <div>
                <span className="ml-2 text-sm">
                  based on{" "}
                  <Link href={"https://clutch.co/"} target="_blank" className="text-blue-600 font-medium">
                    Clutch
                  </Link>{" "}
                  reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — FORM */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-500 max-w-[510px] hover:scale-101 duration-300 transform transition-transform rounded-[50px] shadow-lg p-10 space-y-8"
          >
            {/* TEXT FIELDS (EXCEPT EMAIL/TELEGRAM) */}
            {(
              ["name", "phone", "message", "budget"] as (keyof FormData)[]
            ).map((field) => (
              <div className="flex flex-col pt-4" key={field}>
                {field === "message" ? (
                  <textarea
                    required
                    rows={1}
                    placeholder={`${t(field)}`}
                    className="border-b text-black border-gray-300 py-3 outline-none resize-none"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                ) : (
                  <input
                    required
                    type="text"
                    placeholder={
                      field === "budget"
                        ? "Masalan: $5000 - $10000"
                        : `${t(field)}`
                    }
                    className="border-b text-black py-3 border-gray-300 outline-none"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            {/* CONDITIONAL FIELD — TELEGRAM OR EMAIL */}
            <div className="flex flex-col pt-4">
              {locale === "uz" || locale === "ru" ? (
                <input
                  required
                  type="text"
                  placeholder="@telegram_username"
                  className="border-b text-black py-3 border-gray-300 outline-none"
                  value={formData.telegram}
                  onChange={(e) =>
                    setFormData({ ...formData, telegram: e.target.value })
                  }
                />
              ) : (
                <input
                  required
                  type="email"
                  placeholder={t("email")}
                  className="border-b text-black py-3 border-gray-300 outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              )}
            </div>

            {/* CHECKBOX */}
            <div className="flex items-start space-x-3 pb-4 text-sm text-gray-700">
              <input type="checkbox" className="mt-1" required />
              <p>{t("checkbox")}</p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-60 flex cursor-pointer justify-center mx-auto bg-[#0949A7] text-white font-semibold py-3 rounded-full hover:bg-[#0b5ed7] transition disabled:opacity-60"
            >
              <div className="flex justify-center items-center gap-2">
                {loading ? "Sending..." : t("button")}
                {!loading && (
                  <Image src="/sendicon.png" width={18} height={18} alt="send" />
                )}
              </div>
            </button>
          </form>

          {/* Rating - Mobile */}
          <div className="flex md:hidden w-[270px] h-[60px] items-center bg-white text-black rounded-bl-3xl rounded-tr-3xl mt-8 mx-auto">
            <Image
              src="/cognilabs.png"
              width={60}
              height={60}
              alt="cognilabs"
              className="rounded-bl-3xl p-0.5 rounded-tr-3xl"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="ml-2 font-medium text-lg">5.0</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="fill-yellow-400 text-yellow-400 w-5 h-5 mx-px"
                  />
                ))}
              </div>
              <div>
                <span className="ml-2 text-sm">
                  based on <span className="text-blue-600 font-medium">Clutch</span> reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

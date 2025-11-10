"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Faq() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { q: t("quest1"), a: t("answer1") },
    { q: t("quest2"), a: t("answer2") },
    { q: t("quest3"), a: t("answer3") },
    { q: t("quest4"), a: t("answer4") },
    { q: t("quest5"), a: t("answer5") },
  ];

  return (
    <div className="bg-black pt-20 pb-32">
      {/* === Title Section === */}
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-center text-4xl md:text-6xl font-bold text-white">
          {t("title")}
        </h2>

        {/* === Animated floating arrow === */}
        <motion.div
          className="mt-4"
          animate={{
            y: [0, -10, 0], // up-down motion
            opacity: [0.5, 1, 0.5], // smooth glow
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/nextbottom.png"
            width={80}
            height={70}
            alt="bottom next"
            className="mx-auto"
          />
        </motion.div>
      </div>

      {/* === FAQ Items === */}
      <div className="flex flex-col gap-4 max-w-3xl md:max-w-4xl mx-auto">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] rounded-xl px-4 md:px-6 mx-2 py-4 cursor-pointer transition-all duration-300 hover:bg-[#2A2A2A]"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {item.q}
              </h3>
              <ChevronDown
                className={`text-white transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? "max-h-[500px] mt-3 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-300 text-base leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

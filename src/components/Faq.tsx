"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <div className="container mx-auto pt-20 pb-32">
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className="text-center text-5xl md:text-6xl font-bold text-white">
          {t("title")}
        </h2>
        <Image
          className="mt-4"
          src="/nextbottom.png"
          width={80}
          height={70}
          alt="bottom next"
        />
      </div>

      <div className="flex flex-col gap-4 max-w-3xl md:max-w-4xl mx-auto">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] rounded-xl px-4 md:px-6 py-4 cursor-pointer transition-all duration-300 hover:bg-[#2A2A2A]"
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
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-[500px] mt-3" : "max-h-0"
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

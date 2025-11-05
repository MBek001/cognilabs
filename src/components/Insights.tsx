"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Insights() {
  const t = useTranslations("Insights");
  const [currentIndex, setCurrentIndex] = useState(0);

  const topics = [
    {
      id: 1,
      link: "ai-revolution",
      title: "AI Revolution in Business Apps",
      date: "06.09.25",
      text: "Artificial Intelligence is transforming how businesses operate through automation and data-driven insights...",
    },
    {
      id: 2,
      link: "rise-nocode",
      title: "Rise of No-Code Platforms",
      date: "06.09.25",
      text: "No-code and low-code platforms are enabling non-developers to build apps without programming. This trend is speeding...",
    },
    {
      id: 3,
      link: "cybersecurity-gets-smarter",
      title: "Cybersecurity Gets Smarter",
      date: "06.09.25",
      text: "Advanced AI-driven security systems are helping detect and block threats in real time. Businesses are investing...",
    },
    {
      id: 4,
      link: "era-of-quantum",
      title: "The Era of Quantum Computing",
      date: "06.09.25",
      text: "Quantum computing is emerging as one of the most revolutionary technologies of the 21st century...",
    },
    {
      id: 5,
      link: "power-of-5g",
      title: "The Power of 5G Connectivity",
      date: "06.09.25",
      text: "5G technology marks a significant leap forward in mobile and wireless communication. Compared to previous generations, 5G offers...",
    },
  ];

  const locale = useLocale();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % topics.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + topics.length) % topics.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % topics.length;
      cards.push(topics[index]);
    }
    return cards;
  };

  return (
    <div className="py-16 px-4">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0066FF] font-bold text-center mb-12 sm:mb-16">
        {t("title")}
      </h2>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons (hidden on mobile) */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-[#D9D9D9] hover:bg-gray-600 text-black rounded-full p-3 transition-all duration-300 ease-in-out hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-[#D9D9D9] hover:bg-gray-600 text-black rounded-full p-3 transition-all duration-300 ease-in-out hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight className="w-10 h-10" />
        </button>

        {/* Cards Container */}
        <div
          className="
            flex gap-6 sm:gap-10 md:gap-14 
            px-2 sm:px-8 md:px-16 
            overflow-x-auto md:overflow-x-hidden 
            snap-x snap-mandatory 
            scrollbar-hide
          "
        >
          {getVisibleCards().map((topic, index) => (
            <Link
              href={`/${locale}/insights/${topic.link}`}
              key={index}
              className="
                min-w-[85%] sm:min-w-[45%] md:min-w-0 
                snap-center 
              "
            >
              <div
                className="
                  bg-[#2A2A2A] cursor-pointer group hover:bg-[#19417c] 
                  rounded-3xl overflow-hidden transition-all duration-500 
                  hover:scale-[1.03] flex flex-col
                "
              >
                {/* Card Header */}
                <div className="bg-white group-hover:scale-95 transition-all duration-500 ease-in-out pt-16 pb-12 p-6 flex flex-col justify-center m-5 rounded-3xl">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Cognilabs
                  </h3>
                  <p className="text-lg italic pt-6 text-black font-semibold">
                    {topic.title}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col grow">
                  <p className="text-[#0066FF] p-2 bg-[#5a94ec57] rounded-2xl inline-block text-sm mb-4 w-fit">
                    {topic.date}
                  </p>
                  <h4 className="text-white text-lg sm:text-xl font-semibold mb-3">
                    {topic.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed grow">
                    {topic.text}
                  </p>
                  <button className="text-[#0066FF] text-sm pt-6 sm:pt-8 font-medium hover:underline text-left hover:translate-x-2 transition-all">
                    See more...
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

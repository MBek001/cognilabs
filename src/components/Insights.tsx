"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

export default function Insights() {
  const t = useTranslations("Insights");
  const locale = useLocale();

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
      text: "Quantum computing is emerging as one of the most revolutionary technologies of the 21st century,unlike...",
    },
    {
      id: 5,
      link: "power-of-5g",
      title: "The Power of 5G Connectivity",
      date: "06.09.25",
      text: "5G technology marks a significant leap forward in mobile and wireless communication. Compared to previous generations, 5G offers...",
    },
  ];

  return (
    <div className="py-16 px-4 bg-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0066FF] font-bold text-center mb-12 sm:mb-16">
        {t("title")}
      </h2>

      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          navigation={{
            prevEl: ".prev-btn-insights",
            nextEl: ".next-btn-insights",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {[...topics, ...topics].map((topic, idx) => (
            <SwiperSlide key={`${topic.id}-${idx}`}>
              {({ isActive }) => (
                <Link href={`/${locale}/insights/${topic.link}`}>
                  <div
                    className={`relative transition-all duration-700 ease-out ${
                      isActive
                        ? " z-20 shadow-2xl"
                        : "scale-90 opacity-60 z-10"
                    }`}
                  >
                    <div
                      className="
                        bg-[#2A2A2A]
                        cursor-pointer
                        group
                        rounded-3xl 
                        overflow-hidden
                        flex 
                        flex-col 
                        h-[530px]

                        transition-all 
                        duration-500 
                        ease-in-out

                        hover:-translate-y-2
                        hover:shadow-2xl
                        hover:ring-2
                        hover:ring-[#246BFF]/50
                      "
                    >
                      {/* HEADER */}
                      <div
                        className="
                          bg-white 
                          pt-16 pb-12 p-6 
                          flex flex-col 
                          justify-center 
                          m-5 rounded-3xl shrink-0

                          transition-all 
                          duration-500 
                          ease-in-out
                          group-hover:translate-y-1
                        "
                      >
                        <h3 className="text-2xl font-bold text-black ">
                          Cognilabs
                        </h3>
                        <p className="text-lg italic pt-2 text-black font-semibold">
                          {topic.title}
                        </p>
                      </div>

                      {/* BODY */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto">
                        <p className="text-[#0066FF] p-2 bg-[#5a94ec57] rounded-2xl inline-block text-sm mb-4 w-fit">
                          {topic.date}
                        </p>
                        <h4 className="text-white text-lg md:mt-6 sm:text-xl font-semibold mb-3">
                          {topic.title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {topic.text}
                        </p>

                        <button
                          className="
                            text-[#0066FF] 
                            text-sm 
                            pt-6 sm:pt-8 
                            font-medium 
                            text-left
                            
                            transition-all 
                            duration-500 
                            ease-in-out
                            hover:underline
                            hover:translate-x-2
                          "
                        >
                          See more...
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ARROWS */}
        <button className="prev-btn-insights absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button className="next-btn-insights absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}

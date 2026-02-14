"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RequestForm from "~/components/RequestForm";
import Footer from "~/components/Footer";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const services = [
    { title: t("ai"), desc: t("ai-text2"), id: "ai" },
    { title: t("tg-bot"), desc: t("tg-bot-text2"), id: "tg-bot" },
    { title: t("web-dev"), desc: t("web-dev-text2"), id: "web-dev" },
    {
      title: t("web-app-dev"),
      desc: t("web-app-dev-text2"),
      id: "web-app-dev",
    },
    { title: t("mobile-dev"), desc: t("mobile-dev-text2"), id: "mobile-dev" },
    { title: t("crm"), desc: t("crm-text2"), id: "crm" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-40 sm:pt-52 bg-black text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="relative flex justify-center items-center container mx-auto text-center py-16 px-6 sm:px-10 md:px-20 max-w-5xl rounded-[40px] border border-transparent mb-24 overflow-hidden group">
          {/* Border Animation */}
          <div className="absolute inset-0 rounded-[40px] p-0.5 bg-linear-to-r from-blue-600 via-purple-400 to-blue-600 animate-borderRotate"></div>

          {/* Inner background */}
          <div className="absolute inset-0.5 bg-black rounded-[38px]" />

          <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold z-10 leading-tight">
            <span className="text-blue-500">{t("service").split(" ")[0]} </span>
            <span className="text-white">
              {t("service").split(" ").slice(1).join(" ")}
            </span>
          </h2>
        </div>

        {/* Timeline Section */}
        <div className="relative max-w-6xl mx-auto">
          {/* Base line (hidden on mobile) */}
          <div className="hidden md:block absolute  -translate-x-1/2 w-0.5 bg-gray-700 h-full" />
          {/* Active progress line (hidden on mobile) */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left -translate-x-1/2 w-0.5 bg-white transition-all duration-500"
            style={{
              height: `${((activeIndex + 1) / services.length) * 100}%`,
            }}
          />

          {services.map((service, index) => (
            <div
              id={`${service.id}`}
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="relative flex flex-col md:flex-row items-start md:items-center mb-20 md:mb-32"
            >
              {/* Circle (hidden on mobile) */}
              <div
                className={`hidden md:block absolute -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black transition-all duration-300 ${
                  activeIndex >= index ? "bg-white" : "bg-gray-700"
                }`}
              />

              {/* Content */}
              <div className="md:pl-20 mt-10 md:mt-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 hover:text-white text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
                  {service.desc}
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-300 font-semibold text-sm md:text-base transition-all"
                >
                  {t("use-service")}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Summary */}

      {/* Request form */}
      <div id="contact" className="pt-16 sm:pt-24">
        <RequestForm />
      </div>
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto text-center">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
            {(() => {
              const words = t("to-offer").split(" ");
              const blueIndices = [3, 4, 5, 7, 9, 10];
              const lastFourStart = words.length - 4;

              return words.map((word, index) => {
                const isBlue =
                  blueIndices.includes(index) || index >= lastFourStart;
                return (
                  <span key={index} className={isBlue ? "text-blue-500" : ""}>
                    {word}
                    {index < words.length - 1 ? " " : ""}
                  </span>
                );
              });
            })()}
          </h1>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

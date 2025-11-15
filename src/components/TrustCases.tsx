"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TrustCases() {
  const t = useTranslations("TrustCases");
  const trackRef = useRef<HTMLDivElement>(null);

  const trustImages = [
    "/trustcases/ellipse1.png",
    "/trustcases/ellipse7.png",
    "/trustcases/ellipse2.png",
    "/trustcases/ellipse3.png",
    "/trustcases/ellipse6.png",
    "/trustcases/ellipse5.png",
    "/trustcases/ellipse4.png",
  ];

  // Hoverda to‘xtatish va davom ettirish
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseEnter = () => {
      track.style.animationPlayState = "paused";
    };
    const handleMouseLeave = () => {
      track.style.animationPlayState = "running";
    };

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-[#001F4C] py-12 md:py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title + Text (o‘zgarmadi) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-16">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {t("solutions")
                .split(" ")
                .map((word, index) => {
                  const blueWords = [2, 8, 9];
                  return (
                    <span
                      key={index}
                      className={blueWords.includes(index) ? "text-blue-500" : ""}
                    >
                      {word + " "}
                    </span>
                  );
                })}
            </h2>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 md:gap-8"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="w-1 h-24 md:h-32 bg-white/20" />
            <p className="text-white text-lg leading-relaxed">{t("text")}</p>
          </motion.div>
        </div>

        {/* 🔥 Yangi silliq marquee */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-10 animate-marquee" // CSS animatsiya
            style={{
              // Inline style orqali running/paused boshqaramiz
              animation: "marquee 15s linear infinite", // 20s — tezlikni o‘zgartirishingiz mumkin
              animationPlayState: "running",
            }}
          >
            {/* 2 marta takrorlaymiz — seamless loop uchun */}
            {[...trustImages, ...trustImages].map((image, index) => (
              <div
                key={index}
                className="w-[110px] sm:w-[130px] md:w-[140px] lg:w-[151px] aspect-square rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 hover:scale-110 hover:rotate-3"
              >
                <Image
                  src={image}
                  alt={`Company ${index + 1}`}
                  width={151}
                  height={151}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS @keyframes — global yoki page.module.css ichida bo‘lsa ham ishlaydi */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content; /* juda muhim! */
        }
      `}</style>
    </div>
  );
}
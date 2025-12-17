"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TrustCases() {
  const t = useTranslations("TrustCases");
  const trackRef = useRef<HTMLDivElement>(null);
  const trackRef2 = useRef<HTMLDivElement>(null); 

  const trustImages = [
    "/clients/agro.png",
    "/clients/aroma.png",
    "/clients/bazanew.png",
    "/clients/billur.png",
    "/clients/bro.png",
    "/clients/bunyodkornew.png",
    "/clients/erix.png"
  ];

  const trustImages2 = [
     "/clients/client12.png",
    "/clients/client13.png",
    "/clients/davr.png",
    "/clients/denov.png" ,
    "/clients/hoshang.png",
    "/clients/surxon.png",
    "/clients/taad.png",
    "/clients/zippy.png"
  ]

  // ⭐ 1-qator hover pause
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleEnter = () => (track.style.animationPlayState = "paused");
    const handleLeave = () => (track.style.animationPlayState = "running");

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    return () => {
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // ⭐ 2-qator hover pause (YANGI)
  useEffect(() => {
    const track = trackRef2.current;
    if (!track) return;

    const handleEnter = () => (track.style.animationPlayState = "paused");
    const handleLeave = () => (track.style.animationPlayState = "running");

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    return () => {
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="bg-[#001F4C] py-12 md:py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-16">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
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
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-1 h-24 md:h-32 bg-white/20" />
            <p className="text-white text-lg leading-relaxed">{t("text")}</p>
          </motion.div>
        </div>

        {/* ⭐ 1-qatordagi marquee */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-10 animate-marquee"
            style={{
              animation: "marquee 15s linear infinite",
              animationPlayState: "running",
            }}
          >
            {[...trustImages, ...trustImages].map((image, index) => (
              <div
                key={index}
                className="w-[110px] sm:w-[130px] md:w-[140px] lg:w-[135px] aspect-square rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 hover:rotate-3"
              >
                <Image
                  src={image}
                  alt={`Company-${index}`}
                  width={151}
                  height={151}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ⭐ 2-QATOR — hover pause qo‘shilgan */}
        <div className="relative w-full overflow-hidden mt-10">
          <div
            ref={trackRef2}
            className="flex gap-10 animate-marquee-right"
            style={{
              animation: "marqueeRight 18s linear infinite",
              animationPlayState: "running",
            }}
          >
            {[...trustImages2, ...trustImages2].map((image, index) => (
              <div
                key={index}
                className="w-[110px] sm:w-[130px] md:w-[140px] lg:w-[135px] aspect-square rounded-full flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 hover:-rotate-3"
              >
                <Image
                  src={image}
                  alt={`Company-r-${index}`}
                  width={151}
                  height={151}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee,
        .animate-marquee-right {
          display: flex;
          width: max-content;
        }
      `}</style>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

export default function TrustCases() {
  const t = useTranslations("TrustCases");
  const controls = useAnimation();

  const trustImages = [
    "/trustcases/ellipse1.png",
    "/trustcases/ellipse7.png",
    "/trustcases/ellipse2.png",
    "/trustcases/ellipse3.png",
    "/trustcases/ellipse6.png",
    "/trustcases/ellipse5.png",
    "/trustcases/ellipse4.png",
  ];

  // Animatsiyani ishga tushirish funksiyasi (takroran ishlatamiz)
  const startScroll = () =>
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 20, // tezlik — xohlasangiz o‘zgartiring
        ease: "linear",
        repeat: Infinity,
      },
    });

  useEffect(() => {
    startScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#001F4C] py-12 md:py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title + Text */}
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

        {/* 🔄 Uzluksiz o‘ngdan chapga siljiydigan logotiplar */}
        <div className="relative w-full overflow-hidden">
          {/* Track: 2x takror (200%) */}
          <motion.div
            className="flex items-center justify-start gap-10 w-[200%]"
            animate={controls}
            onMouseEnter={() => controls.stop()}
            onMouseLeave={startScroll}
          >
            {[...trustImages, ...trustImages].map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="w-[110px] sm:w-[130px] md:w-[140px] lg:w-[151px] aspect-square rounded-full flex items-center justify-center overflow-hidden mx-auto flex-shrink-0"
              >
                <Image
                  src={image}
                  alt={`Company ${index + 1}`}
                  width={151}
                  height={151}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

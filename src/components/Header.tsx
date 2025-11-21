"use client";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const t = useTranslations("Header");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const locale = useLocale();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center pb-30 justify-center pt-34 min-h-screen text-center overflow-hidden bg-black">

      {/* === Animated glowing lights === */}
      <motion.div
        className="pointer-events-none absolute left-[-120px] bottom-[300px] w-[360px] h-[360px] sm:w-[460px] sm:h-[360px] bg-white rounded-full blur-[140px] sm:blur-[180px] opacity-60"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-120px] top-20 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] bg-blue-600 rounded-full blur-[140px] sm:blur-[190px] opacity-70"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Video Modal === */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/WkrZ5QvAZpE?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Text content === */}
      <div className="z-10 mt-14 px-4 sm:px-6">
        <motion.h1
          className="text-4xl sm:text-6xl mt-10 sm:mt-16 font-bold text-white mb-4 sm:mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          >
            {t("headword1")}
          </motion.div>

          <motion.div
            className="text-blue-500 mt-1 sm:mt-2"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          >
            {t("headword2")}
          </motion.div>
        </motion.h1>

        <motion.div
          className="text-gray-300 text-base sm:text-xl max-w-[320px] sm:max-w-[560px] mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          {t("slogan")}
        </motion.div>

        {/* === Contact + Play Button Row === */}
        <motion.div
          className="z-10 flex items-center gap-4 justify-center mt-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          {/* Contact Button */}
          <motion.button
            onClick={() => handleScroll("contact")}
            className="
              relative overflow-hidden font-bold text-white py-2 sm:py-3 px-4
              rounded-full bg-linear-to-r cursor-pointer from-blue-600 via-blue-700 to-blue-800
              shadow-lg shadow-blue-700/40 
              transition-all duration-300
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("contact")}
          </motion.button>

          {/* Play Button — only in uz */}
          {locale === "uz" && (
  <motion.button
    onClick={() => setIsVideoOpen(true)}
    className="
      relative cursor-pointer
      bg-blue-600 hover:bg-blue-700 text-white
      p-3 rounded-full 
      transition-all duration-300
      flex items-center justify-center
    "
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* PULSING HALO */}
    <span className="
      absolute inset-0
      rounded-full
      bg-blue-300/40
      animate-pulse-scale
      pointer-events-none
    "></span>

    <Play className="w-4 h-4" fill="white" />
  </motion.button>
)}



        </motion.div>
      </div>

      {/* === Stats Section === */}
      <motion.div
        className="z-10 grid grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:gap-20 md:gap-28 mt-16 sm:mt-28 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
      >
        <Stat number="100+" label={t("successproject")} />
        <Stat number="5/5" label={t("happyclients")} />
        <Stat number="4/10" label={t("hoursspent")} />
      </motion.div>

      {/* === Animated Line === */}
      <motion.div
        className="relative hidden sm:flex items-center mb-10 justify-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="h-px bg-gradient-to-l from-white to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "40vw" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.div
          className="h-px bg-gradient-to-r from-white to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "40vw" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
        />
      </motion.div>
    </div>
  );
}

/* === Stats Component === */
function Stat({ number, label }: { number: string; label: string }) {
  const [value, setValue] = useState(0);

  const isPlus = number.endsWith("+");
  const isSlash = number.includes("/");
  const isRange = number.includes("-");

  let target = 0;
  let suffix = "";

  if (isPlus) {
    target = parseInt(number.replace("+", ""));
    suffix = "+";
  } else if (isSlash) {
    const [left, right] = number.split("/");
    target = parseInt(left);
    suffix = "/" + right;
  } else if (!isRange) {
    target = parseInt(number);
  }

  const animatedNumber = isRange ? number : value + suffix;

  useEffect(() => {
    if (isRange) return;

    const duration = 3000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [number]);

  return (
    <motion.div
      className="text-center w-[96px] sm:w-[160px] select-none"
      whileHover={{ scale: 1.04 }}
      transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <p className="text-2xl sm:text-3xl font-bold">{animatedNumber}</p>

      <p className="text-[#FFFFFFB2] text-sm sm:text-xl mt-1 sm:mt-2 leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

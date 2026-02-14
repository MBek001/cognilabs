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
      
      {/* CSS Optimized Glowing Lights (No Framer here for FCP) */}
      <div className="animate-pulse pointer-events-none absolute left-[-120px] bottom-[300px] w-[360px] h-[360px] sm:w-[460px] sm:h-[360px] bg-white rounded-full blur-[140px] sm:blur-[180px] opacity-40" />
      <div className="animate-pulse [animation-delay:3s] pointer-events-none absolute right-[-120px] top-20 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] bg-blue-600 rounded-full blur-[140px] sm:blur-[190px] opacity-50" />

      {/* Video Modal (Kept original logic) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4"
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
                src="https://www.youtube.com"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text content - CSS Animations for instant paint */}
      <div className="z-10 mt-14 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-6xl mt-10 sm:mt-16 font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-up">
          <div className="animate-slide-left [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
            {t("headword1")}
          </div>
          <div className="text-blue-500 mt-1 sm:mt-2 animate-slide-right [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
            {t("headword2")}
          </div>
        </h1>

        <div className="text-gray-300 text-base sm:text-xl max-w-[320px] sm:max-w-[560px] mx-auto mb-8 sm:mb-10 animate-fade-up [animation-delay:0.7s] opacity-0 [animation-fill-mode:forwards]">
          {t("slogan")}
        </div>

        {/* Buttons Row - Standard CSS entry */}
        <div className="z-10 flex items-center gap-4 justify-center mt-6 animate-fade-up [animation-delay:0.9s] opacity-0 [animation-fill-mode:forwards]">
          <button
            onClick={() => handleScroll("contact")}
            className="font-bold text-white py-2 sm:py-3 px-6 rounded-full bg-blue-600 shadow-lg shadow-blue-700/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t("contact")}
          </button>

          {locale === "uz" && (
            <button
              onClick={() => setIsVideoOpen(true)}
              className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            >
              <span className="absolute inset-0 rounded-full bg-blue-300/40 animate-ping"></span>
              <Play className="w-4 h-4" fill="white" />
            </button>
          )}
        </div>
      </div>

      {/* Stats Section - Using your custom Stat component! */}
      <div className="z-10 grid grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:gap-20 md:gap-28 mt-16 sm:mt-28 text-white animate-fade-up [animation-delay:1.1s] opacity-0 [animation-fill-mode:forwards]">
        <Stat number="100+" label={t("successproject")} />
        <Stat number="5/5" label={t("happyclients")} />
        <Stat number="2/4" label={t("hoursspent")} />
      </div>

      {/* Animated Line - Simple CSS */}
      <div className="relative hidden sm:flex items-center mb-10 justify-center mt-16 opacity-0 animate-fade-in [animation-delay:1.5s] [animation-fill-mode:forwards]">
        <div className="h-px w-[40vw] bg-linear-to-l from-white to-transparent" />
        <div className="h-px w-[40vw] bg-linear-to-r from-white to-transparent" />
      </div>
    </div>
  );
}

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
    const duration = 2000; // Shorter duration for better Speed Index
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, isRange]);

  return (
    <div className="text-center w-24 sm:w-40 select-none hover:scale-105 transition-transform duration-300">
      <p className="text-2xl sm:text-3xl font-bold">{animatedNumber}</p>
      <p className="text-white/70 text-sm sm:text-xl mt-1 sm:mt-2 leading-snug">
        {label}
      </p>
    </div>
  );
}

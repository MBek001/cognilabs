"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Header() {
  const t = useTranslations("Header");

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-24 min-h-screen text-center overflow-hidden bg-black">
      {/* === Animated glowing lights (softer) === */}
      <motion.div
        className="pointer-events-none absolute left-[-150px] bottom-[100px] w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] bg-white rounded-full blur-[140px] sm:blur-[180px] opacity-60"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-[-120px] top-20 w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full blur-[140px] sm:blur-[190px] opacity-70"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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

        <motion.button
          onClick={() => handleScroll("contact")}
          className="
            bg-blue-700 mt-6 sm:mt-10 cursor-pointer font-bold 
            text-base sm:text-xl text-white py-3 sm:py-3.5 px-7 sm:px-8 
            rounded-full transition 
            shadow-lg sm:shadow-none hover:shadow-blue-500/30 sm:hover:shadow-none
          "
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
        >
          {t("contact")}
        </motion.button>
      </div>

      {/* === Stats Section (smaller + smooth; no shadow) === */}
      <motion.div
        className="z-10 grid grid-cols-3 gap-6 sm:flex sm:flex-wrap sm:gap-20 md:gap-28 mt-16 sm:mt-28 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
      >
        <Stat number="100+" label={t("successproject")} />
        <Stat number="5/5" label={t("happyclients")} />
        <Stat number="4-10" label={t("hoursspent")} />
      </motion.div>

      {/* === Animated Line (responsive width) === */}
      <motion.div
        className="relative hidden sm:flex items-center mb-10 justify-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6, ease: "easeOut" }}
      >
        {/* Left */}
        <motion.div
          className="h-px bg-gradient-to-l from-white to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "40vw" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.1 }}
        />
        {/* Right */}
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

/* === Stats Subcomponent (smaller + smoother, no shadow) === */
function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      className="text-center w-[96px] sm:w-[160px] select-none"
      whileHover={{ scale: 1.04 }}
      transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <p className="text-2xl sm:text-3xl font-bold">{number}</p>
      <p className="text-[#FFFFFFB2] text-sm sm:text-xl mt-1 sm:mt-2 leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

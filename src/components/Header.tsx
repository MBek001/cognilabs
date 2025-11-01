"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <div className="relative flex flex-col items-center justify-center pt-24 min-h-screen text-center overflow-hidden bg-black">
      {/* === Animated glowing lights === */}
      <motion.div
        className="absolute left-[-150px] bottom-[100px] w-[500px] h-[500px] bg-white rounded-full blur-[200px] opacity-70"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-150px] top-[50px] w-[550px] h-[550px] bg-blue-600 rounded-full blur-[200px] opacity-80"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Text content === */}
      <div className="z-10 mt-14 px-4">
        <motion.h1
          className="text-4xl sm:text-8xl font-semibold text-white mb-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t("headword1")}
          </motion.div>

          <motion.div
            className="text-blue-500 mt-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {t("headword2")}
          </motion.div>
        </motion.h1>

        <motion.div
          className="text-gray-300 text-2xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {t("slogan")}
        </motion.div>

        <motion.button
          className="bg-blue-600 mt-12 hover:bg-blue-700 text-white font-medium py-4 px-9 rounded-full transition shadow-lg hover:shadow-blue-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {t("contact")}
        </motion.button>
      </div>

      {/* === Stats Section === */}
      <motion.div
        className="z-10 flex flex-wrap justify-center gap-40 mt-32 text-white"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      >
        <Stat number="100+" label={t("successproject")} />
        <Stat number="50+" label={t("happyclients")} />
        <Stat number="10250+" label={t("hoursspent")} />
        <Stat number="14+" label={t("members")} />
      </motion.div>

      {/* === Animated Line with Smaller Dots === */}
      <motion.div
        className="relative flex items-center justify-center mt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        {/* Chap nuqta */}
        <motion.div
          className="w-2 h-2 bg-white rounded-full translate-y-[0.5px]"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Chiziq */}
        <motion.div
          className="h-[1px] bg-white mx-2"
          initial={{ width: 0 }}
          animate={{ width: "1300px" }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />

        {/* O'ng nuqta */}
        <motion.div
          className="w-2 h-2 bg-white rounded-full translate-y-[0.5px]"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>
    </div>
  );
}

/* === Stats Subcomponent === */
function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p className="text-6xl font-bold">{number}</p>
      <p className="text-[#FFFFFFB2] text-3xl mt-2">{label}</p>
    </motion.div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function Vacancies() {

  const t = useTranslations("Careers")

  const vacancies = [
    {
      id: "programmer",
      title: t("programmer"),
      image: "/career/programmer.jpg",
      text: t("programmertext")
    },
    {
      id: "ai-researcher",
      title: t("ai"),
      image: "/career/ai.jpg",
      text: t("aitext")
    },
    {
      id: "designer",
      title: t("designer"),
      image: "/career/designer.jpg",
      text: t("designertext")
    },
    {
      id: "marketer",
      title: t("marketer"),
      image: "/career/marketer.jpg",
      text: t("marketertext")
    }
  ];

  const scrollToForm = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#0C0C11] pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* TITLE SECTION */}
        <motion.div 
          className="flex justify-center items-center flex-col text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
             {t("vacan")}
            </motion.span>{" "}
            {t("ava")}
          </motion.h2>

          <motion.p 
            className="
              text-base sm:text-lg md:text-xl 
              pt-8 text-gray-300 leading-relaxed 
              max-w-[850px]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("avatext")}
          </motion.p>
        </motion.div>

        {/* VACANCY CARDS */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-12 
            max-w-[900px] 
            mx-auto 
            mt-20
          "
        >
          {vacancies.map((vac, index) => (
            <motion.div
              key={vac.id}
              onClick={() => scrollToForm("form")}
              className="
                group
                rounded-3xl 
                overflow-hidden 
                bg-gradient-to-b 
                from-[#0066FF] 
                to-[#0041A8] 
                shadow-lg 
                transition-all 
                duration-300 
                cursor-pointer 
                flex 
                flex-col
                relative
              "
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 102, 255, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* ANIMATED BORDER GLOW */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: "linear-gradient(45deg, #0066FF, #00FFFF, #0066FF)",
                  backgroundSize: "200% 200%",
                  filter: "blur(20px)",
                  zIndex: -1
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* IMAGE */}
              <div className="relative h-[300px] sm:h-[260px] md:h-[300px] w-full overflow-hidden">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={vac.image}
                    alt={vac.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* BLACK OVERLAY ON HOVER */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  transition={{ duration: 0.3 }}
                />

                {/* FLOATING ICON ON HOVER */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* CONTENT */}
              <motion.div 
                className="
                  bg-gradient-to-b 
                  from-[#0066FF] 
                  to-[#0041A8] 
                  p-6 sm:p-8 
                  text-white 
                  rounded-b-3xl
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.15 }}
              >
                <motion.h3 
                  className="text-2xl sm:text-3xl font-semibold mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {vac.title}
                </motion.h3>

                <motion.p 
                  className="text-white/80 text-sm sm:text-base leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {vac.text}
                </motion.p>
              </motion.div>

              {/* CORNER ACCENT */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-white/50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* FORM (masalan) */}
        <div id="programmer" className="mt-32"></div>
        <div id="ai-researcher" className="mt-32"></div>
        <div id="designer" className="mt-32"></div>
        <div id="marketer" className="mt-32"></div>

      </div>
    </div>
  );
}
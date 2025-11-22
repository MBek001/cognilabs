"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Vacancies() {
  const t = useTranslations("Careers");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const vacancies = [
    {
      id: "programmer",
      title: t("programmer"),
      image: "/career/programmer12.png",
      text: t("programmertext")
    },
    {
      id: "ai-researcher",
      title: t("ai"),
      image: "/career/ai12.png",
      text: t("aitext")
    },
    {
      id: "designer",
      title: t("designer"),
      image: "/career/designer1.png",
      text: t("designertext")
    },
    {
      id: "marketer",
      title: t("marketer"),
      image: "/career/marketer12.png",
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
              className="bg-linear-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent"
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
            className="text-base sm:text-lg md:text-xl pt-8 text-gray-300 leading-relaxed max-w-[850px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("avatext")}
          </motion.p>
        </motion.div>

        {/* VACANCY CARDS */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[900px] mx-auto mt-20"
        >
          {vacancies.map((vac, index) => (
            <motion.div
              key={vac.id}
              onClick={() => scrollToForm("form")}
              className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#0066FF] to-[#0041A8] shadow-lg cursor-pointer flex flex-col relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -8 }}
            >
              {/* IMAGE */}
              <div className="relative h-[300px] sm:h-[260px] md:h-[300px] w-full overflow-hidden">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={vac.image}
                    alt={vac.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* OVERLAY ON HOVER */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

                {/* ARROW ICON */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className=" flex items-center justify-center">
                    Apply now
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 sm:p-8 text-white">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  {vac.title}
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {vac.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FORM ANCHORS */}
        <div id="programmer" className="mt-32"></div>
        <div id="ai-researcher" className="mt-32"></div>
        <div id="designer" className="mt-32"></div>
        <div id="marketer" className="mt-32"></div>
      </div>
    </div>
  );
}
"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export default function Part1() {
  const t = useTranslations("Careers");
  
  return (
    <div className="bg-black w-full pt-30 pb-40 overflow-hidden">
      <div
        className="
          container mx-auto 
          flex flex-col lg:flex-row 
          items-center justify-between
          px-4 lg:px-20 
          py-16 lg:py-20
          gap-20 lg:gap-20
        "
      >
        {/* LEFT TEXT */}
        <motion.div
          className="text-center lg:text-left max-w-[550px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
  className="text-3xl sm:text-4xl md:text-5xl font-bold"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  whileHover={{ scale: 1.02 }}
>
  {t("unlock")
    .split(" ")
    .map((word, wordIndex) => (
      <motion.span
        key={wordIndex}
        className={
          wordIndex === 1 || wordIndex === 2 ? "text-blue-800" : ""
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3 + wordIndex * 0.15,
          ease: "easeOut"
        }}
      >
        {word}{" "}
      </motion.span>
    ))}
</motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl pt-4 max-w-[530px] mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            {t("text")}
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE + BACKGROUND */}
        <motion.div
          className="relative w-full max-w-[700px] h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
        >
          {/* BLUE CIRCLE BG */}
          <motion.div
            className="absolute w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] rounded-full blur-3xl opacity-70"
            style={{
              background:
                "radial-gradient(circle, #003b9a 0%, #001a4d 40%, transparent 100%)",
              top: "10%",
              left: "3%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.85, 0.7],
              rotate: [0, 360]
            }}
            transition={{ 
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          ></motion.div>

          {/* FLOATING PARTICLES */}
        

          {/* IMAGE */}
          <motion.div
            className="relative z-10 w-full h-full"
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: [0, -10, 0],
              opacity: 1 
            }}
            transition={{ 
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 1,
                delay: 0.8,
                ease: "easeOut"
              }
            }}
            whileHover={{ 
              rotate: [0, 2, -2, 0],
              transition: { duration: 0.5 }
            }}
          >
            <Image
              className="object-contain"
              src="/careerline.png"
              alt="careers"
              fill
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
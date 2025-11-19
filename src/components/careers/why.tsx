"use client"; // <-- Add this at the very top
import { useTranslations } from 'next-intl';
import React from 'react';
import { motion } from 'framer-motion';

export default function WhyUs() {
  const t = useTranslations("Careers");

  const reasons = [
    { title: t("reas1"), text: t("reas1text") },
    { title: t("reas2"), text: t("reas2text") },
    { title: t("reas3"), text: t("reas3text") },
    { title: t("reas4"), text: t("reas4text") }
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const reasonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 15 } },
    hover: { scale: 1.2, color: "#2563EB", transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-black pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center flex-col mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
  {t("why")
    .split(" ")
    .map((word, index) => (
      <span
        key={index}
        className={index === 1 ? "text-blue-800" : ""}
      >
        {word}{" "}
      </span>
    ))}
</h2>

          <p className="max-w-[850px] text-base sm:text-lg lg:text-xl pt-6 sm:pt-8 font-inter text-gray-300 leading-[26px] sm:leading-[30px] lg:leading-[32px]">
            {t("reason")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto space-y-10 sm:space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              variants={reasonVariants as any}
            >
              <motion.div
                className="flex-shrink-0"
                variants={numberVariants}
                whileHover="hover"
              >
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {index + 1}.
                </span>
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {reason.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

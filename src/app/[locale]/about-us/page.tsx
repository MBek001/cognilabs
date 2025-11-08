'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Faq from '~/components/Faq';
import Footer from '~/components/Footer';
import RequestForm from '~/components/RequestForm';

export default function AboutPage() {
  const t = useTranslations('About');

  // ✅ Type-safe animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white pt-16 md:pt-20 lg:pt-24"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Logo va Title */}
        <motion.div
          className="flex flex-col items-center justify-center text-center mb-12 md:mb-16 lg:mb-20"
          variants={fadeUp}
        >
          <motion.div
            className="relative w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48 lg:w-96 lg:h-56"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/logomini.png"
              alt="Cognilabs Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-thin text-gray-400 tracking-wider mt-6"
            variants={fadeUp}
          >
            {t('title')}
          </motion.h3>
        </motion.div>

        {/* About Content */}
        <motion.div
          className="max-w-5xl mx-auto space-y-6 md:space-y-8 text-gray-300"
          variants={fadeUp}
        >
          <motion.h4
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left"
            variants={fadeUp}
          >
            {t('about')}
          </motion.h4>

          <motion.div
            className="space-y-4 sm:text-base text-base md:text-lg leading-relaxed text-center md:text-left"
            variants={fadeUp}
          >
            <p>{t('text1')}</p>
            <p className="pt-8">{t('text2')}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Request Form */}
      <motion.div className="pt-24" variants={fadeUp}>
        <RequestForm />
      </motion.div>

      {/* Our Goal */}
      <motion.div className="pt-40" variants={fadeUp}>
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 text-gray-300">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left">
            {t('ourgoal')}
          </h4>

          <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left">
            <p>{t('text3')}</p>
            <p className="pt-8">{t('text4')}</p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div className="pt-40" variants={fadeUp}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}

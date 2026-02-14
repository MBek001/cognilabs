"use client";

import { motion, Variants } from 'framer-motion';

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="min-h-screen bg-black text-white pt-16 md:pt-20 lg:pt-24"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp}>
      {children}
    </motion.div>
  );
}

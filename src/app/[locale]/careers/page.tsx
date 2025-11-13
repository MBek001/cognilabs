"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "~/components/Footer";
import Link from "next/link";

export default function CareersPage() {
  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Sales Manager",
    "UI/UX Designer",
  ];

  return (
    <div className="bg-black text-white pt-30">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center  pt-40 pb-20 px-6 gap-50 ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <h4 className="text-5xl font-bold leading-snug mb-5">
            Open positions at{" "}
            <span className="text-blue-600">Cognilabs</span>
          </h4>
          <p className="text-gray-300 mb-20 text-lg">
            Apply for the position of your choice today and we’ll get back to you
            as soon as possible.
          </p>
          <div className="mt-10">
            <Link href="/careers/form" className="px-6 py-3 cursor-pointer border mt-30 border-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
            Apply for position
          </Link>
          </div>
        </motion.div>

        

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/careers1.png"
            alt="Careers at Cognilabs"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
      <motion.div
                  className="mt-4"
                  animate={{
                    y: [0, -10, 0], // up-down motion
                    opacity: [0.5, 1, 0.5], // smooth glow
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/nextbottom.png"
                    width={80}
                    height={70}
                    alt="bottom next"
                    className="mx-auto"
                  />
                </motion.div>

      {/* Open Positions Section */}
      <div className="bg-white text-black py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-4xl sm:text-5xl font-bold mb-14">
            <span className="text-blue-600">Open</span> Positions
          </h2>

          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {positions.map((title, index) => (
              <Link href={'/careers/form'} key={index}>
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex justify-between group items-center px-8 py-6 border rounded-2xl hover:bg-blue-800 hover:text-white shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                <span className="text-lg sm:text-xl font-semibold">{title}</span>
                <ArrowUpRight size={26} className="text-gray-700 group-hover:text-white transition-colors " />
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>


      <div>
        <Footer/>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "~/components/Footer";

export default function Page() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint = 1024px
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const onEnter = (id: number) => !isMobile && setHovered(id);
  const onLeave = () => !isMobile && setHovered(null);

  // Force show bottom card on mobile OR when hovered on desktop
  const shouldShowBottomCard = (id: number) => isMobile || hovered === id;

  const projects = [
    // ... your projects array stays exactly the same
    {
      id: 1,
      title: "Billur",
      logo: "/projectslogo/billur.png",
      desc: "Billur is the trusted brand for powerful and safe cleaning products. Billur makes maintaining a fresh and healthy environment easier than ever.",
      prtype: "Cleaning",
      typeicon: "/projectslogo/icons/cleaning.png",
      showenimg: "/projectslogo/shows/cleaning.png",
      bout: "Cleaning Products",
      mssg: "“Great service! They created a clean, professional website that showcases our cleaning products perfectly. Easy communication and excellent results.”",
      link: "https://billur-market.com",
    },
    {
      id: 2,
      title: "Bazabarbershop",
      logo: "/projectslogo/baza.png",
      desc: "Bazabarbershop is your go-to place for professional cuts and grooming. Billur Barbershop makes looking fresh and polished easier than ever.",
      prtype: "Hairstyle",
      typeicon: "/projectslogo/icons/hairstyle.png",
      showenimg: "/projectslogo/shows/hairstyle.png",
      bout: "Clean Hairstyle",
      mssg: "“Great service! They created a clean, professional website that showcases our cleaning products perfectly. Easy communication and excellent results.”",
      link: "https://www.bazabarbershop.com",
    },
    {
      id: 3,
      title: "Djafariy",
      logo: "/projectslogo/djafariy1.png",
      desc: "Djafariy is the trusted brand for quality clothing and contemporary looks. Djafariy makes upgrading your wardrobe easier than ever",
      prtype: "Clothing",
      typeicon: "/projectslogo/icons/clothing.png",
      showenimg: "/projectslogo/shows/clothing.png",
      bout: "Stylish Clothes",
      mssg: "“Great service! They created a clean, professional website that showcases our cleaning products perfectly. Easy communication and excellent results.”",
      link: "https://djafariy.org",
    },
    {
      id: 4,
      title: "OLOU",
      logo: "/projectslogo/olou3.png",
      desc: "OLOU is a minimalist hoodie brand focused on quality, comfort, and design. OLOU makes dressing with simplicity easier than ever.",
      prtype: "Hoodies",
      typeicon: "/projectslogo/icons/hoodies.png",
      showenimg: "/projectslogo/shows/hoodies.png",
      bout: "Stylish Clothes",
      mssg: "“We’re so happy with this service! It helped our hoodie business run smoother and serve customers faster. Truly a game-changer for us”",
      link: "https://olou.uz",
    },
    {
      id: 5,
      title: "Saaf Green Agro",
      logo: "/projectslogo/saaf.png",
      desc: "Saaf Green Agro is the reliable provider of eco-friendly and sustainable agro products. Saaf Green Agro makes choosing healthy food easier than ever.",
      prtype: "Agro",
      typeicon: "/projectslogo/icons/agro.png",
      showenimg: "/projectslogo/shows/agro.png",
      bout: "Agro and Nature",
      mssg: "“We’re really happy with this service! It helped our agro business stay organized and work more efficiently. It’s exactly what we needed”",
      link: "https://saafagro.com",
    },
    {
      id: 6,
      title: "ExtraGpt",
      logo: "/projectslogo/extragpt1.png",
      desc: "ExtraGpt is the intelligent platform designed to help you get answers, ideas, and solutions instantly. ExtraGpt makes finding the information you need easier than ever.",
      prtype: "AI",
      typeicon: "/projectslogo/icons/ai.png",
      showenimg: "/projectslogo/shows/robot.png",
      bout: "Future Technology",
      mssg: "“We built an advanced AI assistant that communicates naturally, answers questions, and supports businesses through smart automation”",
      link: "https://www.extra-gpt.com",
    },
  ];

  return (
    <div className="bg-black pt-50 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-12">
          <h2 className="text-center font-bold max-w-[900px] text-3xl md:text-4xl leading-snug text-white">
            Our customers are thrilled to work with us, praising{" "}
            <span className="text-[#0066FF]">smooth collaboration, quality results,</span>{" "}
            and reliable support
          </h2>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => onEnter(item.id)}
              onMouseLeave={onLeave}
              className="group flex flex-col"
            >
              {/* MAIN CARD */}
              <motion.div className="bg-[#111] relative rounded-3xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="p-6 lg:pr-32">
                  <div className="flex items-center mb-6 gap-2 bg-[#003D99] w-fit px-4 py-1 rounded-lg">
                    <Image src={item.typeicon} width={16} height={16} alt="" />
                    <p className="text-[13px] text-blue-200 font-semibold">{item.prtype}</p>
                  </div>

                  <div className="flex gap-4 items-center mb-3">
                    <Image className="rounded-full border-2 border-gray-700" src={item.logo} width={56} height={56} alt={item.title} />
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed max-w-[320px] line-clamp-3">
                    {item.desc}
                  </p>

                  <div className="mt-5">
                    <p className="text-yellow-400 font-medium">
                      <span className="text-white">5.0</span> ★★★★★
                    </p>
                  </div>
                </div>

                {/* HOVER IMAGE - Hidden on mobile */}
                <motion.img
                  src={item.showenimg}
                  width={item.id >= 5 ? 420 : 300}
                  height={item.id >= 5 ? 420 : 330}
                  alt=""
                  className={`absolute hidden lg:block top-1/2 ${
                    item.id >= 5 ? "left-56" : "left-64"
                  } -translate-y-1/2 object-contain pointer-events-none`}
                  animate={{
                    scale: hovered === item.id ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>

              {/* BOTTOM CARD - Always visible on mobile/tablet */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  shouldShowBottomCard(item.id)
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="overflow-hidden mt-4"
              >
                <div className="bg-[#0f0f0f] rounded-3xl border border-gray-800 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <Image className="rounded-full" src={item.logo} width={50} height={50} alt="" />
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.bout}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-md leading-relaxed">
                        {item.mssg}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={item.link}
                    target="_blank"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                  >
                    Visit Project →
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Final Text */}
        <div className="mx-auto text-center pt-20 max-w-[900px] px-4 pb-20">
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            Our service stands out for its quality, speed, and reliability. We focus on making everything simple for you while delivering results that feel genuinely impressive.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
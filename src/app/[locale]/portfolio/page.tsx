"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "~/components/Footer";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Porfolio");
  const projects = [
    // ... your projects array stays exactly the same
    {
      id: 1,
      title: "Billur",
      logo: "/projectslogo/billur.png",
      desc: t("billurtext"),
      prtype: t("billurtype"),
      typeicon: "/projectslogo/icons/cleaning.png",
      showenimg: "/projectslogo/shows/cleaning.png",
      bout: t("billurpr"),
      mssg: t("billurmssg"),
      link: "https://billur-market.com",
    },
    {
      id: 2,
      title: "Bazabarbershop",
      logo: "/projectslogo/baza.png",
      desc: t("bazatext"),
      prtype: t("bazatype"),
      typeicon: "/projectslogo/icons/hairstyle.png",
      showenimg: "/projectslogo/shows/hairstyle.png",
      bout: t("bazapr"),
      mssg: t("bazamssg"),
      link: "https://www.bazabarbershop.com",
    },
    {
      id: 3,
      title: "Djafariy",
      logo: "/projectslogo/djafariy1.png",
      desc: t("djafariytext"),
      prtype: t("djafariytype"),
      typeicon: "/projectslogo/icons/clothing.png",
      showenimg: "/projectslogo/shows/clothing.png",
      bout: t("djafariypr"),
      mssg: t("djafariymssg"),
      link: "https://djafariy.org",
    },
    {
      id: 4,
      title: "OLOU",
      logo: "/projectslogo/olou3.png",
      desc: t("oloutext"),
      prtype: t("oloutype"),
      typeicon: "/projectslogo/icons/hoodies.png",
      showenimg: "/projectslogo/shows/hoodies.png",
      bout: t("oloupr"),
      mssg: t("oloumssg"),
      link: "https://olou.uz",
    },
    {
      id: 5,
      title: "Saaf Green Agro",
      logo: "/projectslogo/saaf.png",
      desc: t("saaftext"),
      prtype: t("saaftype"),
      typeicon: "/projectslogo/icons/agro.png",
      showenimg: "/projectslogo/shows/agro.png",
      bout: t("saafpr"),
      mssg: t("saafmssg"),
      link: "https://saafagro.com",
    },
    {
      id: 6,
      title: "ExtraGpt",
      logo: "/projectslogo/extragpt1.png",
      desc: t("extratext"),
      prtype: t("extratype"),
      typeicon: "/projectslogo/icons/robot.png",
      showenimg: "/projectslogo/shows/robot.png",
      bout: t("extrapr"),
      mssg: t("extramssg"),
      link: "https://www.extra-gpt.com",
    },
    {
      id: 7,
      title: "Zippy Taxi",
      logo: "/clients/zippy.png",
      desc: t("zippytext"),
      prtype: "Taxi",
      typeicon: "/projectslogo/icons/taxi.png",
      showenimg: "/projectslogo/shows/taxi.png",
      bout: "Taxi",
      mssg: t("zippymssg"),
      link: "",
    },
    {
      id: 8,
      title: "Davr Taxi",
      logo: "/clients/davr.png",
      desc: t("davrtext"),
      prtype: "Taxi",
      typeicon: "/projectslogo/icons/taxi.png",
      showenimg: "/projectslogo/shows/taxi.png",
      bout: "Taxi",
      mssg: t("davrmssg"),
      link: "",
    },
    {
      id: 9,
      title: "Bro Taxi",
      logo: "/clients/bro.png",
      desc: t("brotext"),
      prtype: "Taxi",
      typeicon: "/projectslogo/icons/taxi.png",
      showenimg: "/projectslogo/shows/taxi.png",
      bout: "Taxi",
      mssg: t("bromssg"),
      link: "",
    },
    {
      id: 10,
      title: "Erix Consulting",
      logo: "/clients/client11.png",
      desc: t("erixtext"),
      prtype: "Consulting",
      typeicon: "/projectslogo/icons/consulting.png",
      showenimg: "/projectslogo/shows/erix.png",
      bout: "Consulting",
      mssg: t("erixmssg"),
      link: "",
    },
    {
      id: 11,
      title: "Aroma lab",
      logo: "/clients/aroma.png",
      desc: t("erixtext"),
      prtype: "Perfumes",
      typeicon: "/projectslogo/icons/perfume.png",
      showenimg: "/projectslogo/shows/aroma.png",
      bout: "Perfumes",
      mssg: t("erixmssg"),
      link: "",
    },
    {
      id: 12,
      title: "Taad",
      logo: "/clients/taad.png",
      desc: t("taadtext"),
      prtype: "Ceiling",
      typeicon: "/projectslogo/icons/ceiling.png",
      showenimg: "/projectslogo/shows/taad.png",
      bout: "Ceiling",
      mssg: t("taadmssg"),
      link: "",
    },
    {
      id: 13,
      title: "Bunyodkor Academy",
      logo: "/clients/bunyodkornew.png",
      desc: t("bunyodkortext"),
      prtype: "Football",
      typeicon: "/projectslogo/icons/football.png",
      showenimg: "/projectslogo/shows/football.png",
      bout: "Football",
      mssg: t("bunyodkormssg"),
      link: "",
    },
    {
      id: 14,
      title: "Hoshang Restaurant",
      logo: "/clients/hoshang.png",
      desc: t("hoshangtext"),
      prtype: "Restaurant",
      typeicon: "/projectslogo/icons/restaurant.png",
      showenimg: "/projectslogo/shows/restaurant.png",
      bout: "Restaurant",
      mssg: t("hoshangmssg"),
      link: "",
    },
    {
      id: 15,
      title: "Best solar",
      logo: "/clients/client13.png",
      desc: t("bestsolartext"),
      prtype: "Solar Panels",
      typeicon: "/projectslogo/icons/panel.png",
      showenimg: "/projectslogo/shows/panel.png",
      bout: "Solar Panels",
      mssg: t("bestsolarmssg"),
      link: "",
    },
    {
      id: 16,
      title: "Surxon bozor",
      logo: "/clients/surxon.png",
      desc: t("surxontext"),
      prtype: "MarketPlace",
      typeicon: "/projectslogo/icons/market.png",
      showenimg: "/projectslogo/shows/market.png",
      bout: "MarketPlace",
      mssg: t("surxonmssg"),
      link: "",
    },
    {
      id: 17,
      title: "Denov bozor",
      logo: "/clients/denov.png",
      desc: t("denovtext"),
      prtype: "MarketPlace",
      typeicon: "/projectslogo/icons/market.png",
      showenimg: "/projectslogo/shows/market.png",
      bout: "MarketPlace",
      mssg: t("denovmssg"),
      link: "",
    },
  ];

  return (
    <div className="bg-black pt-50 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-12">
          <h2 className="text-center font-bold max-w-[900px] text-3xl md:text-4xl leading-snug text-white">
            {t("text")
              .split(" ")
              .map((word, index) => (
                <span
                  key={index}
                  className={index >= 10 && index <= 13 ? "text-[#0066FF]" : ""}
                >
                  {word}{" "}
                </span>
              ))}
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
              <motion.div className="bg-[#111] group relative rounded-3xl  border border-gray-800 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="p-6 lg:pr-32">
                  <div className="flex items-center mb-6 gap-2 bg-[#003D99] w-fit px-4 py-1 rounded-lg">
                    <Image src={item.typeicon} width={16} height={16} alt="" />
                    <p className="text-[13px] text-blue-200 font-semibold">
                      {item.prtype}
                    </p>
                  </div>

                  <div className="flex gap-4 items-center mb-3">
                    <Image
                      className="rounded-full border-2 border-gray-700"
                      src={item.logo}
                      width={56}
                      height={56}
                      alt={item.title}
                    />
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
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
                {/* MOBILE VERSION IMAGE */}
                <motion.img
                  src={item.showenimg}
                  alt=""
                  className={`absolute lg:top-35 lg:w-56 group-hover:scale-115 transform transition-all duration-300 ease-in-out lg:left-4/5 top-20 left-4/5 -translate-x-1/2 -translate-y-1/2 
              w-32 sm:w-44 h-auto object-contain pointer-events-none
              ${item.id === 5 || item.id === 6 ? "w-48 sm:w-64 lg:w-80" : ""}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
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
                    <Image
                      className="rounded-full"
                      src={item.logo}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {item.bout}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-xs mt-1 max-w-md leading-relaxed">
                        {item.mssg}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={item.link}
                    target="_blank"
                    className="bg-blue-600 flex gap-2 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                  >
                    {t("visitpr")} <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Final Text */}
        <div className="mx-auto text-center pt-20 max-w-[900px] px-4 pb-20">
          <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
            {t("bottomtext")}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

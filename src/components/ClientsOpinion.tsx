"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const MySlider = dynamic(() => import('./ClientsOpinionSwiper.jsx'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse" />
})



export default function ClientsOpinion() {
  const t = useTranslations("ClientsOpinion");

  const clientOpinions = [
    {
      id: 1,
      name: "Erkinbay Abdullayev",
      position: "Founder and CEO of Eric's Consulting",
      img: "/clients/client11.png",
      stars: 5,
      comment:
        t("client1")
    },
    {
      id: 2,
      name: "The Djafariy team",
      position: "",
      img: "/clients/client12.png",
      stars: 5,
      comment:
      t("client2")
    },
    {
      id: 3,
      name: "Best Solar team",
      position: "",
      img: "/clients/client13.png",
      stars: 5,
      comment:t("client3")    },
    {
      id: 4,
      name: "Surxonbozor",
      position: "E-commerce Platform",
      img: "/clients/surxon.png",
      stars: 5,
      comment:t("client4")    },{
      id: 5,
      name: "Billur",
      position: "",
      img: "/clients/billur.png",
      stars: 5,
      comment:t("client5")    },
    {
      id:6,
      name: "Aroma Lab",
      position: "",
      img: "/clients/aroma.png",
      stars: 5,
      comment: t("client6"),
    },
    {
      id: 7,
      name: "Baza Barbers",
      position: "",
      img: "/clients/bazanew.png",
      stars: 5,
      comment: t("client7")
    },
    {
      id: 8,
      name: "Zippy Taxi",
      position: "",
      img: "/clients/zippy.png",
      stars: 5,
      comment:t("client8")    },
    {
      id: 9,
      name: "Bunyodkor",
      position: "",
      img: "/clients/bunyodkornew.png",
      stars: 5,
      comment:t("client9")    },
    {
      id: 10,
      name: "DavrTaxi",
      position: "",
      img: "/clients/davr.png",
      stars: 5,
      comment:t("client10")    },
    {
      id: 11,
      name: "TAAD",
      position: "",
      img: "/clients/taad.png",
      stars: 5,
      comment:t("client11")    },
    {
      id: 12,
      name: "DenovBozor",
      position: "",
      img: "/clients/denov.png",
      stars: 5,
      comment:t("client12")    },
    {
      id: 13,
      name: "BroTaxi",
      position: "",
      img: "/clients/bro.png",
      stars: 5,
      comment:t("client13")    },
    {
      id: 14,
      name: "Hoshang Restaurant",
      position: "",
      img: "/clients/hoshang.png",
      stars: 5,
      comment:t("client14")    },
    {
      id: 15,
      name: "SaafAgro",
      position: "",
      img: "/clients/agro.png",
      stars: 5,
      comment:t("client15")    }
  ];

  return (
    <div className="bg-black py-20 md:py-40 overflow-hidden">
      {/* Title */}
      <div className="flex flex-col gap-7 mb-20 justify-center items-center px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-white max-w-4xl">
          {t("maintext").split(" ").map((word, index) =>
            index === 2 || index === 3 ? (
              <span key={index} className="text-blue-500">
                {word}{" "}
              </span>
            ) : (
              <span key={index}>{word} </span>
            )
          )}
        </h3>
        <p className="text-lg md:text-xl max-w-3xl text-[#FFFFFFB2] text-center">
          {t("text")}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <MySlider clientOpinions={clientOpinions} />
        

        {/* Buttons — bottom centered */}
        <div className="flex gap-6 justify-center mt-16">
          <button className="cursor-pointer prev-btn w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
            <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button className="cursor-pointer next-btn w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
            <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

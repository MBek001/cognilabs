"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

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
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {[...clientOpinions, ...clientOpinions].map((client, idx) => (
            <SwiperSlide key={`${client.id}-${idx}`}>
              {({ isActive }) => (
                <div
                  className={`relative transition-all duration-700 ease-out ${
                    isActive ? "z-20 shadow-2xl" : "scale-90 opacity-60 z-10"
                  }`}
                >
                  <div className="rounded-3xl overflow-hidden h-[540px] flex flex-col shadow-2xl border border-white/5 bg-[#1a1a1a]">
                    {/* Header */}
                    <div className="p-8 pb-4 bg-[#1a1a1a]">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <Image
                            width={130}
                            height={130}
                            src={client.img}
                            alt={client.name}
                            className="rounded-full   border-5 "
                          />
                          {isActive && (
                            <div className="absolute inset-0 object-cover object-center rounded-full ring-2 ring-blue-500 ring-offset-4 ring-offset-black animate-pulse" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-white font-semibold text-lg">
                            {client.name}
                          </h4>
                          {client.position && (
                            <p className="text-gray-400 text-sm mt-1">
                              {client.position}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-white font-bold">
                              {client.stars}.0
                            </span>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < client.stars
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="bg-white  px-5 pt-4 pb-8 rounded-b-3xl flex flex-col items-center  flex-1 overflow-y-auto">
                      <p className="text-gray-800 pb-2 text-[15px] leading-relaxed ">
                        {client.comment}
                      </p>
                      <button className="mt-auto bg-[#1a1a1a] text-white px-4 text-[11px] flex p-[5px] border rounded-2xl gap-1 justify-center group items-center cursor-pointer hover:bg-white  hover:text-blue-600 font-semibold hover:underline">
                        {t("viewindetail")}  <ArrowRight className="group-hover:ml-1 w-4 ease-in-out transform transition-all duration-200 "/>
                      </button> 
                    </div>
                  </div>
                  
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

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

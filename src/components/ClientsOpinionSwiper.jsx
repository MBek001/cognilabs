import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { Star } from "lucide-react";
import "swiper/css";

const ClientsOpinionSwiper = ({ clientOpinions }) => {
  return (
    <Swiper
      observeParents={true}
      observer={true}
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
                        priority
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
                  {/* <button className="mt-auto bg-[#1a1a1a] text-white px-4 text-[11px] flex p-[5px] border rounded-2xl gap-1 justify-center group items-center cursor-pointer hover:bg-white  hover:text-blue-600 font-semibold hover:underline">
                        {t("viewindetail")}  <ArrowRight className="group-hover:ml-1 w-4 ease-in-out transform transition-all duration-200 "/>
                      </button>  */}
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClientsOpinionSwiper;

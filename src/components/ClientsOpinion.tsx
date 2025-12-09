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
        "В короткие сроки команда Cognilabs предоставила качественные и профессиональные услуги. Для нас было особенно важно — точность и своевременное выполнение задач, — и они ответственно выполнили эти требования. Я определённо рекомендую их и другим представителям бизнеса!",
    },
    {
      id: 2,
      name: "The Djafariy team",
      position: "",
      img: "/clients/client12.png",
      stars: 5,
      comment:
        "We are pleased to have worked with the Cognilabs team! The mobile app, online store, and website turned out even better than we expected. The team's attentive and professional approach made us very happy. In the future, we plan to continue working with this team on an ongoing basis.",
    },
    {
      id: 3,
      name: "Best Solar team",
      position: "",
      img: "/clients/client13.png",
      stars: 5,
      comment:
        "The Cognilabs team provided us with AI-powered sales agents. They respond to customers automatically and quickly provide the necessary information. This has significantly eased our work and allowed us to redirect our time to more important tasks. Many thanks to the Cognilabs team.",
    },
    {
      id: 4,
      name: "Surxonbozor",
      position: "E-commerce Platform",
      img: "/clients/surxon.png",
      stars: 5,
      comment:
        "Assalomu alaykum, Cognilabs jamoasi! Sizlarga kattakon rahmat — men so'ragan loyiha, ya'ni Surxonbozori.uz mahalliy e'lonlar vebsaytini ko'nglimdagidek qilib yaratib berdingiz. Qilgan mehnatlaringizdan rozi bo'linglar!Cognilabs jamoasiga katta-katta marralarni zabt etishni Allohdan so'rayman. Sizlarga yana bir bor rahmat.",
    },{
      id: 5,
      name: "Billur",
      position: "",
      img: "/clients/billur.png",
      stars: 5,
      comment:
        "Kompaniya xizmati kutganimdanda qonigarli boldi.Ularni 1 - xizmatidan song butun loyihani ularga ishona olishimga sabalochi bolishdi, ularga qayta qayta nima gilish kerakligini tushuntirmadim, ishga qisqa vaqtda tezlik va aniqlik bilan yondashib, loyiha ustida ishlashdi",
    },
    {
      id:6,
      name: "Aroma Lab",
      position: "",
      img: "/clients/aroma.png",
      stars: 5,
      comment: "Cognilabs jamoasi biz uchun sun'iy intellektga asoslangan savdo agentlari taqdim etishdi va bu mijozlar bilan aloqamizni avtomatlashtirdi. Ular oz ishlariga professionallik bilan yondashishdi, har bir detal ustida ishlashdi va barcha ehtiyojlarimizni inobatga olishdi. Kelajakda ular bilan yana hamkorlik qilishni rejalashtiryapmiz.",
    },
    {
      id: 7,
      name: "Baza Barbers",
      position: "",
      img: "/clients/bazanew.png",
      stars: 5,
      comment: "Cognilabs kompaniyasi biz uchun qulay vebsayt va mijozlarimiz onlayn tarzda vaqt belgilay oladigan appointment tizimini ishlab chiqishdi. Bu tizim mijozlarimiz uchun katta qulaylik yaratdi va ish jarayonlarimizni optimallashtirdi.Har bir xohishimizga e'tibor bilan qarashdi, kerakli o'zgarishlar qilishdi.Ularning xizmatidan toliq mamnunmiz va albatta, yana hamkorlik qilishni istaymiz",
    },
    {
      id: 8,
      name: "Zippy Taxi",
      position: "",
      img: "/clients/zippy.png",
      stars: 5,
      comment:
        "Cognilabs tomonidan bizga yaratilgan zamonaviy taksi platformasi xizmat sifatimizni tubdan yaxshiladi. AI asosidagi avtomat order taqsimoti va operatorlar uchun qulay CRM tizimi hech qanday kechikishlarsiz ishlaydi. Mijozlar uchun ishlangan interfeys esa ancha sodda va tezkor. Jamoa fikrimizni darhol tushunadi va yechimlarni tez taklif qiladi. Zippy Taxi sifatida Cognilabs’dan juda mamnunmiz.",
    },
    {
      id: 9,
      name: "Bunyodkor",
      position: "",
      img: "/clients/bunyodkornew.png",
      stars: 5,
      comment:
        "Sport jamoasi sifatida bizga rasmiy veb-sayt, yangiliklar blogi va muxlislar bilan tezkor muloqot qilish imkoni kerak edi. Cognilabs bu vazifani yuqori darajada bajardi: jamoamiz tarkibi, statistikalar, match jadvali va onlayn-maxsus xabar xizmati bir tizimda jamlandi. AI-bazirlangan avtomat xabarlar tarqatish funksiyasi muxlislar bilan ishlashni yengillashtirdi. Jamoa ishiga professional yondashishi va har bir detalni inobatga olishi biz uchun katta qulaylik yaratdi.",
    },
    {
      id: 10,
      name: "DavrTaxi",
      position: "",
      img: "/clients/davr.png",
      stars: 5,
      comment:
        "DavrTaxi uchun Cognilabs tomonidan yaratilgan kompleks platforma — biz izlagan yechim edi. Shofyorlar monitoringi, onlayn-nazorat paneli, tezkor buyurtma taqsimoti va AI-chatbot orqali mijozlar bilan avtomatlashtirilgan muloqot — barchasi ish jarayonini optimizatsiya qildi. Jamoa tezkor ishlaydi, har bir talabimizni chuqur o‘rganib, samarali yechim taklif qiladi. Ular bilan hamkorlik qilish — ishonchli.",
    },
    {
      id: 11,
      name: "TAAD",
      position: "",
      img: "/clients/taad.png",
      stars: 5,
      comment:
        "Cognilabs jamoasi bizga AI-chatbot o‘rnatib berdi va bu haqiqatan ham ishimizga katta yordam berdi. Mijozlardan keladigan savollar, narx so‘rovlari, o‘lchovga yozilish — hammasi avtomat tartibda qabul qilinadigan bo‘ldi. Operatorlar yuklamasi ancha kamaydi, mijozlarga javob berish tezlashdi. Jamoa ishni tez va sifatli bajardi.",
    },
    {
      id: 12,
      name: "DenovBozor",
      position: "",
      img: "/clients/denov.png",
      stars: 5,
      comment:
        "Bizning maqsad — Denov uchun ishonchli va qulay onlayn bozor yaratish edi. Cognilabs bizning g‘oyani to‘liq tushunib, zamonaviy, tezkor va barqaror platforma yaratib berdi. Eng yoqqan joyimiz — e’lonlarni filtrlash tizimi, avtomat tekshiruv funksiyalari va CRM orqali moderatsiya jarayonining yengillashgani. AI-bot esa foydalanuvchilarga 24/7 yordam ko‘rsatib, yuklamani ancha kamaytirdi. Jamoa o‘z ishiga professional yondoshadi — tavsiya qilamiz!",
    },
    {
      id: 13,
      name: "BroTaxi",
      position: "",
      img: "/clients/bro.png",
      stars: 5,
      comment:
        "Cognilabs biz uchun taksi xizmatini to‘liq raqamlashtirib berdi: shofyor va mijozlar uchun qulay interfeys, avtomat order taqsimoti, real-time monitoring va CRM orqali operatorlar ishini yengillashtirish — bularning barchasi bizning xizmat sifatimizni oshirdi. Eng asosiysi, AI-chatbot mijozlarni qabul qilish, manzilni aniqlash va buyurtmani rasmiylashtirishni avtomatik bajaradi. Jamoa tezkor, e’tiborli va ijodkor. Ularning xizmati bizning biznesni yangi darajaga ko‘tardi.",
    },
    {
      id: 14,
      name: "Hoshang Restaurant",
      position: "",
      img: "/clients/hoshang.png",
      stars: 5,
      comment:
        "Restoranimiz uchun Cognilabs tomonidan yaratilgan veb-sayt va avtomatlashtirilgan bron tizimi biz kutganimizning o‘zi bo‘ldi. Har bir mijoz uchun avtomat javob beruvchi AI-bot ishchi yuklamasini ancha kamaytirdi. Mahsulotlar menyusi, onlayn zakaz, maxsus tadbirlar uchun bron qilish funksiyalari — hammasi chiroyli va qulay ishlaydi. Jamoa har bir detalga jiddiy yondashdi va bizga mos individual yechim taklif qildi. Ular bilan ishlash — mamnuniyat.",
    },
    {
      id: 15,
      name: "SaafAgro",
      position: "",
      img: "/clients/agro.png",
      stars: 5,
      comment:
        "Cognilabs jamoasi bilan hamkorlik qilish biz uchun agro sohada yangi bosqichni ochdi. Ular biz uchun zamonaviy veb-platforma va avtomatlashtirilgan savdo jarayonlarini joriy qilishdi. Ayniqsa, fermer va xaridorlar o‘rtasidagi aloqani optimizatsiya qilgan AI-chatbot juda qulay bo‘ldi. Barcha talablarimiz inobatga olindi, har bir funksiya bizning bozor mexanikamizga mos qilib ishlanadi. Kelgusida ham Cognilabs bilan yangi loyihalarni amalga oshirishni rejalashtirganmiz.",
    }
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
                    <div className="bg-white px-5 pt-4 pb-8 rounded-b-3xl flex flex-col items-start flex-1 overflow-y-auto">
                      <p className="text-gray-800 pb-2 text-[15px] leading-relaxed ">
                        {client.comment}
                      </p>
                      {/* <button className="mt-auto flex gap-1 justify-center group items-center cursor-pointer  text-blue-600 font-semibold hover:underline">
                        {t("viewindetail")} <ArrowRight className="group-hover:ml-1 ease-in-out transform transition-all duration-200 "/>
                      </button> */}
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

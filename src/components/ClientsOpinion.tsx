"use client";

import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function ClientsOpinion() {
  const t = useTranslations("ClientsOpinion");
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const clientOpinions = [
    {
      id: 1,
      name: "Erkinbay Abdullayev",
      position: "Founder and CEO of Eric's Consulting",
      img: "/clients/client1.png",
      stars: 5,
      comment:
        "В короткие сроки команда Cognilabs предоставила качественные и профессиональные услуги. Для нас было особенно важно — точность и своевременное выполнение задач, — и они ответственно выполнили эти требования. Я определённо рекомендую их и другим представителям бизнеса!",
    },
    {
      id: 2,
      name: "The Djafariy team",
      position: "",
      img: "/clients/client2.png",
      stars: 5,
      comment:
        "We are pleased to have worked with the Cognilabs team! The mobile app, online store, and website turned out even better than we expected. The team's attentive and professional approach made us very happy. In the future, we plan to continue working with this team on an ongoing basis.",
    },
    {
      id: 3,
      name: "Best Solar team",
      position: "",
      img: "/clients/client3.png",
      stars: 5,
      comment:
        "The Cognilabs team provided us with AI-powered sales agents. They respond to customers automatically and quickly provide the necessary information. This has significantly eased our work and allowed us to redirect our time to more important tasks. Many thanks to the Cognilabs team.",
    },
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % clientOpinions.length);
  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + clientOpinions.length) % clientOpinions.length
    );

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % clientOpinions.length;
      cards.push({ ...clientOpinions[index], displayIndex: i });
    }
    return cards;
  };

  return (
    <div ref={sectionRef} className="bg-black py-20 md:py-40">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-7 mb-20 justify-center items-center px-4"
      >
        <h3 className="text-3xl md:text-4xl font-semibold text-center text-white md:max-w-[700px]">
          {t("maintext").split(" ").map((word, index) => {
            if (index === 2 || index === 3) {
              return (
                <span key={index} className="text-blue-500">
                  {word}{" "}
                </span>
              );
            }
            return <span key={index}>{word} </span>;
          })}
        </h3>
        <p className="text-lg md:text-xl max-w-[700px] text-[#FFFFFFB2] text-center">
          {t("text")}
        </p>
      </motion.div>

      {/* Desktop: 3 Cards with Animation */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="flex gap-10 justify-center items-stretch px-8 mb-16"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {getVisibleCards().map((client, idx) => (
              <motion.div
                key={`${client.id}-${currentIndex}`}
                layout
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{
                  layout: { duration: 0.4 },
                  opacity: { duration: 0.3 },
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  scale: { duration: 0.3 },
                  delay: idx * 0.1,
                }}
                className="bg-[#1a1a1a] rounded-3xl w-[350px] h-[500px] flex flex-col shadow-xl hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      width={120}
                      height={120}
                      src={client.img}
                      alt={client.name}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text mb-1">
                        {client.name}
                      </h4>
                      {client.position && (
                        <p className="text-gray-400 text-sm mb-2">
                          {client.position}
                        </p>
                      )}
                      <div className="flex gap-1">
                        <span className="text-white font-medium mr-2">
                          {client.stars}.0
                        </span>
                        {[...Array(client.stars)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-b-3xl p-5 flex-1 flex flex-col">
                  <p className="text-gray-800 text-sm leading-relaxed mb-8 flex-1">
                    {client.comment}
                  </p>
                  <button className="text-blue-500 font-medium text-left hover:underline">
                    {t("viewindetail")}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile: 1 Card with Smooth Slide */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative overflow-hidden px-4 mb-12"
          style={{ height: "520px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -300, opacity: 0, scale: 0.95 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="absolute inset-0 bg-[#1a1a1a] rounded-3xl w-full max-w-[350px] left-1/2 -translate-x-1/2 flex flex-col shadow-xl"
            >
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    width={120}
                    height={120}
                    src={clientOpinions[currentIndex].img}
                    alt={clientOpinions[currentIndex].name}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text mb-1">
                      {clientOpinions[currentIndex].name}
                    </h4>
                    {clientOpinions[currentIndex].position && (
                      <p className="text-gray-400 text-sm mb-2">
                        {clientOpinions[currentIndex].position}
                      </p>
                    )}
                    <div className="flex gap-1">
                      <span className="text-white font-medium mr-2">
                        {clientOpinions[currentIndex].stars}.0
                      </span>
                      {[...Array(clientOpinions[currentIndex].stars)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-b-3xl p-5 flex-1 flex flex-col">
                <p className="text-gray-800 text-sm leading-relaxed mb-8 flex-1">
                  {clientOpinions[currentIndex].comment}
                </p>
                <button className="text-blue-500 font-medium text-left hover:underline">
                  {t("viewindetail")}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
        </button>
      </div>
    </div>
  );
}
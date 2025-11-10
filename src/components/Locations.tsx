"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Locations() {
  const t = useTranslations("Locations");

  const locations = [
    {
      id: 1,
      image: "/locations/location1.png",
      name: "USA, Ohio",
      phone: "(513) 808-88-13",
    },
    {
      id: 2,
      image: "/locations/loc2.png",
      name: "Uzbekistan, Tashkent",
      phone: "+998 (87) 337-75-77",
    },
  ];

  return (
    <div className="container mx-auto mt-16 mb-16 px-4">
      {/* Title */}
      <h3 className="text-center text-3xl sm:text-5xl md:text-7xl font-semibold leading-tight">
        {(() => {
          const words = t("headword").split(" ");
          const lastWord = words.pop();
          return (
            <>
              {words.join(" ")} <span className="text-blue-500">{lastWord}</span>
            </>
          );
        })()}
      </h3>

      {/* Locations */}
      <div className="flex justify-center items-center gap-2 sm:gap-8 mt-12 sm:mt-20 flex-wrap">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="relative group flex-1 min-w-[150px] max-w-[400px] overflow-hidden rounded-3xl shadow-lg"
          >
            {/* Image */}
            <Image
              src={loc.image}
              alt={loc.name}
              width={500}
              height={746}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500"></div>

            {/* Info content (only on hover) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            >
              <MapPin className="w-8 h-8 mb-3 text-blue-400" />
              <p className="text-xl font-semibold mb-2">{loc.name}</p>
              <div className="flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>{loc.phone}</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

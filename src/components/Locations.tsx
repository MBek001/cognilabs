"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

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
    <div className="pt-16 pb-16 px-4 bg-black text-white">
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
              className="w-full h-auto object-cover transition-transform duration-500"
            />

            {/* Dark overlay - always visible on mobile, hover on desktop */}
            <div
              className="
                absolute inset-0 
                bg-black/60 
                md:bg-black/0 md:group-hover:bg-black/60 
                transition-colors duration-500
              "
            />

            {/* Info content - always visible on mobile, hover on desktop */}
            <div
              className="
                absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 sm:p-6
                opacity-100 translate-y-0
                md:opacity-0 md:translate-y-8
                md:group-hover:opacity-100 md:group-hover:translate-y-0
                transition-all duration-500 ease-out
              "
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-2 sm:mb-3 text-blue-400" />
              <p className="text-sm sm:text-base md:text-xl font-semibold mb-1 sm:mb-2">
                {loc.name}
              </p>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-lg">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400" />
                <span>{loc.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
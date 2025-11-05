import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Locations() {
  const t = useTranslations("Locations");

  return (
    <div className="container mx-auto mt-16 mb-16 px-4">
      {/* Title */}
      <h3 className="text-center text-3xl sm:text-5xl md:text-7xl font-semibold leading-tight">
        {(() => {
          const words = t("headword").split(" ");
          const lastWord = words.pop();
          return (
            <>
              {words.join(" ")}{" "}
              <span className="text-blue-500">{lastWord}</span>
            </>
          );
        })()}
      </h3>

      {/* Images side by side (always) */}
      <div className="flex justify-center items-center gap-2 sm:gap-8 mt-12 sm:mt-20 flex-wrap">
        <div className="flex-1 min-w-[150px] max-w-[400px]">
          <Image
            src="/locations/location1.png"
            alt="locations"
            width={500}
            height={746}
            className="rounded-l-3xl w-full h-auto object-cover"
          />
        </div>

        <div className="flex-1 min-w-[150px] max-w-[400px]">
          <Image
            src="/locations/loc2.png"
            alt="locations"
            width={500}
            height={746}
            className="rounded-r-3xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

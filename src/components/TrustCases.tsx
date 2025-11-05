"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TrustCases() {
  const t = useTranslations("TrustCases");

  const trustImages = [
    "/trustcases/ellipse1.png",
    "/trustcases/ellipse7.png",
    "/trustcases/ellipse2.png",
    "/trustcases/ellipse3.png",
    "/trustcases/ellipse6.png",
    "/trustcases/ellipse5.png",
    "/trustcases/ellipse4.png",
  ];

  return (
    <div className="bg-black py-40">
      {/* Title Section */}
      <div className="flex mx-auto items-center gap-8 justify-center flex-col mb-20 px-6">
        <h2 className="text-5xl font-semibold text-white text-center">
          {(() => {
            const words = t("solutions").split(" ");
            return (
              <>
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={
                      [2, 8, 9].includes(index) ? "text-blue-500" : ""
                    }
                  >
                    {word}{" "}
                  </span>
                ))}
              </>
            );
          })()}
        </h2>

        <p className="text-2xl max-w-[700px] text-[#FFFFFFB2] text-center">
          {t("text")}
        </p>
      </div>

      {/* Companies Section */}
      <div className="flex flex-wrap justify-center items-center gap-10 mb-20">
        {trustImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            viewport={{ once: true }}
            className="cursor-pointer transition-transform duration-300 hover:shadow-[0_0_60px_rgba(0,102,255,1)] rounded-full overflow-hidden"
          >
            <Image
              src={image}
              alt={`Trusted company ${index + 1}`}
              width={150}
              height={150}
              className="rounded-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <button className="flex mx-auto items-center p-4 px-8 text-xl rounded-2xl bg-blue-800 hover:bg-blue-700 transition-colors">
        {t("viewMore")}
      </button>
    </div>
  );
}

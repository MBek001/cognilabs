"use client";

import { div } from "framer-motion/client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Footer from "~/components/Footer";
import Insights from "~/components/Insights";

export default function Page() {
  const { locale, topic } = useParams<{ locale: string; topic: string }>();

  console.log("topic:", topic);

  const t = useTranslations("Insights");
  const topic1 = t(`${topic}.topic1`);
  const text1 = t(`${topic}.text1`);
  const topic2 = t(`${topic}.topic2`);
  const text2 = t(`${topic}.text2`);
  const topic3 = t(`${topic}.topic3`);
  const text3 = t(`${topic}.text3`);

  return (
    <div >

      <div className="pt-30  px-4 bg-black">
      {/* Sarlavha */}
      <h2 className="text-4xl  max-w-[1160px] text-white font-bold p-6 bg-[#2A2A2A] py-10 rounded-3xl mx-auto">
        {topic1}
      </h2>

      {/* Birinchi bo'lim */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-white">{topic1}</h3>
        <p className="mt-4 text-gray-300 leading-relaxed">{text1}</p>
      </div>

      {/* Ikkinchi bo'lim */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-white">{topic2}</h3>
        <p className="mt-4 text-gray-300 leading-relaxed">{text2}</p>
      </div>

      {/* Uchinchi bo'lim */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-white">{topic3}</h3>
        <p className="mt-4 text-gray-300 leading-relaxed">{text3}</p>
      </div>

      <div>
        <Insights/>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
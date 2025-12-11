import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import Footer from '~/components/Footer';

export default function Page() {
  const t = useTranslations("Privacy");

  // Funksiya: matn ichidagi raqamlarni blue rangga bo'yash
  const highlightNumbers = (text: string) => {
  // \d raqam, \. nuqta, + bilan ularni birga olamiz
  const parts = text.split(/(\d+\.?\d*)/g); 
  return parts.map((part, i) =>
    /\d/.test(part) ? (
      <span key={i} className="text-blue-500">{part}</span>
    ) : (
      part
    )
  );
};


  // Funksiya: list itemlarni raqam highlight bilan render qilish
  const renderList = (list: string[]) =>
    list.map((item, i) => <li key={i}>{highlightNumbers(item)}</li>);

  return (
    <div className='bg-black'>
      <div className="max-w-4xl mx-auto py-10 pt-40 px-4 space-y-6 text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold">{highlightNumbers(t("title"))}</h1>
        <p className="text-gray-200 pb-4 underline">{highlightNumbers(t("lastUpdated"))}</p>

        {/* Intro */}
        <p>{highlightNumbers(t("intro"))}</p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold">{highlightNumbers(t("section1_title"))}</h2>
        <p className='pb-2'>{highlightNumbers(t("section1_desc"))}</p>

        <h3 className="text-xl font-semibold">{highlightNumbers(t("section1_1_title"))}</h3>
        <p>{highlightNumbers(t("section1_1_description"))}</p>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section1_1_list") as string[])}
        </ul>

        <h4 className="text-lg font-semibold">{highlightNumbers(t("section1_1_extra_title"))}</h4>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section1_1_extra_list") as string[])}
        </ul>

        <h3 className="text-xl font-semibold">{highlightNumbers(t("section1_2_title"))}</h3>
        <p>{highlightNumbers(t("section1_2_description"))}</p>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section1_2_list") as string[])}
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold">{highlightNumbers(t("section2_title"))}</h2>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section2_list") as string[])}
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold">{highlightNumbers(t("section3_title"))}</h2>
        <p>{highlightNumbers(t("section3_description"))}</p>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section3_list") as string[])}
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold">{highlightNumbers(t("section4_title"))}</h2>
        <p>{highlightNumbers(t("section4_description"))}</p>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section4_list") as string[])}
        </ul>
        <p>{highlightNumbers(t("section4_note"))}</p>

        {/* Section 5 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section5_title"))}</h2>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section5_list") as string[])}
        </ul>
        <p>{highlightNumbers(t("section5_note"))}</p>

        {/* Section 6 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section6_title"))}</h2>
        <p>{highlightNumbers(t("section6_description"))}</p>
        <ul className="list-disc ml-6">
          {renderList(t.raw("section6_list") as string[])}
        </ul>
        <p>{highlightNumbers(t("section6_note"))}</p>

        {/* Section 7 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section7_title"))}</h2>
        <p>{highlightNumbers(t("section7_description"))}</p>

        {/* Section 8 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section8_title"))}</h2>
        <p>{highlightNumbers(t("section8_description"))}</p>

        {/* Section 9 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section9_title"))}</h2>
        <p>{highlightNumbers(t("section9_description"))}</p>

        {/* Section 10 */}
        <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section10_title"))}</h2>
        <p>{highlightNumbers(t("section10_description"))}</p>
        <p><strong>Email:</strong> {highlightNumbers(t("contact_email"))}</p>
        <Link href={'https://www.cognilabs.org/'}><strong>Website:</strong> {t("contact_website")}</Link>
      </div>
      <Footer/>
    </div>
  );
}

"use client"
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Footer from '~/components/Footer';

export default function Page() {
  const t = useTranslations("Privacy");
  const [activeSection, setActiveSection] = useState('intro');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'intro', 'section1', 'section2', 'section3', 'section4',
        'section5', 'section6', 'section7', 'section8', 'section9', 'section10'
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const highlightNumbers = (text: string) => {
    const parts = text.split(/(\d+\.?\d*)/g); 
    return parts.map((part, i) =>
      /\d/.test(part) ? (
        <span key={i} className="text-blue-500">{part}</span>
      ) : (
        part
      )
    );
  };

  const renderList = (list: string[]) =>
    list.map((item, i) => <li key={i}>{highlightNumbers(item)}</li>);

  // Sidebar navigation items
  const navItems = [
    { id: 'intro', label: t("title") },
    { id: 'section1', label: t("section1_title") },
    { id: 'section2', label: t("section2_title") },
    { id: 'section3', label: t("section3_title") },
    { id: 'section4', label: t("section4_title") },
    { id: 'section5', label: t("section5_title") },
    { id: 'section6', label: t("section6_title") },
    { id: 'section7', label: t("section7_title") },
    { id: 'section8', label: t("section8_title") },
    { id: 'section9', label: t("section9_title") },
    { id: 'section10', label: t("section10_title") }
  ];

  return (
    <div className='bg-black'>
      <div className="max-w-7xl mx-auto py-10 pt-40 px-4 flex gap-6">
        {/* Sidebar Navigation - Compact */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 bg-gray-900/50 backdrop-blur-sm rounded-xl p-3 border border-gray-800">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-white font-medium text-sm">Contents</h3>
              <button className="text-gray-500 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <nav className="space-y-0.5 max-h-[70vh]  overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <span className="line-clamp-2">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl space-y-6 text-white">
          {/* Title */}
          <div id="intro">
            <h1 className="text-3xl font-bold">{highlightNumbers(t("title"))}</h1>
            <p className="text-gray-200 pb-4 underline">{highlightNumbers(t("lastUpdated"))}</p>
            <p>{highlightNumbers(t("intro"))}</p>
          </div>

          {/* Section 1 */}
          <div id="section1">
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
          </div>

          {/* Section 2 */}
          <div id="section2">
            <h2 className="text-2xl font-semibold">{highlightNumbers(t("section2_title"))}</h2>
            <ul className="list-disc ml-6">
              {renderList(t.raw("section2_list") as string[])}
            </ul>
          </div>

          {/* Section 3 */}
          <div id="section3">
            <h2 className="text-2xl font-semibold">{highlightNumbers(t("section3_title"))}</h2>
            <p>{highlightNumbers(t("section3_description"))}</p>
            <ul className="list-disc ml-6">
              {renderList(t.raw("section3_list") as string[])}
            </ul>
          </div>

          {/* Section 4 */}
          <div id="section4">
            <h2 className="text-2xl font-semibold">{highlightNumbers(t("section4_title"))}</h2>
            <p>{highlightNumbers(t("section4_description"))}</p>
            <ul className="list-disc ml-6">
              {renderList(t.raw("section4_list") as string[])}
            </ul>
            <p>{highlightNumbers(t("section4_note"))}</p>
          </div>

          {/* Section 5 */}
          <div id="section5">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section5_title"))}</h2>
            <ul className="list-disc ml-6">
              {renderList(t.raw("section5_list") as string[])}
            </ul>
            <p>{highlightNumbers(t("section5_note"))}</p>
          </div>

          {/* Section 6 */}
          <div id="section6">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section6_title"))}</h2>
            <p>{highlightNumbers(t("section6_description"))}</p>
            <ul className="list-disc ml-6">
              {renderList(t.raw("section6_list") as string[])}
            </ul>
            <p>{highlightNumbers(t("section6_note"))}</p>
          </div>

          {/* Section 7 */}
          <div id="section7">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section7_title"))}</h2>
            <p>{highlightNumbers(t("section7_description"))}</p>
          </div>

          {/* Section 8 */}
          <div id="section8">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section8_title"))}</h2>
            <p>{highlightNumbers(t("section8_description"))}</p>
          </div>

          {/* Section 9 */}
          <div id="section9">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section9_title"))}</h2>
            <p>{highlightNumbers(t("section9_description"))}</p>
          </div>

          {/* Section 10 */}
          <div id="section10">
            <h2 className="text-2xl pt-2 font-semibold">{highlightNumbers(t("section10_title"))}</h2>
            <p>{highlightNumbers(t("section10_description"))}</p>
            <p><strong>Email:</strong> {highlightNumbers(t("contact_email"))}</p>
            <Link href={'https://www.cognilabs.org/'}><strong>Website:</strong> {t("contact_website")}</Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
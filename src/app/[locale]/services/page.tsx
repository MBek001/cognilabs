'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import RequestForm from '~/components/RequestForm';
import Footer from '~/components/Footer';

export default function ServicesPage() {
  const t = useTranslations('Services');

  const services = [
    { title: t('ai'), desc: t('ai-text') },
    { title: t('tg-bot'), desc: t('tg-bot-text') },
    { title: t('web-dev'), desc: t('web-dev-text') },
    { title: t('web-app-dev'), desc: t('web-app-dev-text') },
    { title: t('mobile-dev'), desc: t('mobile-dev-text') },
    { title: t('crm'), desc: t('crm-text') },
  ];

  const handleScroll = (id:any) => {
    const section = document.getElementById(id);
    // console.log(id);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll bilan chiziq va nuqta harakatlanishi uchun
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Timeline ko‘rinishga kirganda boshlanadi
      if (rect.top <= 0 && rect.bottom >= windowHeight * 0.3) {
        const scrolled = window.scrollY - (timeline.offsetTop - windowHeight * 0.3);
        const total = timeline.offsetHeight - windowHeight * 0.7;
        const percentage = Math.min(Math.max(scrolled / total, 0), 1);
        setProgress(percentage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Dastlabki holat

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-5xl mx-auto text-center mb-20 md:mb-24 lg:mb-32">
          <div className="inline-block bg-gray-900/60 backdrop-blur-md rounded-3xl px-10 py-8 md:px-16 md:py-10 border border-gray-800 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-600">
              {t('service')}
            </h2>
          </div>
        </div>

        {/* Services Timeline */}
        <div ref={timelineRef} className="relative max-w-7xl mx-auto">
          {/* Animated Vertical Line */}
          <div
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-60 hidden md:block"
            style={{
              height: '100%',
              background: `linear-gradient(to bottom, transparent 0%, #374151 30%, #374151 70%, transparent 100%)`,
            }}
          >
            {/* Progress Line */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-cyan-400 transition-all duration-300"
              style={{
                height: `${progress * 100}%`,
              }}
            />
          </div>

          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative gap-20 flex items-center mb-24 md:mb-32 lg:mb-40 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot (Scroll bilan harakatlanadi) */}
                <div
                  className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border-4 border-black shadow-lg z-20 transition-all duration-300"
                  style={{
                    top: `${progress * 100}%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                />

                {/* Service Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    isEven
                      ? 'pr-16 md:pr-0 md:pl-32 lg:pl-40'
                      : 'pl-16 md:pl-0 md:pr-32 lg:pr-40'
                  }`}
                >
                  <div className="group bg-gray-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-gray-800 hover:border-cyan-500/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed mb-6">
                      {service.desc}
                    </p>
                    <button
                       onClick={() => handleScroll('contact')}
                      className="inline-flex items-center gap-3 text-cyan-400 hover:text-blue-300 font-semibold text-sm md:text-base group-hover:gap-5 transition-all duration-300"
                    >
                      {t('use-service')}
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <RequestForm/>
      </div>
      <div>
        <section className="bg-black text-white py-24 md:py-32 lg:py-40">
      <div className=" px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-4xl font-bold leading-tight">
            <span className="block text-white opacity-90">
              We Offer A Range Of Services Including
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600  to-blue-400">
              Website And Mobile App Development, AI Integration,
            </span>
            <span className="block text-white opacity-90 mt-2">
              Custom Software, And Digital Solutions To Boost Business Efficiency.
            </span>
          </h1>
        </div>
      </div>
    </section>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
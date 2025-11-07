import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import Faq from '~/components/Faq';
import Footer from '~/components/Footer';
import RequestForm from '~/components/RequestForm';

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pt-20 lg:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Logo va Title */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16 lg:mb-20">
          <div className="relative w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48 lg:w-96 lg:h-56">
            <Image
              src="/logomini.png"
              alt="Cognilabs Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className=" text-xl sm:text-2xl md:text-3xl font-thin text-gray-400 tracking-wider">
            {t('title')}
          </h3>
        </div>

        {/* About Content */}
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 text-gray-300">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left">
            {t('about')}
          </h4>

          <div className="space-y-4  sm:text-base text-base md:text-lg leading-relaxed text-center md:text-left">
            <p>{t('text1')}</p>
            <p className='pt-8'>{t('text2')}</p>
          </div>
        </div>
      </div>
      <div className='pt-24'>
        <RequestForm/>
      </div>
      <div className='pt-40'>
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 text-gray-300">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left">
            {t('ourgoal')}
          </h4>

          <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left">
            <p>{t('text3')}</p>
            <p className='pt-8'>{t('text4')}</p>
          </div>
        </div>
      </div>
      <div className='pt-40'>
        <Footer/>
      </div>
    </div>
  );
}
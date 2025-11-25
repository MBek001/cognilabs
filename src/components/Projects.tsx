"use client"
import React, { use, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Project {
  id: number;
  title: string;
  phone: string;
  desktop: string;
  link: string;
  text: string;
  position: 'left' | 'right';
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const t = useTranslations('Projects');

  const projects = [
    {
      id: 1,
      title: "Djafariy",
      phone: "/mainprojects/phonedjaffariy.png",
      desktop: "/mainprojects/djafariylaptop.png",
      link: "https://djafariy.org/",
      text: t('djafariytext'),
      position: 'right'
    },
    {   
      id: 2,
      title: "Billur",
      phone: "/mainprojects/billurphone.png",
      desktop: "/mainprojects/billurlaptop.png",
      link: "https://billur-market.com",
      text: t('billurtext'),
      position: 'left'
    },
    {
      id: 3,
      title: "Bazabarbershop",
      phone: "/mainprojects/phonebaza.png",
      desktop: "/mainprojects/desktopbaza.png",
      link: "https://www.bazabarbershop.com/",
      text: t('bazatext'),
      position: 'right'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.scrollHeight;

      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const windowCenter = window.innerHeight / 2;

          if (Math.abs(elementCenter - windowCenter) < 200) {
            setActiveProject(index);
          }
        }
      });

      const relativeScroll = scrollTop - containerTop + window.innerHeight / 2;
      const progress = Math.min(Math.max(relativeScroll / containerHeight, 0), 1);
      setLineProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='bg-black min-h-screen'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center py-12 md:py-16 gap-4 md:gap-6 text-center px-4"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          <span className="text-white">{t('ourprojects').split(" ")[0]}</span>
          <span className="text-blue-500"> {t('ourprojects').split(" ")[1]}</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl max-w-[600px] text-[#FFFFFFB2]">
          {t('text')}
        </p>
      </motion.div>

      <div ref={containerRef} className="relative py-12 md:py-20 px-4 md:px-8">
        {/* Desktop-only timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-500 transform -translate-x-1/2 hidden md:block">
          <motion.div
            className="absolute top-0 left-0 w-full bg-blue-500"
            style={{ height: `${lineProgress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${lineProgress * 100}%` }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-5 h-5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`
                flex flex-col-reverse
                md:flex-row
                items-center lg:gap-16
                ${project.position === 'left' ? 'md:flex-row-reverse' : ''}
              `}
            >
              {/* TEXT CONTENT */}
              <motion.div 
                initial={{ opacity: 0, x: project.position === 'left' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`flex-1 w-full ${project.position === 'left' ? 'md:text-right md:pr-16' : 'md:pl-10'}`}
              >
                <h3
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 ${
                    project.position === 'left' ? 'text-left md:text-left pl-10' : 'text-left pr-10 md:text-right'
                  }`}
                >
                  {project.title}
                </h3>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`h-0.5 mb-3 md:mb-4 w-full md:max-w-[540px] bg-white ${
                    project.position === 'left' ? 'md:ml-auto origin-right' : 'origin-left'
                  }`} 
                />

                <p
                  className={`text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 ${
                    project.position === "left" 
                      ? "text-left md:text-left md:pl-10 md:max-w-[540px]" 
                      : "text-left md:text-right md:max-w-[540px]"
                  }`}
                >
                  {project.text}
                </p>

                <motion.a
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ x: 5 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-blue-500 hover:text-blue-400 text-base md:text-lg font-semibold transition-colors ${
                    project.position === 'left' 
                      ? 'justify-start md:justify-start md:pl-2 md:ml-auto md:max-w-[540px]' 
                      : 'justify-start md:justify-end md:max-w-[540px]'
                  }`}
                >
                  {t("visitProject")}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </motion.a>
              </motion.div>

              {/* IMAGES CONTAINER */}
              <motion.div 
                initial={{ opacity: 0, x: project.position === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="flex-1 w-full relative"
              >
                <div className="relative flex items-center justify-center group">
                  {/* Desktop Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative w-full max-w-[600px] z-10 transition-transform duration-500 ease-out group-hover:scale-[1.02] md:group-hover:scale-[1.05]"
                  >
                    <img
                      src={project.desktop}
                      alt={`${project.title} Desktop`}
                      className="w-full h-auto rounded-lg"
                    />
                  </motion.div>

                  {/* Mobile Phone Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`
                      absolute bottom-0 z-20 transition-all duration-500 
                      group-hover:-translate-y-2 md:group-hover:-translate-y-4 
                      group-hover:scale-[1.02] md:group-hover:scale-[1.03]
                      ${project.position === "left"
                        ? "right-60 md:-right-8 lg:-left-18"
                        : "left-60 md:-left-8 lg:-left-18"
                      }
                    `}
                  >
                    <img 
                      src={project.phone} 
                      alt={`${project.title} Mobile`}
                      className="w-60 h-40 md:w-100 md:h-80"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='flex justify-center py-12 md:py-20'
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/portfolio"
          className='text-base md:text-xl text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-colors duration-300 inline-flex items-center gap-2'
        >
          {t("viewMore")}
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.a>
      </motion.div>
    </div>
  );
}
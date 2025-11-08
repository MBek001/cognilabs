"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function Projects() {
  const t = useTranslations("Projects");
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  const projects = [
    { name: "ErixConsulting", image: "/erixConsulting.png", text: t("erixConsultingtext"), reverse: false },
    { name: "FriendSpace", image: "/friendspace.png", text: t("friendSpacetext"), reverse: true },
    { name: "Moment Logistics", image: "/momentLogistics.png", text: t("momentLogistics"), reverse: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current!;
        const rect = container.getBoundingClientRect();
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollTop = window.scrollY || window.pageYOffset;
        const offsetTop = container.offsetTop;
        const scrollableDistance = containerHeight - windowHeight;

        const progress = Math.min(Math.max((scrollTop - offsetTop) / scrollableDistance, 0), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white px-4 sm:px-0 relative py-20">
      {/* Title */}
      <div
        className="flex flex-col items-center mb-16 gap-6 text-center"
        style={{
          opacity: Math.max(1 - scrollProgress * 2, 0),
          transform: `translateY(${scrollProgress * -80}px)`,
          willChange: "transform, opacity",
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
        }}
      >
        <h2 className="text-4xl sm:text-7xl font-semibold leading-tight">
          {t("ourprojects").split(" ").map((word, index) => (
            <span key={index} className={index === 1 ? "text-blue-500" : ""}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <p className="text-lg sm:text-2xl max-w-[600px] text-[#FFFFFFB2]">{t("text")}</p>
      </div>

      {/* Projects */}
      <div className="flex flex-col justify-center items-center gap-12">
        {projects.map((project, index) => {
          const projectStart = index * 0.3;
          const projectEnd = projectStart + 0.25;
          const projectProgress = Math.min(Math.max((scrollProgress - projectStart) / 0.25, 0), 1);

          const isPassed = scrollProgress > projectEnd;
          const isUpcoming = scrollProgress < projectStart;

          return (
            <div
              key={index}
              className={`flex flex-col sm:flex-row gap-10 items-center sm:px-20 px-4 py-8 rounded-4xl group hover:bg-[#2E2F30] ${
                project.reverse ? "sm:flex-row-reverse" : ""
              }`}
              style={{
                opacity: isUpcoming ? 0 : isPassed ? 0.4 : 1,
                transform: `scale(${isUpcoming ? 0.85 : isPassed ? 0.95 : 0.85 + projectProgress * 0.15}) translateY(${
                  isUpcoming ? 80 : isPassed ? -30 : (1 - projectProgress) * 80
                }px)`,
                // blur o'chirildi
                willChange: "transform, opacity",
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
              }}
            >
              <div className="flex justify-center w-full sm:w-auto flex-shrink-0">
                <Image
                  className="rounded-3xl sm:rounded-4xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,102,255,1)]"
                  src={project.image}
                  width={350}
                  height={420}
                  alt={project.name}
                  priority
                />
              </div>
              <div className="flex flex-col gap-4 sm:gap-8 max-w-[480px] text-center sm:text-left">
                <h3 className="text-3xl sm:text-5xl font-semibold">{project.name}</h3>
                <p className="text-lg sm:text-2xl text-[#FFFFFFB2] leading-relaxed">{project.text}</p>
                <button className="flex justify-center sm:justify-start text-xl sm:text-2xl text-[#0066FF] items-center group/btn">
                  {t("visitProject")}
                  <span className="flex items-center justify-center text-xl sm:text-2xl ml-2 transition-transform group-hover/btn:translate-x-2">
                    <Image src={"/arrow.png"} width={24} height={24} alt="arrow" />
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More */}
      <button
        className="flex mx-auto items-center p-4 px-6 text-xl sm:text-2xl rounded-2xl bg-blue-800 hover:bg-blue-700 transition-all duration-500 mt-20"
        style={{
          opacity: scrollProgress > 0.85 ? (scrollProgress - 0.85) / 0.15 : 0,
          transform: `translateY(${Math.max((1 - (scrollProgress - 0.85) / 0.15) * 50, 0)}px)`,
          willChange: "transform, opacity",
        }}
      >
        {t("viewMore")}
      </button>
    </div>
  );
}

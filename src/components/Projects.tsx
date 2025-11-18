"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

interface Project {
  name: string;
  image: string;
  text: string;
  reverse?: boolean;
}

export default function Projects() {
  const t = useTranslations("Projects");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const projects: Project[] = useMemo(() => [
    { name: "ErixConsulting", image: "/erixConsulting.png", text: t("erixConsultingtext") },
    { name: "FriendSpace", image: "/friendspace.png", text: t("friendSpacetext"), reverse: true },
    { name: "Moment Logistics", image: "/momentLogistics.png", text: t("momentLogistics") },
  ], [t]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current!;
        const scrollTop = window.scrollY || window.pageYOffset;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollable = containerHeight - windowHeight;
        const progress = scrollable > 0 ? clamp01((scrollTop - containerTop) / scrollable) : 0;
        setScrollProgress(progress);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Smooth interpolation
  useEffect(() => {
    let anim: number;
    const smooth = 0.12;
    const animate = () => {
      setSmoothScrollProgress(prev => {
        const diff = scrollProgress - prev;
        if (Math.abs(diff) < 0.001) return scrollProgress;
        return prev + diff * smooth;
      });
      anim = requestAnimationFrame(animate);
    };
    anim = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(anim);
  }, [scrollProgress]);

  const scrollActiveIndex = useMemo(() => {
    const mids = projects.map((_, i) => i * 0.3 + 0.15);
    let best = 0;
    let bestDist = Infinity;
    mids.forEach((m, i) => {
      const d = Math.abs(smoothScrollProgress - m);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }, [smoothScrollProgress, projects.length]);

  const activeIndex = hovered ?? selected ?? scrollActiveIndex;

  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white px-4 sm:px-0 relative pb-20">
      {/* Title */}
      <div
        className="flex flex-col items-center mb-16 gap-6 text-center"
        style={{
          opacity: Math.max(1 - smoothScrollProgress * 2, 0),
          transform: `translateY(${smoothScrollProgress * -80}px)`,
          willChange: "transform, opacity",
        }}
      >
        <h2 className="text-4xl sm:text-6xl font-semibold leading-tight">
          {t("ourprojects").split(" ").map((word, idx) => (
            <span key={idx} className={idx === 1 ? "text-blue-500" : ""}>{word} </span>
          ))}
        </h2>
        <p className="text-lg sm:text-2xl max-w-[600px] text-[#FFFFFFB2]">{t("text")}</p>
      </div>

      {/* Project Cards */}
      <div className="flex flex-col justify-center items-center gap-8 sm:gap-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isActive={index === activeIndex}
            smoothScrollProgress={smoothScrollProgress}
            index={index}
            setHovered={setHovered}
            setSelected={setSelected}
            cardsRef={cardsRef}
            setCardRef={setCardRef}
          />
        ))}
      </div>

      {/* View More */}
      <button
        className="flex mx-auto items-center p-4 px-6 text-xl sm:text-2xl rounded-2xl bg-blue-800 hover:bg-blue-700 transition-all duration-300 mt-16 sm:mt-20"
        style={{
          opacity: smoothScrollProgress > 0.85 ? (smoothScrollProgress - 0.85) / 0.15 : 0,
          transform: `translateY(${Math.max((1 - (smoothScrollProgress - 0.85) / 0.15) * 32, 0)}px)`,
          willChange: "transform, opacity",
        }}
      >
        {t("viewMore")}
      </button>
    </div>
  );
}

// Reusable Project Card
interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  smoothScrollProgress: number;
  index: number;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  setCardRef: (i: number) => (el: HTMLDivElement | null) => void;
}

function ProjectCard({
  project,
  isActive,
  smoothScrollProgress,
  index,
  setHovered,
  setSelected,
  cardsRef,
  setCardRef,
}: ProjectCardProps) {
  const t = useTranslations("Projects");
  const projectStart = index * 0.3;
  const projectEnd = projectStart + 0.25;
  const projectProgress = clamp01((smoothScrollProgress - projectStart) / 0.25);

  const isPassed = smoothScrollProgress > projectEnd;
  const isUpcoming = smoothScrollProgress < projectStart;

  // Base animations
  const baseOpacity = isUpcoming ? 0 : isPassed ? 0.5 : lerp(0.6, 1, projectProgress);
  const baseScale = isUpcoming ? 0.92 : isPassed ? 0.96 : lerp(0.92, 1, projectProgress);
  const baseTranslateY = isUpcoming ? 60 : isPassed ? -20 : lerp(60, 0, projectProgress);

  const finalScale = isActive ? baseScale * 1.03 : baseScale * 0.98;
  const finalOpacity = isActive ? 1 : Math.min(baseOpacity, 0.6);
  const finalTranslateY = isActive ? baseTranslateY - 8 : baseTranslateY;

  return (
    <div
      ref={setCardRef(index)}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        setSelected(index);
        cardsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className={`relative flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:px-8 px-4 py-6 rounded-2xl group cursor-pointer ${
        project.reverse ? "sm:flex-row-reverse" : ""
      } ${isActive ? "bg-[#22252A] ring-1 ring-[#246BFF]/40" : "hover:bg-[#2E2F30]/50"}`}
      style={{
        opacity: finalOpacity,
        transform: `scale(${finalScale}) translateY(${finalTranslateY}px)`,
        transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 350ms ease-out, background-color 300ms ease, box-shadow 400ms ease",
        willChange: "transform, opacity",
        zIndex: isActive ? 10 : 0,
        boxShadow: isActive ? "0 20px 40px rgba(36,107,255,0.2)" : "none",
      }}
    >
      <div className="flex justify-center w-full sm:w-auto flex-shrink-0">
        <Image
          className={`rounded-2xl sm:rounded-3xl transition-shadow duration-300 ${
            isActive ? "shadow-[0_0_40px_rgba(36,107,255,0.35)]" : "group-hover:shadow-[0_0_30px_rgba(0,102,255,0.25)]"
          }`}
          src={project.image}
          width={300}
          height={380}
          alt={project.name}
          sizes="(max-width: 640px) 85vw, 300px"
        />
      </div>

      <div className="flex flex-col gap-3 sm:gap-6 max-w-[420px] text-center sm:text-left">
        <h3 className="text-2xl sm:text-4xl font-semibold">{project.name}</h3>
        <p className="text-base sm:text-lg text-[#FFFFFFB2] leading-relaxed">{project.text}</p>
        <button
          className="flex justify-center sm:justify-start text-lg sm:text-xl text-[#66A3FF] hover:text-[#7fb2ff] items-center group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            setSelected(index);
            cardsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          {t("visitProject")}
          <span className="flex items-center justify-center text-lg sm:text-xl ml-2 transition-transform duration-300 group-hover/btn:translate-x-2">
            <Image src="/arrow.png" width={20} height={20} alt="arrow" />
          </span>
        </button>
      </div>
    </div>
  );
}

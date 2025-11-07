"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function Projects() {
  const t = useTranslations("Projects");

  const projects = [
    {
      name: "ErixConsulting",
      image: "/erixConsulting.png",
      text: t("erixConsultingtext"),
      reverse: false,
    },
    {
      name: "FriendSpace",
      image: "/friendspace.png",
      text: t("friendSpacetext"),
      reverse: true,
    },
    {
      name: "Moment Logistics",
      image: "/momentLogistics.png",
      text: t("momentLogistics"),
      reverse: false,
    },
  ];

  return (
    <div className="bg-black text-white px-4 sm:px-0">
      {/* === Title Section === */}
      <div className="flex mx-auto items-center pt-32 sm:pt-40 mb-14 sm:mb-20 gap-6 justify-center flex-col text-center">
        <h2 className="text-4xl sm:text-7xl font-semibold leading-tight">
          {(() => {
            const words = t("ourprojects").split(" ");
            return (
              <>
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={index === 1 ? "text-blue-500" : ""}
                  >
                    {word}{" "}
                  </span>
                ))}
              </>
            );
          })()}
        </h2>

        <p className="text-lg sm:text-2xl max-w-[350px] sm:max-w-[600px] text-[#FFFFFFB2]">
          {t("text")}
        </p>
      </div>

      {/* === Projects Section === */}
      <div className="flex flex-col justify-center items-center gap-12 sm:gap-20 mb-28 sm:mb-40">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col sm:flex-row cursor-pointer hover:border-b-blue-500 items-center sm:px-28 px-4 gap-8 sm:gap-10 py-10 sm:py-12 rounded-4xl group hover:bg-[#2E2F30] transition-all duration-300 ${
                project.reverse ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* === Image === */}
              <div className="flex justify-center w-full sm:w-auto">
                <Image
                  className="rounded-3xl sm:rounded-4xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,102,255,1)]"
                  src={project.image}
                  width={350}
                  height={420}
                  alt={project.name}
                />
              </div>

              {/* === Text Section === */}
              <div className="flex flex-col gap-6 sm:gap-10 max-w-[480px] text-center sm:text-left mt-6 sm:mt-0">
                <h3 className="text-3xl sm:text-5xl font-semibold">
                  {project.name}
                </h3>
                <p className="text-lg sm:text-2xl text-[#FFFFFFB2] leading-relaxed">
                  {project.text}
                </p>
                <button className="flex justify-center sm:justify-start hover:cursor-pointer text-xl sm:text-2xl text-[#0066FF] items-center">
                  {t("visitProject")}
                  <span className="flex items-center justify-center text-xl sm:text-2xl ml-2">
                    <Image
                      src={"/arrow.png"}
                      width={24}
                      height={24}
                      alt="arrow"
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* === Frame Images === */}
            {index === 0 && (
              <Image
                src="/frame0.png"
                width={400}
                height={400}
                alt="Frame 0"
                className="sm:w-[600px] sm:h-20 w-[300px] h-auto"
              />
            )}
            {index === 1 && (
              <Image
                src="/frame1.png"
                width={400}
                height={400}
                alt="Frame 1"
                className="sm:w-[600px] sm:h-20 w-[300px] h-auto"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* === View More Button === */}
      <button className="flex mx-auto   items-center p-3 sm:p-4 px-6 sm:px-8 text-lg sm:text-xl rounded-2xl bg-blue-800 hover:bg-blue-700 transition">
        {t("viewMore")}
      </button>
    </div>
  );
}

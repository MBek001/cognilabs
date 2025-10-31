import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

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
    <div className='bg-black'>
      {/* Title Section */}
      <div className="flex mx-auto items-center  pt-40 mb-20 gap-8 justify-center flex-col">
        <h2 className="text-7xl font-semibold">
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

        {<p className="text-2xl max-w-[600px] text-[#FFFFFFB2] text-center">{t("text")}</p>}
      </div>

      {/* Projects Section */}
      <div className="flex flex-col justify-center items-center gap-8 mb-40">
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center px-28 gap-10 py-12 rounded-4xl group hover:bg-[#2E2F30] transition-all duration-300 ${
                project.reverse ? "flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div>
                <Image
                  className="rounded-4xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,102,255,1)]"
                  src={project.image}
                  width={399}
                  height={472}
                  alt={project.name}
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col gap-10 max-w-[506px]">
                <h3 className="text-5xl font-semibold">{project.name}</h3>
                <p className="text-2xl text-[#FFFFFFB2]">{project.text}</p>
                <button className="flex hover:cursor-pointer text-2xl text-[#0066FF] items-center">
                  {t("visitProject")}{" "}
                  <span className="flex items-center justify-center text-2xl ml-2">
                                  <Image src={'/arrow.png'} width={28} height={28} alt="arrow"/>
                    
                  </span>
                </button>
              </div>
            </div>

            {/* Frame images below each project */}
            {index === 0 && (
              <Image src="/frame0.png" width={600} height={550} alt="Frame 0" />
            )}

            {index === 1 && (
              <Image src="/frame1.png" width={600} height={550} alt="Frame 1" />
            )}
          </React.Fragment>
        ))}
      </div>
      <button className='flex mx-auto  items-center p-4 px-8 text-xl rounded-2xl bg-blue-800'>
        {t("viewMore")}
      </button>
    </div>
  );
}

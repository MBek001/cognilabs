import Image from "next/image";
import React from "react";

export default function Vacancies() {
  const vacancies = [
    {
      title: "Programmer",
      image: "/careers/programmer.png",
      text: "If you are passionate about programming and eager to make a difference, we want to hear from you. Apply today by sending your resume and portfolio"
    },
    {
      title: "AI Researcher",
      image: "/careers/ai.png",
      text: "If you are passionate about AI researching and eager to make a difference, we want to hear from you. Apply today by sending your resume and portfolio"
    },
    {
      title: "Designer",
      image: "/careers/designer.png",
      text: "If you are passionate about designing and eager to make a difference, we want to hear from you. Apply today by sending your resume and portfolio"
    },
    {
      title: "Marketolog",
      image: "/careers/marketing.png",
      text: "If you are passionate about marketing and eager to make a difference, we want to hear from you. Apply today by sending your resume and portfolio"
    }
  ];

  return (
    <div className="bg-[#0C0C11] pt-24 pb-20">
      <div className="container mx-auto px-4">

        {/* TITLE SECTION */}
        <div className="flex justify-center items-center flex-col text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent">
              Vacancies
            </span>{" "}
            available
          </h2>

          <p className="
            text-base sm:text-lg md:text-xl 
            pt-8 text-gray-300 leading-relaxed 
            max-w-[850px]
          ">
            We're always looking for talented individuals to join our growing team at Cognilabs. 
            Explore our open positions and take the next step in your career with a company that 
            values innovation, growth, and collaboration.
          </p>
        </div>

        {/* VACANCY CARDS */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-12 
            max-w-[900px] 
            mx-auto 
            mt-20
          "
        >
          {vacancies.map((vac, i) => (
            <div
              key={i}
              className="
                rounded-3xl 
                overflow-hidden 
                bg-[#111]
                shadow-lg 
                transition-all 
                duration-300 
                hover:scale-[1.02]
                cursor-pointer 
                flex 
                flex-col
              "
            >
              {/* IMAGE */}
              <div className="relative h-[240px] sm:h-[260px] md:h-[300px] w-full">
                <Image
                  src={vac.image}
                  alt={vac.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="
                bg-gradient-to-b 
                from-[#0066FF] 
                to-[#0041A8] 
                p-6 sm:p-8 
                text-white 
                rounded-b-3xl
              ">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  {vac.title}
                </h3>

                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {vac.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

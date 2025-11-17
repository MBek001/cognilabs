import Image from "next/image";
import React from "react";

export default function Part1() {
  return (
    <div className="bg-black w-full pt-30 pb-20">
      <div
        className="
        
          container mx-auto 
          flex flex-col lg:flex-row 
          items-center justify-between
          px-4 lg:px-10 
          py-16 lg:py-20
          gap-10 lg:gap-20
        "
      >
        {/* LEFT TEXT */}
        <div className="text-center lg:text-left max-w-[550px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Unlock{" "}
            <span className="text-[#0066FF]">Your Potential</span> at Cognilabs
          </h2>

          <p className="text-base sm:text-lg md:text-xl pt-4 max-w-[530px] mx-auto lg:mx-0">
            Become part of a fast-growing tech company that values expertise,
            creativity, and constant growth.
          </p>
        </div>

        {/* RIGHT IMAGE + BACKGROUND */}
        <div
          className="
            relative 
            w-full 
            max-w-[700px] 
            h-[320px] sm:h-[400px] md:h-[500px] 
            flex items-center justify-center
          "
        >
          {/* BLUE CIRCLE BG */}
          <div
            className="
              absolute 
              w-[350px] sm:w-[450px] md:w-[600px]
              h-[350px] sm:h-[450px] md:h-[600px]
              rounded-full 
              blur-3xl 
              opacity-70 
            "
            style={{
              background:
                "radial-gradient(circle, #003b9a 0%, #001a4d 40%, transparent 100%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          ></div>

          {/* IMAGE */}
          <Image
            className="relative z-10 object-contain"
            src="/careerline.png"
            alt="careers"
            fill
          />
        </div>
      </div>
    </div>
  );
}

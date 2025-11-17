import React from 'react'

export default function WhyUs() {
  const reasons = [
    {
      title: "Innovative Projects",
      text: "Work on cutting-edge technologies and meaningful projects that challenge you to grow and innovate. Your contributions will directly impact the future of industries and businesses worldwide."
    },
    {
      title: "Collaborative Culture",
      text: "We believe in teamwork, transparency, and knowledge-sharing. Collaborate with diverse, talented colleagues who are as passionate about problem-solving as you are. Together, we push boundaries and achieve great things."
    },
    {
      title: "Work-Life Balance",
      text: "At Cognilabs, we provide opportunities for continuous learning and career advancement. Whether it's through mentorship, professional development programs, or exposure to new technologies, we invest in your personal and professional growth."
    },
    {
      title: "Competitive Compensation & Benefits",
      text: "We offer competitive salaries, performance-based incentives, and a comprehensive benefits package. We value your hard work and ensure you're rewarded for your contributions."
    }
  ]

  return (
    <div className="bg-black pt-20 pb-20">
      <div className="container mx-auto px-4">

        {/* TITLE SECTION */}
        <div className="flex justify-center items-center flex-col mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            Why <span className="text-blue-600">Join</span> Us?
          </h2>

          <p className="max-w-[850px] text-base sm:text-lg lg:text-xl pt-6 sm:pt-8 font-inter text-gray-300 leading-[26px] sm:leading-[30px] lg:leading-[32px]">
            We're always looking for talented individuals to join our growing team at Cognilabs. 
            Explore our open positions and take the next step in your career with a company that 
            values innovation, growth, and collaboration.
          </p>
        </div>

        {/* REASONS LIST */}
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">

          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
            >
              {/* NUMBER */}
              <div className="flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {index + 1}.
                </span>
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {reason.text}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

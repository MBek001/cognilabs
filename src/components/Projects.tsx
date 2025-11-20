import { ArrowRight } from 'lucide-react'
import React from 'react'

export default function Projects() {
  const projects = [
    {
      id:1,
      title: "Bazabarbershop",
      logo: "/projects/baza.png",
      link: "https://www.bazabarbershop.com",
      text: "Fantastic service! They built us a clean, modern website that fits our barbershop perfectly. Easy to work with and delivered exactly what we needed."
    },
    {
      id:2,
      title: "Billur",
      logo: "/projects/billur.png",
      link: "https://billur-market.com",
      text: "Great service! They created a clean, professional website that showcases our cleaning products perfectly. Easy communication and excellent results."
    }
  ]

  return (
    <div className='bg-black min-h-screen p-4 sm:p-8 md:p-16'>
      <div className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          <span>Our </span>
          <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-[600px] text-[#FFFFFFB2]">
          Our projects deliver innovative digital solutions 
that empower businesses.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-8 max-w-6xl mx-auto pt-16 sm:pt-20 md:pt-24'>
        {projects.map((item, index) => (
          <div 
            key={item.id} 
            className='bg-zinc-900 border border-transparent hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 rounded-3xl p-6 sm:p-8 pt-20 sm:pt-24 flex flex-col items-center text-center relative transition-all duration-500 ease-out hover:-translate-y-2 group'
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`
            }}
          >
            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            
            {/* Logo Circle - Responsive sizing */}
            <div className='w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-white rounded-full flex items-center justify-center absolute -top-16 sm:-top-18 md:-top-20 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl shadow-lg'>
              <img 
                src={item.logo} 
                alt={item.title} 
                className='w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 hover:scale-105 object-contain transition-transform duration-700 ease-out'
              />
            </div>
            
            {/* Title */}
            <h3 className='text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 transition-colors duration-300 group-hover:text-blue-400'>
              {item.title}
            </h3>
            
            {/* Description */}
            <p className='text-gray-300 max-w-md text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-1 transition-colors duration-300 group-hover:text-gray-100'>
              {item.text}
            </p>
            
            {/* Footer - Stack on mobile, side-by-side on desktop */}
            <div className='flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0'>
              {/* Rating */}
              <div className='flex items-center gap-2 transition-transform pt-10 duration-300 group-hover:scale-105'>
                <span className='text-white font-semibold'>5.0</span>
                <div className='flex text-yellow-400'>
                  {'⭐⭐⭐⭐⭐'.split('').map((star, i) => (
                    <span 
                      key={i}
                      className='inline-block transition-all duration-300 hover:scale-125 text-sm sm:text-base'
                      style={{
                        transitionDelay: `${i * 50}ms`
                      }}
                    >{star}</span>
                  ))}
                </div>
              </div>
              
              {/* Link */}
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className='text-blue-400 pt-10 hover:text-blue-300 transition-all duration-300 flex items-center gap-2 hover:gap-3 group/link text-sm sm:text-base'
              >
                <span className='transition-all duration-300'>Visit the project</span>
                <span className='transition-transform duration-300 group-hover/link:translate-x-1'>
                  <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5'/>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className='flex justify-center pt-12 sm:pt-16 md:pt-20'>
        <a 
          href="/portfolio" 
          className='text-lg sm:text-xl md:text-2xl font-semibold px-6 sm:px-8 py-3 rounded-2xl bg-blue-800 hover:bg-blue-700 transition-colors duration-300'
        >
          View more
        </a>
      </div>
    </div>
  )
}
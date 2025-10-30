"use client";
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function TrustCases() {
  const t = useTranslations("TrustCases")

  const trustImages = [
    "/trustcases/ellipse1.png",
    "/trustcases/ellipse7.png",
    "/trustcases/ellipse2.png",
    "/trustcases/ellipse3.png",
    "/trustcases/ellipse6.png",
    "/trustcases/ellipse5.png",
    "/trustcases/ellipse4.png",
  ]

  return (
    <div className='bg-[#001F4C] py-16 px-4'> 
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16'>
          {/* Title Animation */}
          <motion.div 
            className='text-white'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
              {t("solutions")
                .split(" ")
                .map((word, index) => {
                  const blueWords = [2, 8, 9]; 
                  return (
                    <span
                      key={index}
                      className={blueWords.includes(index) ? "text-blue-500" : ""}
                    >
                      {word + " "}
                    </span>
                  );
                })}
            </h2>
          </motion.div>

          {/* Text Animation */}
          <motion.div
            className='flex items-center gap-8'
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className='w-1 h-32 bg-white/20'></div>
            <p className='text-white text-lg leading-relaxed'>
              {t("text")}
            </p>
          </motion.div>
        </div>

        {/* Images with stagger animation */}
        <motion.div
          className='flex flex-wrap justify-center items-center gap-6 lg:gap-10'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {trustImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              className='w-37 h-37 rounded-full flex items-center justify-center overflow-hidden transition-transform'
            >
              <Image 
                src={image} 
                alt={`Company ${index + 1}`}
                width={151}
                height={151}
                className='w-full h-full object-contain'
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>    
  )
}

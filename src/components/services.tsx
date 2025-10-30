"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Bot, Globe, Layout, Smartphone, Database } from "lucide-react";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: <Code className="w-10 h-10 text-blue-600" />,
      img: "/services/ai-integration.png",
      title: t("ai"),
      desc: t("ai-text"),
    },
    {
      icon: <Bot className="w-10 h-10 text-blue-600" />,
      img: "/services/tgbot.png",
      title: t("tg-bot"),
      desc: t("tg-bot-text"),
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      img: "/services/web-dev.png",
      title: t("web-dev"),
      desc: t("web-dev-text"),
    },
    {
      icon: <Layout className="w-10 h-10 text-blue-600" />,
      img: "/services/web-app.png",
      title: t("web-app-dev"),
      desc: t("web-app-dev-text"),
    },
    {
      icon: <Smartphone className="w-10 h-10 text-blue-600" />,
      img: "/services/mobileapp.png",
      title: t("mobile-dev"),
      desc: t("mobile-dev-text"),
    },
    {
      icon: <Database className="w-10 h-10 text-blue-600" />,
      img: "/services/crmsys.png",
      title: t("crm"),
      desc: t("crm-text"),
    },
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-4 overflow-hidden">
      <div className="flex flex-col justify-center items-center mx-auto">
        {/* Animated Title */}
        <motion.h2
          className="text-7xl font-semibold mb-4 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-500">
            {t("service").split(" ")[0]}
          </span>{" "}
          {t("service").split(" ").slice(1).join(" ")}
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          className="text-lg text-center text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t("text")}
        </motion.p>
      </div>

      {/* Services Grid with animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 mt-16 max-w-6xl mx-auto relative"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        viewport={{ once: true }}
      >
        {services.map((item, i) => (
          <motion.div
            key={i}
            className="relative"
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 50 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Grid dividers */}
            {(i + 1) % 3 !== 0 && (
              <div className="hidden lg:block absolute right-0 top-0 h-full w-[2px] bg-gray-600"></div>
            )}
            {i < 3 && (
              <div className="hidden lg:block absolute bottom-0 left-0 w-full h-[2px] bg-gray-600"></div>
            )}
            {(i + 1) % 2 !== 0 && i < services.length - 1 && (
              <div className="hidden sm:block lg:hidden absolute right-0 top-0 h-full w-[2px] bg-gray-600"></div>
            )}
            {i < services.length - 1 && (
              <div className="sm:hidden absolute bottom-0 left-0 w-full h-[2px] bg-gray-600"></div>
            )}
            {i < 4 && (
              <div className="hidden sm:block lg:hidden absolute bottom-0 left-0 w-full h-[2px] bg-gray-600"></div>
            )}

            {/* Animated Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white text-black rounded-2xl p-8 m-4 flex flex-col justify-between hover:shadow-[0_0_25px_#2563eb] transition-all duration-300 h-[320px]"
            >
              <div>
                <img
                  className="w-10 h-10 mb-4"
                  src={item.img}
                  alt={item.title}
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{item.desc}</p>
              </div>
              <a
                href="#"
                className="text-blue-600 font-medium text-[16px] flex items-center gap-2 hover:underline"
              >
                Use Service
                <span className="text-xl">→</span>
              </a>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer link animation */}
      <motion.a
        href="#"
        className="text-blue-600 font-medium justify-center pt-10 text-[22px] flex items-center gap-2 hover:underline"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        More Services
        <span className="text-xl">→</span>
      </motion.a>
    </section>
  );
}

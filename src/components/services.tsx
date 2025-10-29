"use client";
import { useTranslations } from "next-intl";
import { Code, Bot, Globe, Layout, Smartphone, Database } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: <Code className="w-10 h-10 text-blue-600" />,
      title: t("ai"),
      desc: t("ai-text"),
    },
    {
      icon: <Bot className="w-10 h-10 text-blue-600" />,
      title: t("tg-bot"),
      desc: t("tg-bot-text"),
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      title: t("web-dev"),
      desc: t("web-dev-text"),
    },
    {
      icon: <Layout className="w-10 h-10 text-blue-600" />,
      title: t("web-app-dev"),
      desc: t("web-app-dev-text"),
    },
    {
      icon: <Smartphone className="w-10 h-10 text-blue-600" />,
      title: t("mobile-dev"),
      desc: t("mobile-dev-text"),
    },
    {
      icon: <Database className="w-10 h-10 text-blue-600" />,
      title: t("crm"),
      desc: t("crm-text"),
    },
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-semibold mb-4">
          <span className="text-blue-500">{t("service").split(" ")[0]}</span>{" "}
          {t("service").split(" ").slice(1).join(" ")}
        </h2>
        <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto">
          {t("text")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {services.map((item, i) => (
          <div
            key={i}
            className="bg-white text-black rounded-2xl p-8 flex flex-col justify-between hover:shadow-[0_0_25px_#2563eb] transition-all duration-300"
          >
            <div>
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
            </div>
            <Link
              href="#"
              className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
            >
              Use Service →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

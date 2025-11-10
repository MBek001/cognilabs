import { useTranslations } from "next-intl";
import React from "react";
import { Phone, Globe, MapPin, Facebook, Send, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");

  const servicesTitle = t("services.title");
  const expertiseTitle = t("expertise.title");

  return (
    <footer className="bg-[#001533] text-white py-12 md:py-16 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Services */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">{servicesTitle}</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-200 text-sm md:text-base">
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item1")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item2")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item3")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item4")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item5")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item6")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("services.item7")}</li>
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">{expertiseTitle}</h4>
            <ul className="space-y-3 md:space-y-4 text-gray-200 text-sm md:text-base">
              <li className="hover:text-white transition-colors cursor-pointer">{t("expertise.item1")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("expertise.item2")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("expertise.item3")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("expertise.item4")}</li>
              <li className="hover:text-white transition-colors cursor-pointer">{t("expertise.item5")}</li>
            </ul>
          </div>

          {/* Contacts & Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">{t("contacts.title")}</h4>
            <div className="space-y-3 text-gray-200 mb-6 text-sm md:text-base">
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={18} className="shrink-0" />
                <span>513-808-88-13</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={18} className="shrink-0" />
                <span>info@cognilabs.org</span>
              </div>
              <div className="flex items-center gap-3 hover:text-white transition-colors">
                <Globe size={18} className="shrink-0" />
                <span className="break-all">www.cognilabs.org</span>
              </div>
            </div>

            <h4 className="text-lg md:text-xl font-semibold mb-3">{t("contacts.offices")}</h4>
            <div className="flex items-center gap-3 text-gray-200 mb-6 text-sm md:text-base hover:text-white transition-colors">
              <MapPin size={18} className="shrink-0" />
              <span>USA / Uzbekistan</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-3 md:gap-2 text-center md:text-left">
              <Image
                src="/logomini.png"
                alt="Cognilabs"
                width={130}
                height={40}
                className="cursor-pointer"
              />
              <span className="text-gray-400 text-xs md:text-sm">
                © 2025 Cognilabs. All rights reserved.
              </span>
            </div>

            {/* Social & Links */}
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
              {/* Social Icons */}
              <div className="flex items-center gap-4 md:gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61577158531453"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://t.me/cognilabs_software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Telegram"
                >
                  <Send size={20} />
                </a>
                <a
                  href="https://www.instagram.com/cognilabs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 text-xs md:text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  Terms and conditions
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

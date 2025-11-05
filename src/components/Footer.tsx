import { useTranslations } from "next-intl";
import React from "react";
import { Phone, Globe, MapPin, Facebook, Send, Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");

  const servicesTitle = t("services.title");
  const expertiseTitle = t("expertise.title");

  return (
    <footer className="bg-[#001533] text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">{servicesTitle}</h4>
            <ul className="space-y-4 sm:space-y-6 text-gray-200 text-sm sm:text-base">
              <li>{t("services.item1")}</li>
              <li>{t("services.item2")}</li>
              <li>{t("services.item3")}</li>
              <li>{t("services.item4")}</li>
              <li>{t("services.item5")}</li>
              <li>{t("services.item6")}</li>
              <li>{t("services.item7")}</li>
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-xl font-semibold mb-6">{expertiseTitle}</h4>
            <ul className="space-y-4 sm:space-y-6 text-gray-200 text-sm sm:text-base">
              <li>{t("expertise.item1")}</li>
              <li>{t("expertise.item2")}</li>
              <li>{t("expertise.item3")}</li>
              <li>{t("expertise.item4")}</li>
              <li>{t("expertise.item5")}</li>
            </ul>
          </div>

          {/* Contacts & Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6">{t("contacts.title")}</h4>
            <div className="space-y-3 text-gray-200 mb-6 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>513-808-88-13</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>USA / Uzbekistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>www.cognilabs.or</span>
              </div>
            </div>

            <h4 className="text-xl font-semibold mb-3">{t("contacts.offices")}</h4>
            <div className="flex items-center gap-3 text-gray-200 mb-6 text-sm sm:text-base">
              <MapPin size={18} />
              <span>USA / Uzbekistan</span>
            </div>

            {/* Newsletter */}
            <div>
              <Image
                src="/logomini.png"
                alt="Cognilabs"
                width={130}
                height={40}
                className="cursor-pointer mb-2"
              />
              <p className="text-gray-300 mb-2 text-sm sm:text-base">Newsletter Sign Up</p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent border border-gray-500 rounded-l-3xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-3xl font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Image
                src="/logomini.png"
                alt="Cognilabs"
                width={130}
                height={40}
                className="cursor-pointer"
              />
              <span className="text-gray-400">© 2025 Cognilabs. All rights reserved.</span>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Send size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors ml-0 sm:ml-8">
                Terms and conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

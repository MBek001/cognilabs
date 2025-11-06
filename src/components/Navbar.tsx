"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-poppins bg-linear-to-r from-black via-black to-[#001a3a] py-4 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Left side - logo */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image
              src="/logomini.png"
              alt="Cognilabs"
              width={130}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-12 text-white text-lg font-medium">
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("home")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("careers")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("services")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("portfolio")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("contact")}
          </li>
          <li>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="bg-[#1b1b1b] text-white rounded-md p-2 focus:outline-none"
            >
              <option value="en">Eng</option>
              <option value="ru">Ru</option>
              <option value="uz">Uz</option>
            </select>
          </li>
        </ul>

        {/* Right side - contact and socials (desktop) */}
        <div className="hidden md:flex flex-col items-center space-x-6">
          <div className="text-[#0066FF] font-semibold text-lg">
            513-384-8324
          </div>

          <div className="flex items-center space-x-3">
            <Image
              src="/facebook.png"
              alt="facebook"
              width={35}
              height={35}
              className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
            />
            <Image
              src="/tg.png"
              alt="telegram"
              width={35}
              height={35}
              className="bg-[#0066FF] p-2 rounded-full cursor-pointer"
            />
            <Image
              src="/ig.png"
              alt="instagram"
              width={35}
              height={35}
              className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md absolute top-15 left-0 w-full text-white flex flex-col items-center space-y-6 py-8 transition-all duration-300">
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("home")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("careers")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("services")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("portfolio")}
          </li>
          <li className="cursor-pointer hover:text-blue-500 transition">
            {t("contact")}
          </li>

          <select
            value={locale}
            onChange={(e) => changeLocale(e.target.value)}
            className="bg-[#1b1b1b] text-white rounded-md p-2 focus:outline-none"
          >
            <option value="en">Eng</option>
            <option value="ru">Ru</option>
            <option value="uz">Uz</option>
          </select>

          <div className="text-[#0066FF] font-semibold text-lg">
            513-384-8324
          </div>

          <div className="flex items-center space-x-3">
            <Image
              src="/facebook.png"
              alt="facebook"
              width={35}
              height={35}
              className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
            />
            <Image
              src="/tg.png"
              alt="telegram"
              width={35}
              height={35}
              className="bg-[#0066FF] p-2 rounded-full cursor-pointer"
            />
            <Image
              src="/ig.png"
              alt="instagram"
              width={35}
              height={35}
              className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

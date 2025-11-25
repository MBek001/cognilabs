"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === "/";

  // Function to check if a link is active
  const isActive = (href: string) => pathname === href;

  const handleContactClick = () => {
    setIsOpen(false);

    if (isHomePage) {
      // If on home page, scroll to contact
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home with hash
      router.push(`/${locale}#contact`);
    }
  };

  // Handle scroll to contact after navigation
  useEffect(() => {
    if (window.location.hash === "#contact") {
      setTimeout(() => {
        const section = document.getElementById("contact");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        window.history.replaceState(null, "", pathname);
      }, 100);
    }
  }, [pathname]);

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-poppins bg-linear-to-r from-black via-black to-[#001a3a] pt-8 pb-2 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-around px-6">
        {/* Logo */}

        <div className="relative flex items-center  justify-center">
          <div
  className="absolute -top-[28px] left-42 -translate-x-1/2"
  style={{
    animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  }}
>
  <p className="text-[12px] font-bold tracking-wide text-white p-1 px-2 bg-blue-900 rounded-3xl whitespace-nowrap">
    <Link href="/careers">{t("hiring")}</Link>
  </p>
</div>


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
        <ul className="hidden md:flex items-center space-x-15 text-white text-lg font-medium">
          <Link href={`/${locale}/about-us`}>
            <li
              className={`cursor-pointer transition ${
                isActive(`/${locale}/about-us`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("home")}
            </li>
          </Link>

          <Link href={`/${locale}/careers`}>
            <li
              className={`cursor-pointer transition ${
                isActive(`/${locale}/careers`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("careers")}
            </li>
          </Link>

          <Link href={`/${locale}/services`}>
            <li
              className={`cursor-pointer transition ${
                isActive(`/${locale}/services`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("services")}
            </li>
          </Link>

          <Link href={`/${locale}/portfolio`}>
            <li
              className={`cursor-pointer transition ${
                isActive(`/${locale}/portfolio`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("portfolio")}
            </li>
          </Link>

          <button
            onClick={handleContactClick}
            className={`cursor-pointer transition ${
              isHomePage ? "hover:text-blue-500" : "hover:text-blue-500"
            }`}
          >
            {t("contact")}
          </button>

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

        {/* Contact + socials (desktop) */}
        <div className="hidden md:flex flex-col items-center space-x-6">
          <div className="text-[#0066FF] font-semibold text-lg">
            {locale === "en" ? "(513) 808-88-13" : "+998 (87) 337-75-77"}
          </div>

          <div className="flex items-center space-x-3">
            <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank">
              <Image
                src="/facebook.png"
                alt="facebook"
                width={35}
                height={35}
                className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
              />
            </Link>
            <Link href="https://t.me/cognilabs_software" target="_blank">
            <div className="w-[37px] h-[37px] bg-[#0066FF] rounded-full flex items-center justify-center">
  <Image
    src="/tg.svg"
    alt="telegram"
    width={24}
    height={24}
    className="cursor-pointer"
  />
</div>

            </Link>
            <Link href="https://www.instagram.com/cognilabs/" target="_blank">
              <Image
                src="/ig.png"
                alt="instagram"
                width={35}
                height={35}
                className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden ml-40 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md absolute top-15 left-0 w-full text-white flex flex-col items-center space-y-6 py-8 transition-all duration-300">
          <Link href={`/${locale}/about-us`} onClick={() => setIsOpen(false)}>
            <p
              className={`cursor-pointer transition ${
                isActive(`/${locale}/about-us`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("home")}
            </p>
          </Link>

          <Link href={`/${locale}/careers`} onClick={() => setIsOpen(false)}>
            <p
              className={`cursor-pointer transition ${
                isActive(`/${locale}/careers`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("careers")}
            </p>
          </Link>

          <Link href={`/${locale}/services`} onClick={() => setIsOpen(false)}>
            <p
              className={`cursor-pointer transition ${
                isActive(`/${locale}/services`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("services")}
            </p>
          </Link>

          <Link href={`/${locale}/portfolio`} onClick={() => setIsOpen(false)}>
            <p
              className={`cursor-pointer transition ${
                isActive(`/${locale}/portfolio`) ? "text-blue-500 font-bold" : "hover:text-blue-500"
              }`}
            >
              {t("portfolio")}
            </p>
          </Link>

          <button
            onClick={handleContactClick}
            className={`cursor-pointer transition ${
              isHomePage ? "text-blue-500 font-bold" : "hover:text-blue-500"
            }`}
          >
            {t("contact")}
          </button>

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
            {locale === "en" ? "(513) 808-88-13" : "+998 (87) 337-75-77"}
          </div>

          <div className="flex items-center space-x-3">
            <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank">
              <Image
                src="/facebook.png"
                alt="facebook"
                width={35}
                height={35}
                className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
              />
            </Link>
            <Link href="https://t.me/cognilabs_software" target="_blank">
              <Image
                src="/tg.png"
                alt="telegram"
                width={35}
                height={35}
                className="bg-[#0066FF] p-2 rounded-full cursor-pointer"
              />
            </Link>
            <Link href="https://www.instagram.com/cognilabs/" target="_blank">
              <Image
                src="/ig.png"
                alt="instagram"
                width={35}
                height={35}
                className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

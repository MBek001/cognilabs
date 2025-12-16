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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  // Handle direct contact link access
  useEffect(() => {
    const handleDirectContactAccess = () => {
      if (pathname === `/${locale}/contact` || pathname === "/contact") {
        // Redirect to home page with contact hash
        router.replace(`/${locale}#contact`);
      }
    };

    handleDirectContactAccess();
  }, [pathname, locale, router]);

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-poppins bg-gradient-to-r from-black via-black to-[#001a3a] shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between lg:justify-around px-3 sm:px-4 md:px-6 py-3 sm:py-4 lg:py-6">
        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute -top-5 sm:-top-6 md:-top-7 left-10 sm:left-10 md:left-20"
            style={{
              animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            }}
          >
            <Link href="/careers" onClick={() => setIsOpen(false)}>
              <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-wide text-white px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-900 rounded-3xl whitespace-nowrap hover:bg-blue-800 transition-colors">
                {t("hiring")}
              </p>
            </Link>
          </div>

          <a href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logomini.png"
                alt="Cognilabs"
                width={130}
                height={40}
                className="cursor-pointer w-[90px] sm:w-[100px] md:w-[120px] lg:w-[130px] h-auto"
                priority
              />
            </a>

        </div>

        {/* Desktop Nav - shown on large screens only */}
        <ul className="hidden lg:flex items-center space-x-4 xl:space-x-8 2xl:space-x-10 text-white text-sm xl:text-base 2xl:text-lg font-medium">
          <Link href={`/${locale}/about-us`}>
            <li
              className={`cursor-pointer transition-colors ${
                isActive(`/${locale}/about-us`) ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }`}
            >
              {t("home")}
            </li>
          </Link>

          <Link href={`/${locale}/careers`}>
            <li
              className={`cursor-pointer transition-colors ${
                isActive(`/${locale}/careers`) ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }`}
            >
              {t("careers")}
            </li>
          </Link>

          <Link href={`/${locale}/services`}>
            <li
              className={`cursor-pointer transition-colors ${
                isActive(`/${locale}/services`) ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }`}
            >
              {t("services")}
            </li>
          </Link>

          <Link href={`/${locale}/portfolio`}>
            <li
              className={`cursor-pointer transition-colors ${
                isActive(`/${locale}/portfolio`) ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }`}
            >
              {t("portfolio")}
            </li>
          </Link>

          <Link href={`/${locale}/insights`}>
            <li
              className={`cursor-pointer transition-colors ${
                isActive(`/${locale}/blogs`) ? "text-blue-500 font-bold" : "hover:text-blue-400"
              }`}
            >
             {t("blogs")}
            </li>
          </Link>

          <button
            onClick={handleContactClick}
            className="cursor-pointer transition-colors hover:text-blue-400"
          >
            {t("contact")}
          </button>

          <li>
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="bg-[#1b1b1b] text-white rounded-md px-2 xl:px-3 py-1.5 xl:py-2 text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="en">Eng</option>
              <option value="ru">Ru</option>
              <option value="uz">Uz</option>
            </select>
          </li>
        </ul>

        {/* Contact + socials (desktop only) */}
        <div className="hidden lg:flex flex-col items-center space-y-2">
          <div className="text-[#0066FF] font-semibold text-xs xl:text-sm 2xl:text-base whitespace-nowrap">
            {locale === "en" ? "+1 (513) 808-88-13" : "+998 (87) 337-75-77"}
          </div>

          <div className="flex items-center space-x-2">
            <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank" rel="noopener noreferrer">
              <Image
                src="/facebook.png"
                alt="facebook"
                width={28}
                height={28}
                className="xl:w-[32px] xl:h-[32px] bg-[#0066FF] p-1 rounded-full cursor-pointer hover:bg-[#0052cc] transition-colors"
              />
            </Link>
            <Link href="https://t.me/cognilabs_software" target="_blank" rel="noopener noreferrer">
              <div className="w-[30px] h-[30px] xl:w-[34px] xl:h-[34px] bg-[#0066FF] rounded-full flex items-center justify-center hover:bg-[#0052cc] transition-colors cursor-pointer">
                <Image
                  src="/tg.svg"
                  alt="telegram"
                  width={18}
                  height={18}
                  className="xl:w-[20px] xl:h-[20px]"
                />
              </div>
            </Link>
            <Link href="https://www.instagram.com/cognilabs/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/ig.png"
                alt="instagram"
                width={28}
                height={28}
                className="xl:w-[32px] xl:h-[32px] bg-[#0066FF] p-1 rounded-full cursor-pointer hover:bg-[#0052cc] transition-colors"
              />
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet Hamburger - shown below large screens */}
        <button 
          className="lg:hidden text-white z-50 p-1.5 sm:p-2 -mr-1.5 sm:-mr-2 hover:bg-white/10 rounded-md transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Menu - Improved with smooth animation */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-y-auto">
          <Link href={`/${locale}/about-us`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                isActive(`/${locale}/about-us`) ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"
              }`}
            >
              {t("home")}
            </p>
          </Link>

          <Link href={`/${locale}/careers`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                isActive(`/${locale}/careers`) ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"
              }`}
            >
              {t("careers")}
            </p>
          </Link>

          <Link href={`/${locale}/services`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                isActive(`/${locale}/services`) ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"
              }`}
            >
              {t("services")}
            </p>
          </Link>

          <Link href={`/${locale}/portfolio`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                isActive(`/${locale}/portfolio`) ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"
              }`}
            >
              {t("portfolio")}
            </p>
          </Link>

          <Link href={`/${locale}/blogs`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                isActive(`/${locale}/blogs`) ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"
              }`}
            >
              {t("blogs")}
            </p>
          </Link>

          <button
            onClick={handleContactClick}
            className="text-lg sm:text-xl cursor-pointer transition-colors text-white hover:text-blue-400"
          >
            {t("contact")}
          </button>

          {/* Language selector with better mobile styling */}
          <div className="pt-2 sm:pt-4">
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="bg-[#1b1b1b] text-white rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[140px]"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="uz">O'zbek</option>
            </select>
          </div>

          {/* Contact info */}
          <div className="pt-4 sm:pt-6 border-t border-gray-700 w-full max-w-[280px] sm:max-w-xs">
            <a 
              href={`tel:${locale === "en" ? "5138088813" : "+998873377577"}`}
              className="text-[#0066FF] font-semibold text-base sm:text-lg block text-center hover:text-blue-400 transition-colors"
            >
              {locale === "en" ? "+1 (513) 808-88-13" : "+998 (87) 337-75-77"}
            </a>
          </div>

          {/* Social media icons */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-3 sm:pt-4">
            <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <Image
                src="/facebook.png"
                alt="facebook"
                width={36}
                height={36}
                className="sm:w-[40px] sm:h-[40px] bg-[#0066FF] p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-[#0052cc] transition-all active:scale-95"
              />
            </Link>
            <Link href="https://t.me/cognilabs_software" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] bg-[#0066FF] rounded-full flex items-center justify-center hover:bg-[#0052cc] transition-all cursor-pointer active:scale-95">
                <Image
                  src="/tg.svg"
                  alt="telegram"
                  width={22}
                  height={22}
                  className="sm:w-[26px] sm:h-[26px]"
                />
              </div>
            </Link>
            <Link href="https://www.instagram.com/cognilabs/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <Image
                src="/ig.png"
                alt="instagram"
                width={36}
                height={36}
                className="sm:w-[40px] sm:h-[40px] bg-[#0066FF] p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-[#0052cc] transition-all active:scale-95"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
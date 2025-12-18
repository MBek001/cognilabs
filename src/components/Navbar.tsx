"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Check } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

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
    setShowLanguageMenu(false);
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      en: "English",
      ru: "Русский",
      uz: "O'zbek"
    };
    return languages[code] || code.toUpperCase();
  };

  return (
    <nav className="fixed top-4 left-0 w-full z-50 font-poppins  ">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
        {/* Logo */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute -top-5 sm:-top-6 md:-top-7 left-10 sm:left-10 md:left-20"
            style={{
              animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            }}
          >
            <Link href="/careers" onClick={() => setIsOpen(false)}>
              <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-wide text-white px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-700 rounded-3xl whitespace-nowrap hover:bg-cyan-500 transition-colors">
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

        {/* Desktop Nav - centered navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <div className="flex items-center space-x-1 bg-[#0d1f38]/30 backdrop-blur-sm rounded-full px-2 py-2 border border-cyan-500/30">
            <Link href={`/${locale}/about-us`}>
              <div
                className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                  isActive(`/${locale}/about-us`) 
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("home")}
              </div>
            </Link>

            <Link href={`/${locale}/careers`}>
              <div
                className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                  isActive(`/${locale}/careers`) 
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("careers")}
              </div>
            </Link>

            <Link href={`/${locale}/services`}>
              <div
                className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                  isActive(`/${locale}/services`) 
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("services")}
              </div>
            </Link>

            <Link href={`/${locale}/portfolio`}>
              <div
                className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                  isActive(`/${locale}/portfolio`) 
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("portfolio")}
              </div>
            </Link>

            <Link href={`/${locale}/insights`}>
              <div
                className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                  isActive(`/${locale}/blogs`) 
                    ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {t("blogs")}
              </div>
            </Link>

            <button
              onClick={handleContactClick}
              className="px-6 py-2 rounded-full transition-all cursor-pointer text-gray-300 hover:text-white hover:bg-white/5"
            >
              {t("contact")}
            </button>
            <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center bg-[#0d1f38]/80 text-white rounded-full pl-3 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer border border-cyan-500/30 hover:bg-[#0d1f38] transition-all"
            >
              <Globe className="w-4 h-4 mr-2 text-white" />
              <span className="uppercase">{locale}</span>
            </button>

            {/* iPhone-style dropdown menu */}
            {showLanguageMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLanguageMenu(false)}
                />
                
                {/* Menu */}
                <div className="absolute right-0 mt-2 w-30 rounded-2xl bg-[#1c2938]/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    {['en', 'ru', 'uz'].map((lang, index) => (
                      <button
                        key={lang}
                        onClick={() => changeLocale(lang)}
                        className={`w-full px-4 py-3 flex items-center justify-between hover:bg-cyan-500/10 transition-all ${
                          index !== 0 ? 'border-t border-cyan-500/10' : ''
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          locale === lang ? 'text-cyan-400' : 'text-gray-200'
                        }`}>
                          {getLanguageName(lang)}
                        </span>
                        {locale === lang && (
                          <Check className="w-5 h-5 text-cyan-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          </div>
        </div>

        {/* Right side - Language and Social */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language selector with iPhone-style dropdown */}
          

          {/* Contact info */}
          <div className="flex flex-col items-end" >
            <div className="text-white  font-semibold text-md whitespace-nowrap">
              {locale === "en" ? "+1 (513) 808-88-13" : "+998 (87) 337-75-77"}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/facebook.png"
                    alt="facebook"
                    width={22}
                    height={22}
                  />
                </div>
              </Link>
              <Link href="https://t.me/cognilabs_software" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/tg.svg"
                    alt="telegram"
                    width={17}
                    height={17}
                  />
                </div>
              </Link>
              <Link href="https://www.instagram.com/cognilabs/" target="_blank" rel="noopener noreferrer">
                <div className="w-8 h-8 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full pl-0.5 flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/ig.png"
                    alt="instagram"
                    width={21}
                    height={21}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Hamburger */}
        <button 
          className="lg:hidden text-cyan-400 z-50 p-2 hover:bg-cyan-500/10 rounded-md transition-colors border border-cyan-500/30" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-[#0a1628]/98 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 px-6 pt-20 pb-8 overflow-y-auto">
          <Link href={`/${locale}/about-us`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-xl cursor-pointer transition-all px-8 py-3 rounded-full ${
                isActive(`/${locale}/about-us`) 
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/50" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("home")}
            </p>
          </Link>

          <Link href={`/${locale}/careers`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-xl cursor-pointer transition-all px-8 py-3 rounded-full ${
                isActive(`/${locale}/careers`) 
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/50" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("careers")}
            </p>
          </Link>

          <Link href={`/${locale}/services`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-xl cursor-pointer transition-all px-8 py-3 rounded-full ${
                isActive(`/${locale}/services`) 
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/50" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("services")}
            </p>
          </Link>

          <Link href={`/${locale}/portfolio`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-xl cursor-pointer transition-all px-8 py-3 rounded-full ${
                isActive(`/${locale}/portfolio`) 
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/50" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("portfolio")}
            </p>
          </Link>

          <Link href={`/${locale}/blogs`} onClick={() => setIsOpen(false)}>
            <p
              className={`text-xl cursor-pointer transition-all px-8 py-3 rounded-full ${
                isActive(`/${locale}/blogs`) 
                  ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/50" 
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {t("blogs")}
            </p>
          </Link>

          <button
            onClick={handleContactClick}
            className="text-xl cursor-pointer transition-all text-gray-300 hover:text-white hover:bg-white/5 px-8 py-3 rounded-full"
          >
            {t("contact")}
          </button>

          {/* iPhone-style language selector for mobile */}
          <div className="pt-4 w-full max-w-xs">
            <div className="rounded-2xl bg-[#1c2938]/80 backdrop-blur-xl border border-cyan-500/20 overflow-hidden">
              <div className="px-4 py-3 border-b border-cyan-500/10">
                <div className="flex items-center justify-center space-x-2 text-cyan-400">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-semibold">Language</span>
                </div>
              </div>
              {['en', 'ru', 'uz'].map((lang, index) => (
                <button
                  key={lang}
                  onClick={() => changeLocale(lang)}
                  className={`w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-500/10 active:bg-cyan-500/20 transition-all ${
                    index !== 0 ? 'border-t border-cyan-500/10' : ''
                  }`}
                >
                  <span className={`text-base font-medium ${
                    locale === lang ? 'text-cyan-400' : 'text-gray-200'
                  }`}>
                    {getLanguageName(lang)}
                  </span>
                  {locale === lang && (
                    <Check className="w-6 h-6 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="pt-6 border-t border-cyan-500/20 w-full max-w-xs">
            <a 
              href={`tel:${locale === "en" ? "5138088813" : "+998873377577"}`}
              className="text-cyan-400 font-semibold text-lg block text-center hover:text-cyan-300 transition-colors"
            >
              {locale === "en" ? "+1 (513) 808-88-13" : "+998 (87) 337-75-77"}
            </a>
          </div>

          {/* Social media icons */}
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30 active:scale-95">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link href="https://t.me/cognilabs_software" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30 active:scale-95">
                <Image
                  src="/tg.svg"
                  alt="telegram"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
            <Link href="https://www.instagram.com/cognilabs/" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
              <div className="w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30 active:scale-95">
                <Image
                  src="/ig.png"
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
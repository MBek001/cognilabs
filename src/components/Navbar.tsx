"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

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
    <nav className="fixed top-0 left-0 w-full z-50 font-poppins bg-[#0a1628]/20 backdrop-blur-md border-b border-cyan-500/15">
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
              <p className="text-[8px] sm:text-[9px] md:text-[11px] font-bold tracking-wide text-white px-1.5 sm:px-2 py-0.5 sm:py-1 bg-cyan-600 rounded-3xl whitespace-nowrap hover:bg-cyan-500 transition-colors">
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
          <div className="flex items-center space-x-1 bg-[#0d1f38]/80 backdrop-blur-sm rounded-full px-2 py-2 border border-cyan-500/30">
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
          </div>
        </div>

        {/* Right side - Language and Social */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Language selector with globe icon */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="appearance-none bg-[#0d1f38]/80 text-cyan-400 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer border border-cyan-500/30 hover:bg-[#0d1f38] transition-all"
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="uz">UZ</option>
            </select>
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-end">
            <div className="text-cyan-400 font-semibold text-sm whitespace-nowrap">
              {locale === "en" ? "+1 (513) 808-88-13" : "+998 (87) 337-75-77"}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Link href="https://www.facebook.com/profile.php?id=61577158531453" target="_blank" rel="noopener noreferrer">
                <div className="w-7 h-7 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/facebook.png"
                    alt="facebook"
                    width={14}
                    height={14}
                  />
                </div>
              </Link>
              <Link href="https://t.me/cognilabs_software" target="_blank" rel="noopener noreferrer">
                <div className="w-7 h-7 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/tg.svg"
                    alt="telegram"
                    width={14}
                    height={14}
                  />
                </div>
              </Link>
              <Link href="https://www.instagram.com/cognilabs/" target="_blank" rel="noopener noreferrer">
                <div className="w-7 h-7 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full flex items-center justify-center transition-all border border-cyan-500/30">
                  <Image
                    src="/ig.png"
                    alt="instagram"
                    width={14}
                    height={14}
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

          {/* Language selector */}
          <div className="pt-4 relative">
            <select
              value={locale}
              onChange={(e) => changeLocale(e.target.value)}
              className="appearance-none bg-[#0d1f38]/80 text-cyan-400 rounded-full pl-12 pr-8 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/50 cursor-pointer border border-cyan-500/30 min-w-[160px]"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="uz">O'zbek</option>
            </select>
            <Globe className="absolute left-5 top-3/5 -translate-y-1/2 w-5 h-5 text-cyan-400 pointer-events-none" />
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
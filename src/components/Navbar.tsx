"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 font-poppins bg-gradient-to-r from-black via-black to-[#001a3a] py-6 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Left side - logo */}
        <div className="flex items-center space-x-16">
          <Image
            src="/logomini.png"
            alt="Cognilabs"
            width={130}
            height={40}
            className="cursor-pointer"
          />

          {/* Nav links */}
          <ul className="flex items-center space-x-16 text-white text-lg font-medium">
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

            {/* Language selector */}
            <li>
              <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                className="bg-[#1b1b1b] text-white rounded-md p-3 px-2 focus:outline-none"
              >
                <option value="en">Eng</option>
                <option value="ru">Ru</option>
                <option value="uz">Uz</option>
              </select>
            </li>
          </ul>
        </div>

        {/* Right side - contact and socials */}
        <div className="flex flex-col items-center space-x-6">
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
              className="bg-[#0066FF] p-1 rounded-full cursor-pointer"
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
      </div>
    </nav>
  );
}

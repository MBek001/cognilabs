import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import './globals.css';
import {Montserrat, Poppins} from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "~/i18n/routing";
import Navbar from "~/components/Navbar";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap"
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap"
})


export const metadata: Metadata = {
  title: "Cognilabs Sofware Solutions",
  description: "",
  icons: {
    icon: "logo1.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'uz' | 'ru' | 'en')) {
    notFound();
  }

  // Fontni tanlash
const fontClass = locale === 'ru' ? montserrat.className : poppins.className;

  return (
    <html lang={locale} suppressHydrationWarning className={fontClass}>
      <body className="flex flex-col min-h-screen justify-between relative z-0 bg-[#0b0b0d] text-white">
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {children}
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import './globals.css';
import {Poppins} from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "~/i18n/routing";
import Navbar from "~/components/Navbar";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap"
})


export const metadata: Metadata = {
  title: "Next.js App Router with next-intl",
  description: "",
  icons: {
    icon: "/favicon.ico",
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
  if (!routing.locales.includes(locale as 'uz' | 'uzK' | 'ru' | 'en')) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className={poppins.className}>
      <body className="flex flex-col min-h-screen justify-between relative z-0 bg-[#0b0b0d] text-white">
        <NextIntlClientProvider locale={locale}>
            <Navbar/>
                            {children}
                            <ToastContainer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import './globals.css';
import { Geist, Montserrat, Poppins } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "~/i18n/routing";
import Navbar from "~/components/Navbar";
import { ToastContainer } from "react-toastify";
import Script from "next/script";      // 👉 Buni qo‘shdik

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap"
})

const montserrat = Montserrat({
  subsets: ["latin","cyrillic","cyrillic-ext"],
  weight: ["300","400","500","600","700"],
})

const geist = Geist({
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

  const fontClass = locale === 'ru' ? geist.className : poppins.className;

  return (
    <html lang={locale} suppressHydrationWarning className={fontClass}>
      <head>
        {/* LINKEDIN INSIGHT TAG */}
        <Script
          id="linkedin-insight-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "9096145";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `,
          }}
        />

        <Script
          id="linkedin-insight-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `,
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen justify-between relative z-0 bg-[#0b0b0d] text-white">
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {children}
          <ToastContainer />

          {/* NOSCRIPT fallback */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=9096145&fmt=gif"
            />
          </noscript>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

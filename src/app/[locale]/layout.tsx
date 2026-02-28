/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Navbar from "~/components/Navbar";
import GoogleAnalytics from "~/app/components/GoogleAnalytics";
import { routing } from "~/i18n/routing";
import { GA_ID } from "~/lib/gtag";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cognilabs Sofware Solutions",
  description: "",
  icons: {
    icon: "logo1.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as "uz" | "ru" | "en")) {
    notFound();
  }

  const fontClass = locale === "ru" ? geist.className : poppins.className;

  return (
    <html lang={locale} suppressHydrationWarning className={fontClass}>
      <body className="flex flex-col min-h-screen justify-between relative z-0 bg-[#0b0b0d] text-white">
        {GA_ID ? (
          <>
            <Script
              id="ga4-src"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { send_page_view: false });
                `,
              }}
            />
          </>
        ) : null}

        <NextIntlClientProvider locale={locale}>
          <GoogleAnalytics />
          <Navbar />
          {children}
          <ToastContainer />
        </NextIntlClientProvider>

        <Script
          id="linkedin-insight-tag"
          strategy="lazyOnload"
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
          strategy="lazyOnload"
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

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=9096145&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  );
}


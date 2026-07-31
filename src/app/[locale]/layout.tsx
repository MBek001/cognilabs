/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Geist, Poppins } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Navbar from "~/components/Navbar";
import SalesChatWidget from "~/components/SalesChatWidget";
import GoogleAnalytics from "~/app/components/GoogleAnalytics";
import AutoAnalyticsTracker from "~/app/components/AutoAnalyticsTracker";
import GeoLocalePermissionDebug from "~/app/components/GeoLocalePermissionDebug";
import { routing } from "~/i18n/routing";
import { GA_ID } from "~/lib/gtag";
import { SITE_URL, OG_IMAGE, altLanguages } from "~/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: "Cognilabs — IT Services & Software Development Company in Uzbekistan",
  description:
    "Leading IT company in Tashkent, Uzbekistan. We build websites, mobile apps, AI solutions, Telegram bots, CRM/ERP systems and digital products for businesses across Uzbekistan and Central Asia.",
  applicationName: "Cognilabs",
  authors: [{ name: "Cognilabs", url: SITE_URL }],
  creator: "Cognilabs",
  publisher: "Cognilabs",
  formatDetection: { telephone: true, email: true, address: true },
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    type: "website",
    siteName: "Cognilabs",
    url: SITE_URL,
    title: "Cognilabs — IT Services & Software Development Company in Uzbekistan",
    description:
      "Leading IT company in Tashkent, Uzbekistan. Web, mobile, AI, Telegram bots, CRM/ERP and digital products.",
    images: [{ url: OG_IMAGE, alt: "Cognilabs — IT Services in Uzbekistan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognilabs — IT Services & Software Development in Uzbekistan",
    description: "Web, mobile, AI, Telegram bots, CRM/ERP in Tashkent, Uzbekistan.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: altLanguages(""),
  },
};

// Sitewide structured data (Organization + WebSite + LocalBusiness).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cognilabs",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo1.png` },
      email: "info@cognilabs.org",
      description:
        "IT services and software development company based in Tashkent, Uzbekistan.",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61577158531453",
        "https://t.me/cognilabs_software",
        "https://www.instagram.com/cognilabs/",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+998873377577",
          contactType: "customer service",
          areaServed: "UZ",
          availableLanguage: ["en", "uz", "ru"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+15138088813",
          contactType: "sales",
          areaServed: "US",
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cognilabs",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "uz", "ru"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Cognilabs",
      image: `${SITE_URL}/logo1.png`,
      url: SITE_URL,
      telephone: "+998873377577",
      email: "info@cognilabs.org",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tashkent",
        addressCountry: "UZ",
      },
      areaServed: [
        { "@type": "Country", name: "Uzbekistan" },
        { "@type": "Country", name: "United States" },
      ],
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <AutoAnalyticsTracker />
          <GeoLocalePermissionDebug />
          <Navbar />
          {children}
          <SalesChatWidget />
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

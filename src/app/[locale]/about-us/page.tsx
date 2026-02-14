import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uz" }, { locale: "ru" }];
}

import Image from "next/image";
import RequestForm from "~/components/RequestForm";
import { PageWrapper, AnimatedSection } from "./components/AboutPage";
import { getTranslations } from "next-intl/server";
import Footer from "~/components/Footer";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
            <div className="relative w-48 h-32 sm:w-64 sm:h-40">
              <Image
                src="/logomini.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-thin text-gray-400 mt-6">
              {t("title")}
            </h3>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="max-w-5xl mx-auto space-y-6 text-gray-300">
            <h4 className="text-2xl sm:text-4xl font-bold text-white">
              {t("about")}
            </h4>
            <div className="space-y-4 text-base md:text-lg leading-relaxed">
              <p>{t("text1")}</p>
              <p className="pt-8">{t("text2")}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <div className="pt-24">
          <RequestForm />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="pt-40">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 text-gray-300">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left">
              {t("ourgoal")}
            </h4>

            <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-center md:text-left">
              <p>{t("text3")}</p>
              <p className="pt-8">{t("text4")}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="pt-40">
          <Footer />
        </div>
      </AnimatedSection>

      {/* Repeat AnimatedSection for Goal and Footer */}
    </PageWrapper>
  );
}

import { useTranslations } from 'next-intl'
import React from 'react'

export default function Projects() {

    const t = useTranslations("Projects");





  return (
  <div>
  <div className="flex mx-auto items-center mt-40 mb-20 gap-8 justify-center flex-col">
    <h2 className="text-6xl font-semibold">
      {(() => {
        const words = t("ourprojects").split(" ");
        return (
          <>
            {words.map((word, index) => (
              <span
                key={index}
                className={index === 1 ? "text-blue-500" : ""}
              >
                {word}{" "}
              </span>
            ))}
          </>
        );
      })()}
    </h2>

    <p className="text-2xl">{t("text")}</p>
  </div>
</div>

  )
}

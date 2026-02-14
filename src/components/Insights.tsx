/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import DOMPurify from "dompurify";

interface Blog {
  id: number;
  title: string;
  content: string;
  language: "uz" | "ru" | "en";
  date_posted: string;
  is_active: boolean;
  image_url: string;
}

export default function Insights() {
  const t = useTranslations("Insights");
  const locale = useLocale();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH BLOGS ----------------
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all-blogs`)
      .then((res) => res.json())
      .then((data: Blog[]) => {
        const filtered = data.filter(
          (blog) => blog.is_active && blog.language === locale,
        );
        setBlogs(filtered);
      })
      .catch((err) => console.error("Insights fetch error:", err))
      .finally(() => setLoading(false));
  }, [locale]);

  // ---------------- DATE FORMAT (same as BlogPage) ----------------
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const uzMonths = [
      "yanvar",
      "fevral",
      "mart",
      "aprel",
      "may",
      "iyun",
      "iyul",
      "avgust",
      "sentyabr",
      "oktyabr",
      "noyabr",
      "dekabr",
    ];

    if (locale === "uz") {
      return `${date.getDate()} ${uzMonths[date.getMonth()]} ${date.getFullYear()}`;
    }

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ---------------- LOOP SAFE DATA ----------------
  const buildLoopData = (data: Blog[], min = 6) => {
    if (data.length === 0) return [];
    const result = [...data];
    while (result.length < min) {
      result.push(...data);
    }
    return result;
  };

  if (loading || blogs.length === 0) return null;

  const loopBlogs = buildLoopData(
    [...blogs].sort(
      (a, b) =>
        new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime(),
    ),
  );

  return (
    <div className="py-16 px-4 bg-black">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#0066FF] font-bold text-center mb-12 sm:mb-16">
        {t("title")}
      </h2>

      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={40}
          slidesPerView={3}
          centeredSlides
          loop
          speed={900}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".prev-btn-insights",
            nextEl: ".next-btn-insights",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
        >
          {loopBlogs.map((blog, idx) => (
            <SwiperSlide
              key={`${blog.id}-${idx}`}
              className="overflow-visible!"
            >
              {({ isActive }) => (
                <Link href={`/${locale}/insights/${blog.id}`}>
                  <div
                    className={`transition-all duration-700 ${
                      isActive
                        ? "scale-95 shadow-2xl opacity-100"
                        : "scale-90 opacity-60"
                    }`}
                  >
                    <div className="bg-[#2A2A2A] rounded-3xl overflow-hidden h-[530px] flex flex-col group">
                      {/* IMAGE */}
                      <div className="relative h-60">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
                          alt={blog.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                      </div>

                      {/* BODY */}
                      <div className="p-6 sm:p-8 flex flex-col flex-1">
                        <span className="text-sm text-[#0066FF] mb-4 w-fit bg-blue-500/10 px-3 py-1 rounded-full">
                          {formatDate(blog.date_posted)}
                        </span>

                        <h3 className="text-white text-lg font-semibold mb-3 line-clamp-2">
                          {blog.title}
                        </h3>

                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 grow">
                          <div
                            className="text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(blog.content),
                            }}
                          />
                        </p>

                        <span className="text-[#0066FF] flex gap-1 items-center text-sm mt-6 hover:underline hover:translate-x-1 transition-all">
                          See more <ArrowRight className="w-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ARROWS */}
        <button className="prev-btn-insights absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        <button className="next-btn-insights absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {  ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '~/components/Footer';
import DOMPurify from "dompurify";
interface Blog {
  id: number;
  title: string;
  content: string;
  language: 'uz' | 'ru' | 'en';
  date_posted: string;
  is_active: boolean;
  image_url: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  const b = useTranslations("Blogs")

  const t = useTranslations('Navbar');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all-blogs`)
      .then(res => res.json())
      .then((data: Blog[]) => {
        const filteredBlogs = data.filter(
          blog => blog.is_active && blog.language === locale
        );
        setBlogs(filteredBlogs);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      })
      .finally(() => setLoading(false));
  }, [locale]);

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
    "dekabr"
  ];

  if (locale === "uz") {
    const day = date.getDate();
    const month = uzMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // English & Russian already work fine
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div>
        <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-2xl text-gray-400">{b("notfound")}</p>
      </div>
      <Footer/>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen'>
      <div className="container mx-auto px-4 py-8 md:py-16 pt-24 md:pt-40 max-w-7xl">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center">{t("blogs")}</h1>
        
        {/* Blog Grid - Full Width Cards */}
        {/* Blog Grid - 3 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
  {blogs.map((blog) => (
    <article
      key={blog.id}
      className="bg-[#0b0f19] rounded-3xl overflow-hidden border border-blue-900/30 
                 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-800/30
                 transition-all duration-500 flex flex-col"
    >
      {/* IMAGE TOP */}
     <Link href={`/${locale}/insights/${blog.id}`}>
     <div className={`relative w-full h-64 `} >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
          alt={blog.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>
     </Link>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        
        {/* Date */}
        <time className="text-sm text-blue-300 bg-blue-900/20 px-4 py-1.5 
                         rounded-full border border-blue-800/40 w-fit">
          {formatDate(blog.date_posted)}
        </time>

        {/* Title */}
        <h2 className="text-xl font-bold text-white line-clamp-2">
          {blog.title}
        </h2>

        {/* Content */}
        <p className="text-gray-300 text-base leading-relaxed line-clamp-4 flex-grow">
          <div
    className="text-gray-300 leading-relaxed"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(blog.content),
    }}
  />
        </p>

        {/* <div className="prose prose-lg prose-invert max-w-none">
  <div
    className="text-gray-300 leading-relaxed"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(blog.content),
    }}
  />
</div> */}


        {/* VIEW MORE BUTTON */}
        <Link  href={`/${locale}/insights/${blog.id}`} className="mt-4 flex gap-2 scale-95  border-[1px] border-blue-600 rounded-2xl  hover:scale-100 text-white 
                           py-1 mr-2  px-3 text-[14px]   transition-all  w-fit">
          {b("view")} <ArrowUpRight className='w-4'/>
        </Link>
      </div>
    </article>
  ))}
</div>

      </div>
      <Footer/>
    </div>
  );
}
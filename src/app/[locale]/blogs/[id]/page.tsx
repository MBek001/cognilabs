"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Footer from "~/components/Footer";

interface Blog {
  id: number;
  title: string;
  content: string;
  language: "uz" | "ru" | "en";
  date_posted: string;
  is_active: boolean;
  image_url: string;
}

export default function BlogDetailClient() {
  const { locale, id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-blog/${id}`)
      .then((res) => res.json())
      .then((data: Blog) => {
        if (data.is_active && data.language === locale) {
          setBlog(data);
        }
      })
      .finally(() => setLoading(false));
  }, [locale, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin h-14 w-14 border-4 border-t-blue-500 border-gray-700 rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      {/* ---- HERO IMAGE ---- */}
      <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
          className="w-full h-full object-cover scale-105 brightness-75"
          alt={blog.title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>

        {/* Back Button */}
        <button
          onClick={() => history.back()}
          className="absolute top-6 left-10 md:left-60 bg-black/40 hover:bg-black/60 
                     text-white px-4 py-2 rounded-xl flex items-center gap-2 
                     backdrop-blur-md border border-white/10 transition">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Title on image */}
        <h1 className="absolute md:bottom-20 bottom-12 left-1/2 -translate-x-1/2 
                       text-center text-3xl md:text-5xl font-bold 
                       drop-shadow-xl max-w-2xl px-4">
          {blog.title}
        </h1>
      </div>

      {/* ---- CONTENT CARD ---- */}
      <div className="max-w-4xl mx-auto px-5 -mt-10 md:-mt-15">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12
                        border border-white/10 shadow-xl 
                        animate-slide-up">
          
          {/* Date */}
          <p className="text-blue-400 text-sm mb-4">
            {new Date(blog.date_posted).toLocaleDateString(locale)}
          </p>

          {/* Content */}
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line tracking-wide">
            {blog.content}
          </p>

          {/* Fancy line divider */}
          <div className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>

        
        </div>
      </div>

      {/* bottom padding */}
      <div className="h-20"></div>

      <Footer/>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import Insights from "~/components/Insights";
import Footer from "~/components/Footer";
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-16 w-16 border-4 border-t-blue-500 border-gray-800 rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Blog not found</h2>
          <button
            onClick={() => history.back()}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} /> Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-black text-white ">
      {/* Back Button - Fixed Position */}
      

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-6 py-32">
        <button
          onClick={() => history.back()}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md
                     px-6 py-3 rounded-full flex items-center gap-2
                     border border-white/20 transition-all duration-300
                     shadow-lg hover:shadow-xl mb-10"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
        {/* Date Badge */}
        <div className="flex items-center gap-2 text-blue-400 mb-8">
          <Calendar size={18} />
          <span className="text-sm font-medium">
            {new Date(blog.date_posted).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Title */}
       

        {/* Featured Image */}
        <div
  className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12
             shadow-2xl border border-white/10"
>
  {/* Background image */}
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Title */}
      <div className="absolute inset-0 flex items-end">
        <h1
          className="p-8 md:p-12 text-xl md:text-6xl font-bold leading-tight
                     bg-gradient-to-r from-white to-gray-300
                     bg-clip-text text-transparent"
        >
          {blog.title}
        </h1>
      </div>
    </div>


        {/* Description/Content */}
        <div className="prose prose-lg prose-invert max-w-none">
  <div
    className="text-gray-300 leading-relaxed"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(blog.content),
    }}
  />
</div>


        {/* Decorative Bottom Line */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
      
    </div>
    <Insights/>
    <Footer/>
    </div>
  );
}
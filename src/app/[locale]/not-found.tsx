"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  const params = useParams(); // { locale: 'en' | 'ru' | 'uz', ... }

  useEffect(() => {
    const timer = setTimeout(() => {
      // foydalanuvchini shu tilning asosiy sahifasiga yuboramiz
      router.push(`/${params.locale}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [params.locale, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <h1 className="text-7xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-2xl mb-4">Page Not Found</p>
      <p className="text-gray-400 mb-8">
        Redirecting to the main page in a few seconds...
      </p>

      <Link
        href={`/${params.locale}`}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-lg font-medium transition-all"
      >
        Go Home Now
      </Link>
    </div>
  );
}

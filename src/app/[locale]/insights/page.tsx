// app/[locale]/insights/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import BlogList from "~/components/insights/FetchBlog";
import Footer from "~/components/Footer";

export default async function BlogPage() {
  const t = await getTranslations("Navbar");

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16 pt-24 md:pt-40 max-w-7xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center text-white">
          {t("blogs")}
        </h1>

        {/* This is where the magic happens */}
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[400px] bg-gray-900/50 rounded-3xl animate-pulse" />
      ))}
    </div>
  );
}

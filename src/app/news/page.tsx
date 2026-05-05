"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPublishedNews, getNewsEventName, NewsRecord } from "@/utils/newsStorage";
import Image from "next/image";

export default function NewsPage() {
  const [news, setNews] = useState<NewsRecord[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getPublishedNews();
      setNews(data);
    };
    fetchNews();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <main className="container py-16 lg:py-24 space-y-12">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100">
          Tin tức & Sự kiện
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Cập nhật những thông tin mới nhất, các chương trình ưu đãi và sự kiện nổi bật tại Yara Homestay Hải Tiến.
        </p>
      </section>

      {news.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
          Hiện tại chưa có tin tức nào được đăng.
        </div>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col group rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full aspect-w-16 aspect-h-10 bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                      Chưa có ảnh bìa
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white dark:bg-neutral-900 px-3 py-1 rounded-full text-xs font-medium text-neutral-900 dark:text-white shadow z-10">
                    {formatDate(item.createdAt)}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 flex-grow">
                  {item.summary}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center text-primary-6000 hover:text-primary-700 font-semibold transition-colors"
                >
                  Đọc chi tiết
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

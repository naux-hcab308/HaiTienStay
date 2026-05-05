"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPublishedNews, NewsRecord } from "@/utils/newsStorage";

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
    <main className="container space-y-12 py-16 lg:py-24">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 md:text-5xl">
          Tin tức & Sự kiện
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Cập nhật những thông tin mới nhất, các chương trình ưu đãi và sự kiện nổi bật tại Yara Homestay Hải Tiến.
        </p>
      </section>

      {news.length === 0 ? (
        <div className="py-20 text-center text-neutral-500 dark:text-neutral-400">
          Hiện tại chưa có tin tức nào được đăng.
        </div>
      ) : (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => {
            const title = (item.title || "").normalize("NFC");
            const summary = (item.summary || "").normalize("NFC");
            return (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="relative w-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 aspect-[16/10]">
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-400">
                    Chưa có ảnh bìa
                  </div>
                )}
                <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow dark:bg-neutral-900 dark:text-white">
                  {formatDate(item.createdAt)}
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <h2 className="mb-3 line-clamp-2 text-xl font-bold text-neutral-900 dark:text-white">
                  {title}
                </h2>
                <p className="mb-6 line-clamp-3 flex-grow text-neutral-600 dark:text-neutral-400">
                  {summary}
                </p>
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center font-semibold text-primary-6000 transition-colors hover:text-primary-700"
                >
                  Đọc chi tiết
                  <svg
                    className="ml-2 h-5 w-5"
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
            );
          })}
        </section>
      )}
    </main>
  );
}

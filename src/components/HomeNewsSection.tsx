"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPublishedNews, NewsRecord } from "@/utils/newsStorage";

interface HomeNewsSectionProps {
  className?: string;
}

export default function HomeNewsSection({ className = "" }: HomeNewsSectionProps) {
  const [news, setNews] = useState<NewsRecord[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getPublishedNews();
      setNews(data.slice(0, 4));
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
    <section className={`relative z-10 ${className}`}>
      <div className="text-center">
        <div>
          <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Tin tức & Sự kiện
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Cập nhật tin tức mới nhất tại Yara Homestay và Hải Tiến.
          </p>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white px-6 py-12 text-center text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
          Hiện tại chưa có tin tức nào được đăng.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
            >
              <Link href={`/news/${item.slug}`} className="block">
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400">
                      Chưa có ảnh bìa
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {formatDate(item.createdAt)}
                </span>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  <Link href={`/news/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/news"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Xem ngay 
        </Link>
      </div>
    </section>
  );
}

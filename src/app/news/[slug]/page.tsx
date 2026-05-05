"use client";

import React, { useEffect, useState } from "react";
import { getNewsBySlug, NewsRecord } from "@/utils/newsStorage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, setPost] = useState<NewsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const found = await getNewsBySlug(params.slug);
      if (found) {
        setPost(found);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="flex animate-pulse flex-col items-center">
          <div className="mb-4 h-8 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-8 h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700"></div>
          <div className="mb-8 h-96 w-full max-w-4xl rounded-3xl bg-neutral-200 dark:bg-neutral-700"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Không tìm thấy bài viết</h1>
        <p className="mb-8 text-neutral-500">Bài viết có thể đã bị xóa hoặc đường dẫn không chính xác.</p>
        <ButtonPrimary onClick={() => router.push("/news")}>Quay lại trang Tin tức</ButtonPrimary>
      </div>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <main className="container py-12 lg:py-20">
      <article className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <Link href="/news" className="mb-6 inline-flex items-center font-semibold text-primary-6000 hover:text-primary-700">
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Quay lại Tin tức
          </Link>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400 md:text-base">
            <span>Đăng lúc: {formatDate(post.createdAt)}</span>
            {post.status === "draft" && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                Bản nháp (chỉ Admin thấy)
              </span>
            )}
          </div>
        </header>

        {post.coverImage && (
          <figure className="relative mb-12 aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-200 shadow-lg dark:bg-neutral-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </figure>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-6000 dark:prose-invert">
          {post.content.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {post.fbLink && (
          <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50 p-8 text-center dark:border-blue-800 dark:bg-blue-900/20">
            <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Bài viết này được liên kết từ Facebook
            </h3>
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Bạn có thể xem bài gốc, bình luận và chia sẻ trên fanpage của chúng tôi.
            </p>
            <a
              href={post.fbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700"
            >
              <svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Xem bài viết trên Facebook
            </a>
          </div>
        )}
      </article>
    </main>
  );
}

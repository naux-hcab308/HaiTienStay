"use client";

import React, { useEffect, useState } from "react";
import { getNewsBySlug, getNewsEventName, NewsRecord } from "@/utils/newsStorage";
import { notFound, useRouter } from "next/navigation";
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
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-2/3 h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
          <div className="w-1/2 h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-8"></div>
          <div className="w-full max-w-4xl h-96 bg-neutral-200 dark:bg-neutral-700 rounded-3xl mb-8"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy bài viết</h1>
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
      <article className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <Link href="/news" className="text-primary-6000 hover:text-primary-700 font-semibold mb-6 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Quay lại Tin tức
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mt-6 leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 text-neutral-500 dark:text-neutral-400 text-sm md:text-base flex items-center justify-center space-x-4">
            <span>Đăng lúc: {formatDate(post.createdAt)}</span>
            {post.status === "draft" && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                Bản nháp (Chỉ Admin thấy)
              </span>
            )}
          </div>
        </header>

        {post.coverImage && (
          <figure className="mb-12 rounded-3xl overflow-hidden shadow-lg relative aspect-w-16 aspect-h-9 bg-neutral-200 dark:bg-neutral-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </figure>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-6000">
          {post.content.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {post.fbLink && (
          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-center border border-blue-100 dark:border-blue-800">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              Bài viết này được liên kết từ Facebook
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Bạn có thể xem bài gốc, bình luận và chia sẻ trên fanpage của chúng tôi.
            </p>
            <a
              href={post.fbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors shadow-lg shadow-blue-500/30"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

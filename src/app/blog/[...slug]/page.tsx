"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getGuestPostBySlug } from "@/utils/guestPostStorage";

export default function BlogDetailPage() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] || "" : slugParam || "";
  const bai = getGuestPostBySlug(slug);

  const fallback = {
    title: "Bài viết không tồn tại",
    authorName: "Hệ thống",
    createdAt: new Date().toISOString(),
    content: "Không tìm thấy nội dung phù hợp. Vui lòng quay về trang blog.",
  };

  const post = bai || fallback;
  const dateLabel = new Date(post.createdAt).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <main className="container py-10 lg:py-16">
      <article className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 dark:border-neutral-700 p-8">
        <p className="text-sm text-neutral-500">
          {dateLabel} · {post.authorName}
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          {post.content}
        </p>

        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-5">
          <p className="font-semibold">Bạn cũng có thể chia sẻ trải nghiệm của mình.</p>
          <Link href="/blog" className="inline-block mt-3 text-blue-600 font-medium">
            Quay lại trang blog trải nghiệm
          </Link>
        </div>
      </article>
    </main>
  );
}

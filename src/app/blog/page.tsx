"use client";

import Link from "next/link";
import React from "react";
import {
  addGuestPost,
  getGuestPostEventName,
  getPublishedGuestPosts,
} from "@/utils/guestPostStorage";

export default function BlogPage() {
  const [posts, setPosts] = React.useState(getPublishedGuestPosts());
  const [authorName, setAuthorName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const sync = () => setPosts(getPublishedGuestPosts());
    sync();
    window.addEventListener(getGuestPostEventName(), sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(getGuestPostEventName(), sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !title.trim() || !content.trim()) {
      setMessage("Vui lòng điền đầy đủ họ tên, tiêu đề và nội dung.");
      return;
    }

    addGuestPost({ authorName, title, content });
    setAuthorName("");
    setTitle("");
    setContent("");
    setMessage("Đã gửi bài viết. Admin sẽ duyệt trước khi hiển thị công khai.");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <main className="container py-10 lg:py-16 space-y-8">
      <section className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Blog trải nghiệm khách lưu trú
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Nơi khách chia sẻ cảm nhận sau chuyến đi tại Hải Tiến Stay. Bạn có thể
          đọc nhanh các bài gần đây hoặc gửi bài viết mới ngay tại đây.
        </p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        {posts.map((bai) => (
          <article
            key={bai.slug}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5"
          >
            <p className="text-xs text-neutral-500">
              {formatDate(bai.createdAt)} · {bai.authorName}
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-snug">
              {bai.title}
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              {bai.summary}
            </p>
            <Link
              href={`/blog/${bai.slug}`}
              className="inline-block mt-4 text-blue-600 font-medium"
            >
              Đọc bài viết
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="text-2xl font-semibold">Viết blog trải nghiệm</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Gửi cảm nhận của bạn. Bài viết sẽ hiển thị sau khi admin phê duyệt.
        </p>
        <form className="mt-4 grid md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Họ và tên"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Tiêu đề bài viết"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="md:col-span-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3 min-h-[140px]"
            placeholder="Chia sẻ trải nghiệm của bạn..."
          />
          {message ? (
            <p className="md:col-span-2 text-sm text-blue-600 dark:text-blue-400">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-blue-600 text-white py-3 font-semibold"
          >
            Gửi bài viết
          </button>
        </form>
      </section>
    </main>
  );
}

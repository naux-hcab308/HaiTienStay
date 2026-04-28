"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminAuth";
import {
  getAllGuestPosts,
  getGuestPostEventName,
  updateGuestPostStatus,
} from "@/utils/guestPostStorage";

export default function AdminBlogPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = React.useState(getAllGuestPosts());

  React.useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login?next=/admin/blog-posts");
      return;
    }
    const sync = () => setPosts(getAllGuestPosts());
    window.addEventListener(getGuestPostEventName(), sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(getGuestPostEventName(), sync);
      window.removeEventListener("storage", sync);
    };
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin/login");
  };

  const getStatusLabel = (status: string) => {
    if (status === "approved") return "Đã duyệt";
    if (status === "rejected") return "Đã từ chối";
    return "Chờ duyệt";
  };

  const getStatusClass = (status: string) => {
    if (status === "approved") {
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    }
    if (status === "rejected") {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    }
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  };

  return (
    <main className="container py-10 lg:py-16">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold">Duyệt blog khách hàng</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/bookings")}
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm"
          >
            Đơn đặt phòng
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm"
          >
            Đăng xuất admin
          </button>
        </div>
      </div>

      {!posts.length ? (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 text-neutral-500">
          Chưa có bài viết nào.
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const isSeed = post.id.startsWith("seed_");
            return (
              <div
                key={post.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      post.status
                    )}`}
                  >
                    {getStatusLabel(post.status)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateGuestPostStatus(post.id, "approved")}
                      className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm disabled:opacity-50"
                      disabled={isSeed || post.status === "approved"}
                    >
                      Duyệt
                    </button>
                    <button
                      type="button"
                      onClick={() => updateGuestPostStatus(post.id, "rejected")}
                      className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm disabled:opacity-50"
                      disabled={isSeed || post.status === "rejected"}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
                <p className="text-sm text-neutral-500">
                  {new Date(post.createdAt).toLocaleString("vi-VN")} · {post.authorName}
                </p>
                <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

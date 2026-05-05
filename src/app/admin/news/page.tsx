"use client";

import React, { useEffect, useState } from "react";
import {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  getNewsEventName,
  NewsRecord,
  NewsStatus,
} from "@/utils/newsStorage";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useRouter } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import Label from "@/components/Label";

export default function AdminNewsPage() {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<NewsRecord[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<NewsStatus>("published");

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/utils/adminAuth").then(({ isAdminAuthenticated }) => {
        if (!isAdminAuthenticated()) {
          router.push("/admin/login?next=/admin/news");
        }
      });
    }
  }, [router]);

  const fetchPosts = async () => {
    const data = await getAllNews();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!isAdmin) return null;

  const resetForm = () => {
    setTitle("");
    setCoverImage("");
    setFbLink("");
    setContent("");
    setStatus("published");
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (post: NewsRecord) => {
    setTitle(post.title);
    setCoverImage(post.coverImage);
    setFbLink(post.fbLink);
    setContent(post.content);
    setStatus(post.status);
    setEditingId(post.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      await deleteNews(id);
      fetchPosts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Vui lòng nhập Tiêu đề và Nội dung!");
      return;
    }

    if (isEditing && editingId) {
      await updateNews(editingId, { title, coverImage, fbLink, content, status });
    } else {
      await addNews({ title, coverImage, fbLink, content, status });
    }
    resetForm();
    fetchPosts();
  };

  const toggleStatus = async (post: NewsRecord) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    await updateNews(post.id, { status: newStatus });
    fetchPosts();
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="container py-16 space-y-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Quản lý Tin tức & Sự kiện
      </h1>

      {/* Form thêm/sửa bài viết */}
      <section className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-2xl font-semibold mb-6">
          {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label>Tiêu đề bài viết (*)</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Link Ảnh bìa</Label>
            <Input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label>Link bài viết Facebook (Tuỳ chọn)</Label>
            <Input
              value={fbLink}
              onChange={(e) => setFbLink(e.target.value)}
              placeholder="https://www.facebook.com/..."
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Nội dung (*)</Label>
            <Textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết. Bạn có thể sử dụng các đoạn văn bản cách nhau bởi phím Enter..."
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between mt-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary-6000 rounded border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 focus:ring-primary-6000"
                checked={status === "published"}
                onChange={(e) => setStatus(e.target.checked ? "published" : "draft")}
              />
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                Đăng bài ngay lập tức (Nếu bỏ tick sẽ lưu dạng Bản nháp)
              </span>
            </label>

            <div className="space-x-3 flex">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-neutral-300 dark:border-neutral-6000 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  Hủy
                </button>
              )}
              <ButtonPrimary type="submit">
                {isEditing ? "Lưu thay đổi" : "Thêm bài viết"}
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </section>

      {/* Danh sách bài viết */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center justify-between">
          <span>Danh sách bài đăng ({posts.length})</span>
        </h2>
        
        {posts.length === 0 ? (
          <p className="text-neutral-500">Chưa có bài viết nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                  <th className="p-4 font-semibold w-1/3">Tiêu đề</th>
                  <th className="p-4 font-semibold">Trạng thái</th>
                  <th className="p-4 font-semibold">Ngày tạo</th>
                  <th className="p-4 font-semibold text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
                        {post.title}
                      </div>
                      {post.fbLink && (
                        <a href={post.fbLink} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block">
                          [Có Link FB]
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-neutral-500">{formatDate(post.createdAt)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2 py-1"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm px-2 py-1"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

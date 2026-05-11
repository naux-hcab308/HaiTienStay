"use client";

import React, { useEffect, useState } from "react";
import {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  uploadNewsImage,
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

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<NewsStatus>("published");
  const [isUploading, setIsUploading] = useState(false);

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
    <div className="container space-y-12 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Quản lý Tin tức & Sự kiện
      </h1>

      <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="mb-6 text-2xl font-semibold">
          {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label>Tiêu đề bài viết (*)</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Link ảnh bìa</Label>
            <div className="flex flex-col space-y-2">
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Hoặc nhập link trực tiếp (https://...)"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    setIsUploading(true);
                    try {
                      const url = await uploadNewsImage(file);
                      if (url) {
                        setCoverImage(url);
                      } else {
                        alert("Lỗi tải ảnh lên. Vui lòng thử lại!");
                      }
                    } catch (err) {
                      console.error("Upload error:", err);
                      alert("Lỗi tải ảnh lên.");
                    } finally {
                      setIsUploading(false);
                      e.target.value = ''; // Reset input
                    }
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer rounded-lg bg-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors"
                >
                  {isUploading ? "Đang tải..." : "Tải ảnh từ máy tính"}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Link bài viết Facebook (Tùy chọn)</Label>
            <Input
              value={fbLink}
              onChange={(e) => setFbLink(e.target.value)}
              placeholder="https://www.facebook.com/..."
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Nội dung (*)</Label>
            <Textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài viết. Bạn có thể xuống dòng bằng phím Enter..."
              required
            />
          </div>

          <div className="mt-4 flex items-center justify-between md:col-span-2">
            <label className="flex cursor-pointer items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 rounded border-neutral-300 text-primary-6000 focus:ring-primary-6000 dark:border-neutral-700 dark:bg-neutral-900"
                checked={status === "published"}
                onChange={(e) => setStatus(e.target.checked ? "published" : "draft")}
              />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Đăng bài ngay lập tức (nếu bỏ tick sẽ lưu dạng Bản nháp)
              </span>
            </label>

            <div className="flex space-x-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-neutral-300 px-6 py-3 transition-colors hover:bg-neutral-100 dark:border-neutral-6000 dark:hover:bg-neutral-700"
                >
                  Hủy
                </button>
              )}
              <ButtonPrimary type="submit" disabled={isUploading}>
                {isEditing ? "Lưu thay đổi" : "Thêm bài viết"}
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-6 flex items-center justify-between text-2xl font-semibold">
          <span>Danh sách bài đăng ({posts.length})</span>
        </h2>

        {posts.length === 0 ? (
          <p className="text-neutral-500">Chưa có bài viết nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                  <th className="w-1/3 p-4 font-semibold">Tiêu đề</th>
                  <th className="p-4 font-semibold">Trạng thái</th>
                  <th className="p-4 font-semibold">Ngày tạo</th>
                  <th className="p-4 text-right font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50">
                    <td className="p-4">
                      <div className="line-clamp-2 font-medium text-neutral-900 dark:text-neutral-100">
                        {post.title}
                      </div>
                      {post.fbLink && (
                        <a href={post.fbLink} target="_blank" rel="noreferrer" className="mt-1 block text-xs text-blue-500 hover:underline">
                          [Có Link FB]
                        </a>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-neutral-500">{formatDate(post.createdAt)}</td>
                    <td className="space-x-2 p-4 text-right">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-2 py-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-2 py-1 text-sm font-medium text-red-600 hover:text-red-800"
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

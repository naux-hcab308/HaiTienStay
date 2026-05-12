"use client";

import React, { useEffect, useState } from "react";
import { getContactMessages, ContactMessage } from "@/utils/contactStorage";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useRouter } from "next/navigation";

export default function AdminMessagesPage() {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@/utils/adminAuth").then(({ isAdminAuthenticated }) => {
        if (!isAdminAuthenticated()) {
          router.push("/admin/login?next=/admin/messages");
        }
      });
    }
  }, [router]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getContactMessages();
      setMessages(data);
      setIsLoading(false);
    };
    fetchMessages();
  }, []);

  if (!isAdmin) return null;

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
        Quản lý Tin nhắn Liên hệ
      </h1>

      <section>
        <h2 className="mb-6 flex items-center justify-between text-2xl font-semibold">
          <span>Danh sách tin nhắn ({messages.length})</span>
        </h2>

        {isLoading ? (
          <p className="text-neutral-500">Đang tải...</p>
        ) : messages.length === 0 ? (
          <p className="text-neutral-500">Chưa có tin nhắn nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                  <th className="p-4 font-semibold w-1/4">Ngày gửi</th>
                  <th className="p-4 font-semibold w-1/4">Khách hàng</th>
                  <th className="p-4 font-semibold w-1/2">Tin nhắn</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800/50"
                  >
                    <td className="p-4 text-sm text-neutral-500 align-top">
                      {formatDate(msg.created_at)}
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        {msg.name}
                      </div>
                      <div className="text-sm text-neutral-500 mt-1">
                        <a href={`mailto:${msg.email}`} className="text-blue-500 hover:underline">
                          {msg.email}
                        </a>
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                        {msg.message}
                      </p>
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

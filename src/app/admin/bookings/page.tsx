"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  getBookingEventName,
  getBookings,
  clearBookings,
  updateBookingStatus,
} from "@/utils/bookingStorage";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminAuth";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchAllBookings = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login?next=/admin/bookings");
      return;
    }

    fetchAllBookings();
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.replace("/admin/login");
  };

  const handleClear = () => {
    clearBookings();
    fetchAllBookings();
  };

  const handleUpdateStatus = async (id: string, status: any) => {
    await updateBookingStatus(id, status);
    fetchAllBookings();
  };

  const getStatusLabel = (status?: string) => {
    if (status === "accepted") return "Đã chấp nhận";
    if (status === "cancelled") return "Đã hủy";
    return "Chờ xử lý";
  };

  const getStatusClass = (status?: string) => {
    if (status === "accepted") {
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    }
    if (status === "cancelled") {
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    }
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
  };

  return (
    <main className="container py-10 lg:py-16">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold">Danh sách đặt phòng</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/blog-posts")}
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm"
          >
            Duyệt blog
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/affiliates")}
            className="px-3 py-2 rounded-lg bg-primary-600 text-white text-sm"
          >
            Quản lý Affiliate
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm"
          >
            Xóa danh sách
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

      {!bookings.length ? (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 text-neutral-500">
          Chưa có đơn đặt phòng nào.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                    b.status
                  )}`}
                >
                  {getStatusLabel(b.status)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, "accepted")}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm disabled:opacity-50"
                    disabled={b.status === "accepted"}
                  >
                    Chấp nhận
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(b.id, "cancelled")}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm disabled:opacity-50"
                    disabled={b.status === "cancelled"}
                  >
                    Hủy
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                <p>
                  <span className="font-semibold">Khách:</span> {b.customerName}
                </p>
                <p>
                  <span className="font-semibold">SĐT:</span> {b.phone}
                </p>
                <p>
                  <span className="font-semibold">Loại phòng:</span> {b.roomType}
                </p>
                <p>
                  <span className="font-semibold">Phòng:</span> {b.roomNo || "-"}
                </p>
                <p>
                  <span className="font-semibold">Check-in:</span> {b.checkIn || "-"}
                </p>
                <p>
                  <span className="font-semibold">Check-out:</span> {b.checkOut || "-"}
                </p>
                <p>
                  <span className="font-semibold">Số khách:</span> {b.guests || 0}
                </p>
                <p>
                  <span className="font-semibold">Tạo lúc:</span>{" "}
                  {new Date(b.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { getAffiliateStats } from "@/utils/affiliateService";

export default function AffiliatePublicDashboard() {
  const [refCode, setRefCode] = useState("");
  const [stats, setStats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refCode) return;
    setLoading(true);
    const data = await getAffiliateStats(refCode.toUpperCase());
    setStats(data);
    setLoading(false);
  };

  const totalEarned = stats?.reduce((acc, curr) => acc + (curr.commission_amount || 0), 0) || 0;
  const totalBookings = stats?.length || 0;
  const acceptedBookings = stats?.filter(b => b.status === 'accepted').length || 0;

  return (
    <main className="container py-10 lg:py-16 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Thống kê Affiliate (KOL)</h1>
        
        {!stats ? (
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-xl">
            <p className="mb-4 text-neutral-600 dark:text-neutral-400 text-center">
              Nhập mã giới thiệu của bạn để xem kết quả chiến dịch.
            </p>
            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="VD: LINHKA"
                className="flex-grow px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent uppercase font-mono text-lg"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Đang tải..." : "Xem thống kê"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-sm text-neutral-500 mb-1">Tổng đơn</p>
                <p className="text-3xl font-bold">{totalBookings}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-sm text-neutral-500 mb-1">Đã chấp nhận</p>
                <p className="text-3xl font-bold text-green-600">{acceptedBookings}</p>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-sm text-neutral-500 mb-1">Dự kiến hoa hồng</p>
                <p className="text-2xl font-bold text-primary-600">{(acceptedBookings * 50000).toLocaleString()}đ</p>
              </div>
            </div>

            <button 
              onClick={() => setStats(null)}
              className="text-sm text-neutral-500 hover:text-primary-600"
            >
              ← Quay lại nhập mã khác
            </button>

            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                <h2 className="font-semibold">Chi tiết các đơn đặt phòng</h2>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {stats.length === 0 ? (
                  <p className="p-8 text-center text-neutral-500">Chưa có đơn hàng nào từ mã giới thiệu này.</p>
                ) : (
                  stats.map((b, idx) => (
                    <div key={idx} className="p-4 flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium">{b.room_type}</p>
                        <p className="text-neutral-500 text-xs">{new Date(b.created_at).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        b.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                        b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {b.status === 'accepted' ? 'Thành công' : b.status === 'cancelled' ? 'Đã hủy' : 'Chờ duyệt'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

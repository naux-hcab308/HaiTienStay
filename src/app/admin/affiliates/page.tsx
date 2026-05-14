"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated, logoutAdmin } from "@/utils/adminAuth";
import { getAffiliates, deleteAffiliate, Affiliate } from "@/utils/affiliateService";
import { supabase } from "@/utils/supabaseClient";

export default function AdminAffiliatesPage() {
  const router = useRouter();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState("");
  const [refCode, setRefCode] = useState("");
  const [commission, setCommission] = useState(50000);
  const [showForm, setShowForm] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const data = await getAffiliates();
    setAffiliates(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/admin/login?next=/admin/affiliates");
      return;
    }
    fetchAll();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !refCode) return;

    const { data, error } = await supabase
      .from("affiliates")
      .insert([
        {
          name,
          ref_code: refCode.toUpperCase(),
          commission_rate: commission,
          password: "123456",
        },
      ])
      .select()
      .single();

    if (error) {
      alert("Lỗi Supabase: " + error.message);
    } else {
      setName("");
      setRefCode("");
      setShowForm(false);
      fetchAll();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa đối tác này?")) {
      await deleteAffiliate(id);
      fetchAll();
    }
  };

  return (
    <main className="container py-10 lg:py-16">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold">Quản lý Affiliate (KOL)</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
          >
            {showForm ? "✕ Hủy bỏ" : "+ Thêm đối tác mới"}
          </button>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="px-4 py-2 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Xem Bookings
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Tên đối tác (VD: Linh Ka)"
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mã giới thiệu (VD: LINHKA)"
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Hoa hồng (VND)"
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent"
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg">Lưu đối tác</button>
        </form>
      )}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50 dark:bg-neutral-800 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Tên đối tác</th>
                <th className="px-6 py-4 font-semibold">Mã REF</th>
                <th className="px-6 py-4 font-semibold text-center">Lượt Click</th>
                <th className="px-6 py-4 font-semibold">Hoa hồng/Đơn</th>
                <th className="px-6 py-4 font-semibold">Số dư</th>
                <th className="px-6 py-4 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {affiliates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">Chưa có đối tác nào.</td>
                </tr>
              ) : (
                affiliates.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-neutral-500">ID: {item.id.slice(0,8)}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-primary-600 font-bold">{item.ref_code}</td>
                    <td className="px-6 py-4 text-center">
                       <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
                         {item.click_count} click
                       </span>
                       <div className="text-[10px] text-neutral-400 mt-1">~{(Number(item.click_count || 0) * 5000).toLocaleString()}đ</div>
                    </td>
                    <td className="px-6 py-4">{item.commission_rate.toLocaleString()}đ</td>
                    <td className="px-6 py-4">
                       <div className="font-semibold text-green-600">{item.balance.toLocaleString()}đ</div>
                       <div className="text-[10px] text-neutral-400">Đã kiếm: {item.total_earned.toLocaleString()}đ</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPartnerSession, logoutPartner, isPartnerAuthenticated } from "@/utils/partnerAuth";
import { getPartnerStats, createGuestRequest, updatePartnerPassword } from "@/utils/partnerService";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";

export default function PartnerDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomType, setRoomType] = useState("Phòng đôi (2 người)");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getPartnerStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!isPartnerAuthenticated()) {
      router.replace("/partner/login");
      return;
    }
    fetchStats();
  }, [router]);

  const handleLogout = () => {
    logoutPartner();
    router.replace("/partner/login");
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await createGuestRequest({
      customerName,
      phone,
      roomType,
      checkIn,
      checkOut,
      guests
    });
    if (result) {
      alert("Đã gửi yêu cầu khách hàng thành công! Admin sẽ kiểm tra và duyệt.");
      setShowRequestForm(false);
      fetchStats();
    } else {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
    setSubmitting(false);
  };

  if (loading || !stats) return <div className="container py-20 text-center">Đang tải...</div>;

  return (
    <main className="container py-10 lg:py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Xin chào, {stats.partner.name}!</h1>
          <p className="text-neutral-500 mt-1">Mã đối tác: <span className="font-mono font-bold text-primary-600">{stats.partner.ref_code}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-50"
          >
            Đổi mật khẩu
          </button>
          <ButtonPrimary onClick={() => setShowRequestForm(!showRequestForm)}>
            {showRequestForm ? "Hủy yêu cầu" : "+ Tạo yêu cầu khách"}
          </ButtonPrimary>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-500 border border-red-200 rounded-xl hover:bg-red-50">
            Đăng xuất
          </button>
        </div>
      </div>

      {showPasswordForm && (
        <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 mb-10">
          <h2 className="text-xl font-bold mb-4">Cập nhật mật khẩu mới</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow">
              <label className="block text-sm mb-1">Mật khẩu mới</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  placeholder="Nhập mật khẩu mới..."
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`las ${showPassword ? "la-eye-slash" : "la-eye"} text-xl`}></i>
                </button>
              </div>
            </div>
            <ButtonPrimary onClick={async () => {
              if (newPassword.length < 6) {
                alert("Mật khẩu phải có ít nhất 6 ký tự.");
                return;
              }
              const success = await updatePartnerPassword(newPassword);
              if (success) {
                alert("Đã đổi mật khẩu thành công!");
                setShowPasswordForm(false);
                setNewPassword("");
              } else {
                alert("Có lỗi xảy ra, vui lòng thử lại.");
              }
            }}>
              Lưu mật khẩu
            </ButtonPrimary>
          </div>
        </div>
      )}

      {showRequestForm && (
        <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 mb-10">
          <h2 className="text-xl font-bold mb-6">Thông tin khách hàng</h2>
          <form onSubmit={handleSubmitRequest} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-1">Tên khách hàng</label>
              <Input value={customerName} onChange={e => setCustomerName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Số điện thoại</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Loại phòng</label>
              <Select value={roomType} onChange={e => setRoomType(e.target.value)}>
                <option value="Phòng đôi (2 người)">Phòng đôi (2 người)</option>
                <option value="Phòng 3 người">Phòng 3 người</option>
                <option value="Phòng 4 người">Phòng 4 người</option>
                <option value="Phòng 6 người">Phòng 6 người</option>
                <option value="Phòng 8 người">Phòng 8 người</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1">Ngày nhận phòng</label>
              <Input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Ngày trả phòng</label>
              <Input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Số khách</label>
              <Input type="number" value={guests} onChange={e => setGuests(Number(e.target.value))} required />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
               <ButtonPrimary type="submit" loading={submitting}>Gửi yêu cầu xác nhận</ButtonPrimary>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
           <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Lượt truy cập (PPC)</p>
           <p className="text-4xl font-bold">{stats.clicks}</p>
           <p className="text-xs text-blue-500 mt-2">Dự kiến: {(stats.clicks * 5000).toLocaleString()}đ</p>
        </div>
        <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-3xl border border-green-100 dark:border-green-800">
           <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Hoa hồng hiện tại</p>
           <p className="text-4xl font-bold">{stats.partner.balance.toLocaleString()}đ</p>
           <p className="text-xs text-green-500 mt-2">Đã nhận: {stats.partner.total_earned.toLocaleString()}đ</p>
        </div>
        <div className="p-8 bg-purple-50 dark:bg-purple-900/20 rounded-3xl border border-purple-100 dark:border-purple-800">
           <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Link giới thiệu của bạn</p>
           <div className="flex items-center gap-2 mt-2">
             <input readOnly value={`${window.location.origin}/?ref=${stats.partner.ref_code}`} className="flex-grow bg-white dark:bg-neutral-800 border-none text-xs p-2 rounded-lg" />
             <button onClick={() => {
               navigator.clipboard.writeText(`${window.location.origin}/?ref=${stats.partner.ref_code}`);
               alert("Đã copy link!");
             }} className="p-2 bg-white dark:bg-neutral-800 rounded-lg text-xs font-bold">Copy</button>
           </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Lịch sử giới thiệu khách hàng</h2>
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 dark:bg-neutral-800 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Phòng</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Hoa hồng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700 text-sm">
            {stats.bookings.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-neutral-500">Bạn chưa có đơn khách nào. Hãy bắt đầu giới thiệu!</td></tr>
            ) : (
              stats.bookings.map((b: any) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 font-medium">{b.customer_name}</td>
                  <td className="px-6 py-4">{b.room_type}</td>
                  <td className="px-6 py-4 text-neutral-500">{new Date(b.created_at).toLocaleDateString('vi-VN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      b.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {b.status === 'accepted' ? 'Thành công' : b.status === 'cancelled' ? 'Từ chối' : 'Đang chờ duyệt'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary-600">
                    {b.status === 'accepted' ? `+${(b.commission_amount || 0).toLocaleString()}đ` : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

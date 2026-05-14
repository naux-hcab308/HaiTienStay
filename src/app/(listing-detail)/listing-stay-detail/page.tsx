"use client";

import type { Route } from "next";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addBooking } from "@/utils/bookingStorage";
import { getSelectedIndexByRoomNo, ROOM_TYPES } from "./roomTypes";

const tienIch = [
  "Bữa sáng miễn phí",
  "Xe điện đưa đón 02 chiều đi tham quan khu vui chơi & bãi biển Flamingo, đi thăm chùa Bụt - ngôi chùa nhìn ra biển nổi tiếng Hải Tiến",
  "Đi thăm đền thờ Tô Hiến Thành - di tích lịch sử Quốc Gia",
];

export default function ListingStayDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedRoomNo = (searchParams.get("room") || "").toUpperCase();

  const initialIndex = useMemo(
    () => getSelectedIndexByRoomNo(selectedRoomNo || null),
    [selectedRoomNo]
  );
  const [selectedRoom, setSelectedRoom] = useState(initialIndex);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    setSelectedRoom(initialIndex);
  }, [initialIndex]);

  const room = ROOM_TYPES[selectedRoom];
  const effectiveRoomNo = useMemo(() => {
    if (selectedRoomNo && room.roomNos.includes(selectedRoomNo)) {
      return selectedRoomNo;
    }
    return room.roomNos[0] || "";
  }, [room, selectedRoomNo]);

  const handleSelectRoom = (index: number) => {
    setSelectedRoom(index);

    const nextRoomNo = ROOM_TYPES[index].roomNos[0];
    const params = new URLSearchParams(searchParams.toString());

    if (nextRoomNo) {
      params.set("room", nextRoomNo);
    } else {
      params.delete("room");
    }

    const nextQuery = params.toString();
    router.replace((nextQuery ? `${pathname}?${nextQuery}` : pathname) as Route);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn đầy đủ ngày nhận phòng và trả phòng.");
      return;
    }

    if (checkIn < today) {
      alert("Ngày nhận phòng không được ở trong quá khứ.");
      return;
    }

    if (checkOut < checkIn) {
      alert("Ngày trả phòng phải từ ngày nhận phòng trở đi.");
      return;
    }

    setIsSubmitting(true);
    const booking = await addBooking({
      roomType: room.label,
      roomNo: effectiveRoomNo,
      customerName: customerName || "Khách vãng lai",
      phone: phone || "Chưa cung cấp",
      checkIn,
      checkOut,
      guests: Number.isNaN(guests) ? 1 : guests,
    });
    setIsSubmitting(false);

    if (booking) {
      router.push(`/checkout?bookingId=${encodeURIComponent(booking.id)}`);
    } else {
      alert("Đã xảy ra lỗi khi đặt phòng. Vui lòng thử lại!");
    }
  };

  return (
    <main className="container py-10 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-neutral-100 p-8 dark:bg-neutral-800">
            <h1 className="text-3xl font-bold lg:text-4xl">
              Phòng tiêu chuẩn - Yara Homestay
            </h1>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              Danh sách giá theo từng hạng phòng. Bạn có thể chọn nhanh hạng phòng
              bên dưới để cập nhật thông tin đặt phòng tương ứng.
            </p>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                Chọn loại phòng:
              </p>
              <div className="flex flex-wrap gap-2">
                {ROOM_TYPES.map((rt, i) => (
                  <button
                    key={rt.id}
                    onClick={() => handleSelectRoom(i)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedRoom === i
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                    }`}
                  >
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {effectiveRoomNo ? (
                <span className="rounded-full bg-white px-3 py-1 dark:bg-neutral-700">
                  Phòng đã chọn: {effectiveRoomNo}
                </span>
              ) : null}
              <span className="rounded-full bg-white px-3 py-1 dark:bg-neutral-700">
                {room.sucChua}
              </span>
              <span className="rounded-full bg-white px-3 py-1 dark:bg-neutral-700">
                {room.giuong}
              </span>
              <span className="rounded-full bg-primary-100 px-3 py-1 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {room.tag}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-neutral-700 dark:text-neutral-300">
              <p>{room.weekdayPriceLabel}</p>
              <p>{room.weekendPriceLabel}</p>
              {room.isBestSeller ? <p className="font-semibold">(Best seller)</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold">Tiện nghi & không gian chung</h2>
            <ul className="mt-4 grid gap-3 text-neutral-700 dark:text-neutral-300 sm:grid-cols-2">
              {tienIch.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-neutral-100 p-3 dark:border-neutral-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 p-6 dark:border-neutral-700">
            <h2 className="text-2xl font-semibold">Chính sách lưu trú</h2>
            <div className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>- Nhận phòng: từ 14:00 | Trả phòng: trước 12:00.</p>
              <p>- Hủy trước 5 ngày: hoàn cọc 100%.</p>
              <p>- Hủy trước 2 ngày: hoàn cọc 50%.</p>
              <p>- Không hút thuốc trong phòng.</p>
            </div>
          </div>
        </section>

        <aside
          id="booking-form"
          className="h-fit rounded-3xl border border-neutral-200 p-6 dark:border-neutral-700 lg:sticky lg:top-28"
        >
          <p className="text-sm text-neutral-500">Giá từ</p>
          <p className="mt-1 text-3xl font-bold text-primary-600">{room.priceFrom}</p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{room.label}</p>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            {room.weekdayPriceLabel}
          </p>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
            {room.weekendPriceLabel}
          </p>

          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            <select
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
              value={selectedRoom}
              onChange={(e) => handleSelectRoom(Number(e.target.value))}
            >
              {ROOM_TYPES.map((rt, i) => (
                <option key={rt.id} value={i}>
                  {rt.label} - {rt.priceFrom}
                </option>
              ))}
            </select>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 dark:border-neutral-700"
              placeholder="Họ và tên"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 dark:border-neutral-700"
              placeholder="Số điện thoại"
            />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={today}
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 dark:border-neutral-700"
            />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || today}
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 dark:border-neutral-700"
            />
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 dark:border-neutral-700"
              placeholder="Số khách"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full rounded-xl bg-primary-500 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
            >
              {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu đặt phòng"}
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}

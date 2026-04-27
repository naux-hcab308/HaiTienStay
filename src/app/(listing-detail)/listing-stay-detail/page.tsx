"use client";
import React, { useState } from "react";
import Link from "next/link";

const tienIch = [
  "Wifi tốc độ cao toàn khu",
  "Máy lạnh, nước nóng, máy sấy tóc",
  "Khu bếp chung và bàn ăn ngoài trời",
  "Bãi đỗ xe miễn phí",
  "Khu BBQ buổi tối",
  "Không gian mở, sân vườn thoáng",
];

const ROOM_TYPES = [
  { label: "Phòng đôi (2 người)", suc_chua: "2 người lớn", giuong: "1 giường đôi", gia: "850.000đ/đêm", tag: "Couple" },
  { label: "Phòng 3 người", suc_chua: "3 người lớn", giuong: "1 đôi + 1 đơn", gia: "1.050.000đ/đêm", tag: "Family" },
  { label: "Phòng 4 người", suc_chua: "4 người lớn", giuong: "2 giường đôi", gia: "1.200.000đ/đêm", tag: "Family" },
  { label: "Phòng 6 người", suc_chua: "6 người lớn", giuong: "3 giường đôi", gia: "1.600.000đ/đêm", tag: "Group" },
  { label: "Phòng 8 người", suc_chua: "8 người lớn", giuong: "4 giường đôi", gia: "2.000.000đ/đêm", tag: "Group" },
];

export default function ListingStayDetailPage() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const room = ROOM_TYPES[selectedRoom];

  return (
    <main className="container py-10 lg:py-16">
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8">
            <p className="text-sm text-neutral-500">Hạng phòng duy nhất</p>
            <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
              Phòng tiêu chuẩn – Yara Homestay
            </h1>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              5 loại phòng linh hoạt theo số lượng khách, thiết kế tối giản, sạch sẽ,
              có cửa sổ thoáng và ban công nhỏ nhìn ra không gian chung.
            </p>

            {/* Chọn loại phòng */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-3">
                Chọn loại phòng:
              </p>
              <div className="flex flex-wrap gap-2">
                {ROOM_TYPES.map((rt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedRoom(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      selectedRoom === i
                        ? "bg-primary-500 text-white border-primary-500"
                        : "bg-white dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:border-primary-400"
                    }`}
                  >
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Thông số phòng đang chọn */}
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700">
                {room.suc_chua}
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700">
                {room.giuong}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {room.tag}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-2xl font-semibold">Tiện nghi &amp; không gian chung</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-neutral-700 dark:text-neutral-300">
              {tienIch.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-neutral-100 dark:border-neutral-700 p-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-2xl font-semibold">Chính sách lưu trú</h2>
            <div className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>- Nhận phòng: từ 14:00 | Trả phòng: trước 12:00.</p>
              <p>- Hủy trước 5 ngày: hoàn cọc 100%.</p>
              <p>- Hủy trước 2 ngày: hoàn cọc 50%.</p>
              <p>- Không hút thuốc trong phòng.</p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-neutral-200 dark:border-neutral-700 p-6 h-fit lg:sticky lg:top-28">
          <p className="text-sm text-neutral-500">Giá từ</p>
          <p className="text-3xl font-bold mt-1 text-primary-600">{room.gia}</p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {room.label}
          </p>

          <form className="mt-5 space-y-3">
            {/* Dropdown loại phòng trong form */}
            <select
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3 text-neutral-700 dark:text-neutral-200"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(Number(e.target.value))}
            >
              {ROOM_TYPES.map((rt, i) => (
                <option key={i} value={i}>
                  {rt.label} — {rt.gia}
                </option>
              ))}
            </select>
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Họ và tên"
            />
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Số điện thoại"
            />
            <input
              type="date"
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            />
            <input
              type="date"
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            />
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Số khách"
            />
            <Link
              href="/checkout"
              className="block text-center w-full rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors text-white py-3 font-semibold"
            >
              Gửi yêu cầu đặt phòng
            </Link>
          </form>
        </aside>
      </div>
    </main>
  );
}

import React from "react";
import Link from "next/link";

const tienIch = [
  "Wifi tốc độ cao toàn khu",
  "Máy lạnh, nước nóng, máy sấy tóc",
  "Khu bếp chung và bàn ăn ngoài trời",
  "Bãi đỗ xe miễn phí",
  "Khu BBQ buổi tối",
  "Không gian mở, sân vườn thoáng",
];

export default function ListingStayDetailPage() {
  return (
    <main className="container py-10 lg:py-16">
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8">
            <p className="text-sm text-neutral-500">Hạng phòng duy nhất</p>
            <h1 className="mt-2 text-3xl lg:text-4xl font-bold">
              Phòng tiêu chuẩn Hải Tiến Stay
            </h1>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              8 phòng giống nhau, thiết kế tối giản, sạch sẽ, có cửa sổ thoáng
              và ban công nhỏ nhìn ra không gian chung.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700">
                22m²
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700">
                2 người lớn + 1 trẻ em
              </span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700">
                1 giường đôi
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h2 className="text-2xl font-semibold">Tiện nghi & không gian chung</h2>
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
          <p className="text-3xl font-bold mt-1">850.000đ/đêm</p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Áp dụng cho 1 phòng tiêu chuẩn
          </p>

          <form className="mt-5 space-y-3">
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Họ và tên"
            />
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Số điện thoại"
            />
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Ngày nhận phòng (dd/mm/yyyy)"
            />
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Ngày trả phòng (dd/mm/yyyy)"
            />
            <input
              className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
              placeholder="Số khách"
            />
            <Link
              href="/checkout"
              className="block text-center w-full rounded-xl bg-blue-600 text-white py-3 font-semibold"
            >
              Gửi yêu cầu đặt phòng
            </Link>
          </form>
        </aside>
      </div>
    </main>
  );
}

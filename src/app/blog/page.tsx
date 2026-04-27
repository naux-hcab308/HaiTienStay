import Link from "next/link";
import React from "react";

const baiVietMau = [
  {
    slug: "binh-minh-hai-tien",
    tieuDe: "Bình minh ở biển Hải Tiến và ly cafe đầu ngày",
    tacGia: "Lan Anh",
    ngay: "26/04/2026",
    tomTat:
      "Mình dậy sớm để ngắm mặt trời lên, gió biển mát và không gian chung của homestay cực kỳ chill.",
  },
  {
    slug: "cuoi-tuan-cung-gia-dinh",
    tieuDe: "Cuối tuần nhẹ nhàng cùng gia đình 5 người",
    tacGia: "Minh Quân",
    ngay: "24/04/2026",
    tomTat:
      "Phòng nhỏ gọn nhưng sạch sẽ, khu bếp chung rất tiện để cả nhà nấu ăn buổi tối.",
  },
  {
    slug: "dem-bbq-ben-gio-bien",
    tieuDe: "Đêm BBQ bên gió biển",
    tacGia: "Thu Hà",
    ngay: "20/04/2026",
    tomTat:
      "Điểm mình thích nhất là sân vườn mở và khu BBQ, lên đèn buổi tối rất đẹp để chụp ảnh.",
  },
];

export default function BlogPage() {
  return (
    <main className="container py-10 lg:py-16 space-y-8">
      <section className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Blog trải nghiệm khách lưu trú
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Nơi khách chia sẻ cảm nhận sau chuyến đi tại Hải Tiến Stay. Bạn có thể
          đọc nhanh các bài gần đây hoặc gửi bài viết mới ngay tại đây.
        </p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        {baiVietMau.map((bai) => (
          <article
            key={bai.slug}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5"
          >
            <p className="text-xs text-neutral-500">
              {bai.ngay} · {bai.tacGia}
            </p>
            <h2 className="mt-2 text-xl font-semibold leading-snug">
              {bai.tieuDe}
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              {bai.tomTat}
            </p>
            <Link
              href={`/blog/${bai.slug}`}
              className="inline-block mt-4 text-blue-600 font-medium"
            >
              Đọc bài viết
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
        <h2 className="text-2xl font-semibold">Viết blog trải nghiệm</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Mẫu gửi nhanh cho khách (phiên bản demo giao diện).
        </p>
        <form className="mt-4 grid md:grid-cols-2 gap-3">
          <input
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Họ và tên"
          />
          <input
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Tiêu đề bài viết"
          />
          <textarea
            className="md:col-span-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3 min-h-[140px]"
            placeholder="Chia sẻ trải nghiệm của bạn..."
          />
          <button
            type="button"
            className="md:col-span-2 rounded-xl bg-blue-600 text-white py-3 font-semibold"
          >
            Gửi bài viết
          </button>
        </form>
      </section>
    </main>
  );
}

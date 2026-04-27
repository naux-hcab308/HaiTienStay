import React from "react";
import Link from "next/link";

const phong = Array.from({ length: 8 }, (_, i) => ({
  soPhong: `P${(i + 1).toString().padStart(2, "0")}`,
  sucChua: "2 người lớn + 1 trẻ em",
  gia: "850.000đ/đêm",
}));

export default function ListingStayPage() {
  return (
    <main className="container py-10 lg:py-16">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold">Danh sách phòng</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Homestay có duy nhất 1 hạng phòng, gồm 8 phòng giống nhau về diện tích
          và tiện nghi.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {phong.map((item) => (
          <article
            key={item.soPhong}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 bg-white dark:bg-neutral-900"
          >
            <p className="text-sm text-neutral-500">Phòng tiêu chuẩn biển</p>
            <h2 className="mt-1 text-xl font-semibold">{item.soPhong}</h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              Sức chứa: {item.sucChua}
            </p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Giá tham khảo: {item.gia}
            </p>
            <Link
              href="/listing-stay-detail"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            >
              Xem chi tiết & đặt phòng
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

import React from "react";
import Link from "next/link";

const phong = [
  { soPhong: "P101", sucChua: "02 người lớn + 01 người lớn/01 trẻ em" },
  { soPhong: "P102", sucChua: "02 người lớn" },
  { soPhong: "P103", sucChua: "02 người lớn" },
  { soPhong: "P104", sucChua: "02 người lớn + 01 người lớn/01 trẻ em" },
  { soPhong: "P105", sucChua: "6 người lớn" },
  { soPhong: "P106", sucChua: "8 người lớn" },
  { soPhong: "P107", sucChua: "4 người lớn" },
];

export default function ListingStayPage() {
  return (
    <main className="container py-10 lg:py-16">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold">Danh sách phòng</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Danh sách 7 phòng hiện có và sức chứa tương ứng.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {phong.map((item) => (
          <article
            key={item.soPhong}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 bg-white dark:bg-neutral-900 flex flex-col"
          >
            <p className="text-sm text-neutral-500">Phòng tiêu chuẩn biển</p>
            <h2 className="mt-1 text-xl font-semibold">{item.soPhong}</h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              Sức chứa: {item.sucChua}
            </p>
            <Link
              href={`/listing-stay-detail?room=${item.soPhong}#booking-form`}
              className="inline-block mt-auto pt-4 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors self-start"
            >
              Xem chi tiết & đặt phòng
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}


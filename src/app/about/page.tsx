import React from "react";

export default function PageAbout() {
  return (
    <main className="container py-10 lg:py-16 space-y-6">
      <section className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Giới thiệu Hải Tiến Stay
        </h1>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Hải Tiến Stay là homestay nhỏ nằm gần biển Hải Tiến, vận hành theo mô
          hình tinh gọn với 1 hạng phòng duy nhất và 8 phòng giống nhau. Chúng
          tôi tập trung vào trải nghiệm nghỉ dưỡng yên tĩnh, sạch sẽ, thân thiện
          và gần gũi thiên nhiên.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold">Vai trò 1: Khách</h2>
          <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>- Xem thông tin phòng và kiểm tra giá.</li>
            <li>- Gửi yêu cầu đặt phòng nhanh trên website.</li>
            <li>- Viết blog chia sẻ trải nghiệm sau chuyến đi.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold">Vai trò 2: Quản trị homestay</h2>
          <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>- Quản lý 8 phòng của hạng phòng tiêu chuẩn.</li>
            <li>- Xác nhận lịch đặt phòng và hỗ trợ khách.</li>
            <li>- Duyệt các bài blog trải nghiệm từ khách lưu trú.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

import React from "react";

export default function PageAbout() {
  return (
    <main className="container py-10 lg:py-16 space-y-6">
      <section className="rounded-3xl bg-neutral-100 dark:bg-neutral-800 p-8 lg:p-10">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Giới thiệu Hải Tiến Stay
        </h1>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 max-w-3xl">
          Yara Hải Tiến là homestay xinh xắn nằm cách biển chỉ khoảng 500m, đủ
          gần để bạn dễ dàng dạo biển nhưng vẫn giữ được sự yên tĩnh, thư giãn.
          Không gian nơi đây nổi bật với sân vườn xanh mát, thiết kế theo phong
          cách mộc mạc nhưng tinh tế, kết hợp gạch thô, cây xanh và những chi
          tiết trang trí đầy cảm xúc. Homestay có đầy đủ tiện ích như quầy bar,
          khu bếp để tự nấu, mang lại cảm giác gần gũi như ở nhà. Điểm khác
          biệt của Yara là chú trọng trải nghiệm khách hàng: chỉ cần thuê phòng
          đã bao gồm bữa sáng và dịch vụ đưa đón tham quan các địa điểm nổi
          tiếng tại Hải Tiến, giúp bạn tận hưởng kỳ nghỉ trọn vẹn nhất.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold">Biển Hải Tiến</h2>
          <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>- Bãi biển dài, thoải và sạch, phù hợp tắm biển và dạo bộ.</li>
            <li>- Bình minh và hoàng hôn đẹp, thích hợp check-in, nghỉ ngơi.</li>
            <li>- Khu vực quanh biển có nhiều quán ăn hải sản địa phương.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-semibold">Đền thờ Tô Hiến Thành</h2>
          <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>- Di tích lịch sử văn hóa gắn với danh nhân Tô Hiến Thành.</li>
            <li>- Không gian đền cổ kính, yên tĩnh, phù hợp tham quan tâm linh.</li>
            <li>- Là điểm dừng chân ý nghĩa khi khám phá Hải Tiến - Hoằng Hóa.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

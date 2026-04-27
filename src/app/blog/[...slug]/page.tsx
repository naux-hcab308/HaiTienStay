import Link from "next/link";

const baiMau: Record<
  string,
  { tieuDe: string; noiDung: string; tacGia: string; ngay: string }
> = {
  "binh-minh-hai-tien": {
    tieuDe: "Bình minh ở biển Hải Tiến và ly cafe đầu ngày",
    tacGia: "Lan Anh",
    ngay: "26/04/2026",
    noiDung:
      "Mình ở Hải Tiến Stay 2 ngày 1 đêm. Điều thích nhất là sân vườn mở và góc cafe nhìn ra biển, sáng sớm cực kỳ yên bình. Phòng sạch, gọn gàng, vừa đủ tiện nghi cho gia đình nhỏ.",
  },
  "cuoi-tuan-cung-gia-dinh": {
    tieuDe: "Cuối tuần nhẹ nhàng cùng gia đình 5 người",
    tacGia: "Minh Quân",
    ngay: "24/04/2026",
    noiDung:
      "Gia đình mình đặt 2 phòng trong 8 phòng của homestay. Các phòng giống nhau nên rất dễ chọn. Buổi tối cả nhà dùng bếp chung và ngồi ngoài trời trò chuyện rất thoải mái.",
  },
  "dem-bbq-ben-gio-bien": {
    tieuDe: "Đêm BBQ bên gió biển",
    tacGia: "Thu Hà",
    ngay: "20/04/2026",
    noiDung:
      "Khu BBQ ở không gian mở là điểm cộng lớn. Nhóm mình tự chuẩn bị đồ ăn, bật nhạc nhẹ và có một buổi tối rất đáng nhớ. Chủ nhà hỗ trợ nhiệt tình và phản hồi nhanh.",
  },
};

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug?.[0] || "";
  const bai = baiMau[slug] || {
    tieuDe: "Bài viết không tồn tại",
    tacGia: "Hệ thống",
    ngay: "Hôm nay",
    noiDung: "Không tìm thấy nội dung phù hợp. Vui lòng quay về trang blog.",
  };

  return (
    <main className="container py-10 lg:py-16">
      <article className="max-w-3xl mx-auto rounded-3xl border border-neutral-200 dark:border-neutral-700 p-8">
        <p className="text-sm text-neutral-500">
          {bai.ngay} · {bai.tacGia}
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight">{bai.tieuDe}</h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          {bai.noiDung}
        </p>

        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-5">
          <p className="font-semibold">Bạn cũng có thể chia sẻ trải nghiệm của mình.</p>
          <Link href="/blog" className="inline-block mt-3 text-blue-600 font-medium">
            Quay lại trang blog trải nghiệm
          </Link>
        </div>
      </article>
    </main>
  );
}

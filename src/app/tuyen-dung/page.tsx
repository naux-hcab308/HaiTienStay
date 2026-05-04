import React from "react";

const phucLoi = [
  {
    icon: "🏖️",
    title: "Nghỉ phép linh hoạt",
    desc: "12 ngày phép/năm, được nghỉ phép không lương tối đa 30 ngày theo thỏa thuận.",
  },
  {
    icon: "💰",
    title: "Lương thưởng cạnh tranh",
    desc: "Mức lương hấp dẫn theo năng lực, thưởng dịp lễ Tết, thưởng hoàn thành KPI tháng/quý.",
  },
  {
    icon: "🍽️",
    title: "Bữa ăn miễn phí",
    desc: "Hỗ trợ 1–2 bữa ăn ca trong ca làm việc, đảm bảo đầy đủ dinh dưỡng cho nhân viên.",
  },
  {
    icon: "🏥",
    title: "Bảo hiểm đầy đủ",
    desc: "Tham gia BHXH, BHYT, BHTN theo quy định nhà nước ngay từ tháng đầu tiên làm việc.",
  },
  {
    icon: "📚",
    title: "Đào tạo & Phát triển",
    desc: "Được đào tạo kỹ năng nghiệp vụ, hỗ trợ học phí các khóa liên quan đến công việc.",
  },
  {
    icon: "🌊",
    title: "Không gian làm việc biển",
    desc: "Làm việc trong môi trường gần biển Hải Tiến, thoáng đãng và truyền cảm hứng mỗi ngày.",
  },
  {
    icon: "🎉",
    title: "Team building định kỳ",
    desc: "Du lịch, dã ngoại team building 1–2 lần/năm do công ty tài trợ toàn bộ chi phí.",
  },
  {
    icon: "🏠",
    title: "Hỗ trợ chỗ ở",
    desc: "Nhân viên xa nhà được hỗ trợ tìm phòng trọ hoặc ký túc xá nội bộ với giá ưu đãi.",
  },
];

const viTriTuyenDung = [
  {
    title: "Nhân viên Lễ tân – Chăm sóc khách",
    type: "Toàn thời gian",
    level: "Mới tốt nghiệp / Có kinh nghiệm",
    thu_nhap: "Trao đổi khi phỏng vấn",
    mo_ta: [
      "Đón tiếp, check-in/check-out khách lưu trú.",
      "Hỗ trợ khách trong suốt thời gian lưu trú.",
      "Xử lý các yêu cầu đặt phòng qua điện thoại/zalo.",
      "Giới thiệu dịch vụ và các điểm tham quan gần homestay.",
    ],
    yeu_cau: [
      "Giao tiếp tốt, thân thiện, nhiệt tình.",
      "Ưu tiên có kinh nghiệm nhà hàng/khách sạn.",
      "Sử dụng được máy tính cơ bản.",
    ],
  },
  {
    title: "Nhân viên Buồng phòng – Vệ sinh",
    type: "Toàn thời gian / Bán thời gian",
    level: "Không yêu cầu kinh nghiệm",
    thu_nhap: "Trao đổi khi phỏng vấn",
    mo_ta: [
      "Dọn dẹp, vệ sinh phòng ngủ trước và sau khi khách trả phòng.",
      "Giặt là ga giường, khăn tắm và đồ vải.",
      "Kiểm tra và báo cáo tình trạng cơ sở vật chất phòng.",
      "Chuẩn bị amenities (đồ dùng vệ sinh) cho từng phòng.",
    ],
    yeu_cau: [
      "Cẩn thận, tỉ mỉ, có trách nhiệm với công việc.",
      "Sức khỏe tốt, nhanh nhẹn.",
      "Ưu tiên nữ giới, tuổi 20–40.",
    ],
  },
  {
    title: "Nhân viên Marketing – Content Mạng xã hội",
    type: "Toàn thời gian",
    level: "Có kinh nghiệm từ 1 năm trở lên",
    thu_nhap: "Trao đổi khi phỏng vấn",
    mo_ta: [
      "Quản lý Fanpage Facebook, TikTok, Instagram của Yara.",
      "Sáng tạo nội dung ảnh, video giới thiệu phòng và trải nghiệm.",
      "Lên kế hoạch và chạy quảng cáo Facebook Ads / Google Ads.",
      "Phân tích số liệu và báo cáo hiệu quả hàng tuần.",
    ],
    yeu_cau: [
      "Biết dùng Canva, Capcut hoặc các công cụ thiết kế cơ bản.",
      "Có kinh nghiệm content cho homestay/du lịch là lợi thế lớn.",
      "Tư duy sáng tạo, yêu thích nhiếp ảnh và du lịch.",
    ],
  },
  {
    title: "Quản lý Vận hành Homestay",
    type: "Toàn thời gian",
    level: "Có kinh nghiệm từ 2 năm trở lên",
    thu_nhap: "Trao đổi khi phỏng vấn",
    mo_ta: [
      "Giám sát toàn bộ hoạt động hàng ngày của homestay.",
      "Quản lý nhân sự ca kíp, phân công công việc.",
      "Xử lý khiếu nại, phản hồi của khách hàng.",
      "Báo cáo doanh thu, tình trạng phòng cho ban quản lý.",
    ],
    yeu_cau: [
      "Kinh nghiệm quản lý nhà nghỉ/homestay/khách sạn nhỏ.",
      "Kỹ năng lãnh đạo, giải quyết vấn đề tốt.",
      "Thành thạo Excel, phần mềm quản lý đặt phòng.",
    ],
  },
];

export default function TuyenDungPage() {
  return (
    <main className="bg-white dark:bg-neutral-900">
      {/* HERO BANNER */}
      <section className="relative bg-primary-500 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="container relative z-10 text-center">
          <p className="text-primary-100 uppercase tracking-widest text-sm font-medium mb-3">
            Cơ hội nghề nghiệp
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Gia nhập đội ngũ Yara 🌊
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            Chúng mình đang tìm kiếm những người đam mê du lịch, yêu thích biển
            và muốn tạo ra những kỳ nghỉ đáng nhớ cho khách lưu trú.
          </p>
          <a
            href="#vi-tri"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-white text-neutral-900 font-semibold text-base hover:bg-primary-50 transition-colors"
          >
            Xem vị trí tuyển dụng ↓
          </a>
        </div>
      </section>

      {/* PHÚC LỢI */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-primary-500 uppercase tracking-widest text-sm font-medium mb-2">
              Vì sao chọn Yara?
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              Phúc lợi nhân viên
            </h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
              Chúng tôi tin rằng nhân viên hạnh phúc tạo nên những vị khách hài
              lòng. Đây là những gì Yara dành cho bạn.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phucLoi.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VỊ TRÍ TUYỂN DỤNG */}
      <section id="vi-tri" className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-primary-500 uppercase tracking-widest text-sm font-medium mb-2">
              Đang mở
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
              Vị trí tuyển dụng
            </h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
              Tất cả vị trí làm việc tại Yara Homestay – Biển Hải Tiến, Thanh Hóa.
            </p>
          </div>

          <div className="space-y-8">
            {viTriTuyenDung.map((vt, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header vị trí */}
                <div className="bg-primary-50 dark:bg-primary-900/20 px-6 py-5 border-b border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                      {vt.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 text-xs font-medium">
                        {vt.type}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 text-xs font-medium">
                        {vt.level}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-medium">
                        💰 Thu nhập: {vt.thu_nhap}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:haitienstayyara@gmail.com?subject=Ứng tuyển: ${vt.title}`}
                    className="shrink-0 inline-block px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors"
                  >
                    Ứng tuyển ngay
                  </a>
                </div>

                {/* Nội dung */}
                <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-3 flex items-center gap-2">
                      <span className="text-primary-500">📋</span> Mô tả công việc
                    </h4>
                    <ul className="space-y-2">
                      {vt.mo_ta.map((m, j) => (
                        <li
                          key={j}
                          className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                        >
                          <span className="text-primary-400 mt-0.5">•</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-700 dark:text-neutral-200 mb-3 flex items-center gap-2">
                      <span className="text-primary-500">✅</span> Yêu cầu
                    </h4>
                    <ul className="space-y-2">
                      {vt.yeu_cau.map((y, j) => (
                        <li
                          key={j}
                          className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2"
                        >
                          <span className="text-green-500 mt-0.5">✓</span>
                          {y}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – GỬI CV */}
      <section className="py-20 px-4 bg-primary-500 text-white text-center">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Không thấy vị trí phù hợp?
          </h2>
          <p className="text-primary-100 text-lg max-w-xl mx-auto mb-8">
            Gửi CV của bạn cho chúng mình. Khi có vị trí phù hợp, Yara sẽ liên
            hệ ngay với bạn!
          </p>
          <a
            href="mailto:haitienstayyara@gmail.com?subject=Gửi CV ứng tuyển Yara Homestay"
            className="inline-block px-10 py-4 rounded-full bg-white text-neutral-900 font-semibold text-base hover:bg-primary-50 transition-colors"
          >
            📩 Gửi CV cho Yara
          </a>
          <p className="mt-4 text-primary-200 text-sm">
            Hoặc liên hệ trực tiếp qua Zalo:{" "}
            <span className="font-semibold text-white">0833555757</span>
          </p>
        </div>
      </section>
    </main>
  );
}

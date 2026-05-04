type TravelSpot = {
  name: string;
  mapUrl: string;
  shortIntro: string;
  imageSrc: string;
};

const TRAVEL_SPOTS: TravelSpot[] = [
  {
    name: "Homestay Yara",
    mapUrl: "https://maps.app.goo.gl/t2vvq9vXxyrCUkU87",
    shortIntro:
      "Điểm dừng chân trung tâm của hành trình, không gian yên tĩnh, tiện nghỉ ngơi trước khi khám phá biển Hải Tiến.",
    imageSrc: "/du-lich/homestay-yara.jpg",
  },
  {
    name: "Flamingo Hải Tiến",
    mapUrl: "https://maps.app.goo.gl/6VBdLpfmexap9vu29",
    shortIntro:
      "Khu nghỉ dưỡng hiện đại với cảnh quan rộng, phù hợp check-in, dạo bộ và tận hưởng không khí biển.",
    imageSrc: "/du-lich/flamingo-hai-tien.webp",
  },
  {
    name: "Cầu cảng Hải Tiến",
    mapUrl: "https://maps.app.goo.gl/cFkDjAA85QZAFxZt7",
    shortIntro:
      "Điểm ngắm biển thoáng đãng, lý tưởng để chụp ảnh bình minh hoặc chiều muộn cùng gia đình và bạn bè.",
    imageSrc: "/du-lich/cau-cang-hai-tien.jpg",
  },
  {
    name: "Chùa Bụt",
    mapUrl: "https://maps.app.goo.gl/Uidu9fbSedBpmvFz5",
    shortIntro:
      "Không gian thanh tịnh gần biển, thích hợp cho những ai muốn tìm một khoảng lặng nhẹ nhàng trong chuyến đi.",
    imageSrc: "/du-lich/chua-but.jpg",
  },
  {
    name: "Bãi đá Hòn Bò",
    mapUrl: "https://maps.app.goo.gl/nXHXy9RkeAET79uk9",
    shortIntro:
      "Địa điểm thiên nhiên độc đáo với các mỏm đá đẹp mắt, cực hợp để chụp ảnh và cảm nhận vẻ hoang sơ của biển.",
    imageSrc: "/du-lich/bai-da-hon-bo.jpg",
  },
  {
    name: "Chợ làng chài",
    mapUrl: "https://maps.app.goo.gl/8SNwFWp8iJswxfHU6",
    shortIntro:
      "Khu chợ dân dã gần biển với hải sản tươi và nhịp sống địa phương, phù hợp để ghé mua đồ và trải nghiệm văn hóa bản địa.",
    imageSrc: "/du-lich/cho-lang-chai.jpg",
  },
];

const getQrUrl = (mapUrl: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=${encodeURIComponent(
    mapUrl
  )}`;

export default function PageDuLich() {
  return (
    <main className="nc-PageDuLich relative overflow-hidden">
      <div className="bg-gradient-to-b from-orange-50 to-white">
        <div className="container pt-10 pb-8 sm:pt-14 sm:pb-12">
          <div className="mx-auto max-w-4xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
              Du lịch Hải Tiến
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl">
              6 điểm đến nên ghé khi lưu trú tại Yara
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-700 sm:text-lg">
              Đây là bộ sưu tập địa điểm nổi bật quanh khu vực Hải Tiến dành cho
              khách lưu trú tại Yara. Mỗi ô bên dưới đều có mã QR mở trực tiếp
              Google Maps để bạn di chuyển nhanh, không cần nhập lại địa chỉ.
              Chỉ cần quét mã và đi.
            </p>
          </div>
        </div>
      </div>

      <div className="container pb-16 sm:pb-24">
        <div className="space-y-6 sm:space-y-8">
          {TRAVEL_SPOTS.map((spot, index) => {
            const textOrder = index % 2 === 0 ? "md:order-1" : "md:order-2";
            const qrOrder = index % 2 === 0 ? "md:order-2" : "md:order-1";

            return (
              <section
                key={spot.name}
                className="grid grid-cols-1 items-stretch gap-5 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 md:grid-cols-3 md:gap-6"
              >
                <div
                  className={`order-1 ${textOrder} relative overflow-hidden rounded-2xl p-5 sm:p-6 md:col-span-2`}
                  style={{
                    backgroundImage: `url(${spot.imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/45" />
                  <div className="relative z-10 max-w-[56ch] [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                    <p className="text-sm font-semibold tracking-wide text-amber-100">
                      Điểm đến {index + 1}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {spot.name}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-white/95">
                      {spot.shortIntro}
                    </p>
                    <a
                      href={spot.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex rounded-full bg-primary-6000 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-black/20 hover:bg-primary-700"
                    >
                      Mở Google Maps
                    </a>
                  </div>
                </div>

                <div
                  className={`order-2 ${qrOrder} flex items-center justify-center rounded-2xl border border-orange-100 bg-white p-4 sm:p-6 md:col-span-1`}
                >
                  <div className="w-full max-w-[220px] text-center sm:max-w-[260px]">
                    <img
                      src={getQrUrl(spot.mapUrl)}
                      alt={`Mã QR ${spot.name}`}
                      className="mx-auto w-full rounded-xl border border-orange-100"
                      loading="lazy"
                    />
                    <p className="mt-3 text-sm text-neutral-600">
                      Quét QR để mở bản đồ
                    </p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

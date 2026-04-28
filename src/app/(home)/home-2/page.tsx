import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import React from "react";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import SectionHowItWork from "@/components/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection";
import { TaxonomyType } from "@/data/types";
//
import HIW1img from "@/images/HIW2-1.png";
import HIW2img from "@/images/HIW2-2.png";
import HIW3img from "@/images/HIW2-3.png";
import HIW1imgDark from "@/images/HIW2-1-dark.png";
import HIW2imgDark from "@/images/HIW2-2-dark.png";
import HIW3imgDark from "@/images/HIW2-3-dark.png";
import rightImgPng from "@/images/haitien/garden-1.jpg";

import SectionGridFeatureProperty from "../SectionGridFeatureProperty";
import SectionHero2 from "@/app/(server-components)/SectionHero2";
const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/home-2",
    name: "Bếp nấu ăn",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/chill-cafe-1.jpg",
  },
  {
    id: "2",
    href: "/home-2",
    name: "Góc chill cafe",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/chill-cafe-2.jpg",
  },
  {
    id: "3",
    href: "/home-2",
    name: "Không gian thoáng mở",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/chill-cafe-3.jpg",
  },
  {
    id: "4",
    href: "/home-2",
    name: "Tụ họp gia đình",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/chill-cafe-4.jpg",
  },
  {
    id: "5",
    href: "/home-2",
    name: "Góc check-in nhiều ánh sáng đẹp",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "6",
    href: "/home-2",
    name: "Phòng tiêu chuẩn đồng bộ tiện nghi",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "7",
    href: "/home-2",
    name: "Kỳ nghỉ nhẹ nhàng cuối tuần",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome2() {
  return (
    <main className="nc-PageHome2 relative overflow-hidden">
      <div className="container relative space-y-16 pb-24 pt-4 sm:space-y-20 lg:space-y-28 lg:mb-28 lg:pt-0">
        <SectionHero2 className="" />

        <SectionHowItWork
          className="relative z-10"
          data={[
            {
              id: 1,
              img: HIW1img,
              imgDark: HIW1imgDark,
              title: "Tìm kiếm nhanh",
              desc: "Nhập khu vực Hải Tiến hoặc nhu cầu lưu trú để xem ngay hạng phòng phù hợp tại homestay.",
            },
            {
              id: 2,
              img: HIW2img,
              imgDark: HIW2imgDark,
              title: "Chọn phòng",
              desc: "Homestay ở vị trí thuận lợi, dễ dàng di chuyển đến các địa điểm tham quan và vui chơi.",
            },
            {
              id: 3,
              img: HIW3img,
              imgDark: HIW3imgDark,
              title: "Đặt phòng",
              desc: "Chọn ngày ở, số khách và gửi yêu cầu đặt phòng trực tiếp để quản trị xác nhận nhanh chóng.",
            },
          ]}
        />

        <div className="relative py-4 sm:py-8 lg:py-16">
          <div className="hidden sm:block">
            <BackgroundSection />
          </div>
          <SectionGridFeatureProperty />
        </div>

        <SectionOurFeatures
          className="rounded-[28px] bg-neutral-50 p-5 dark:bg-neutral-900 sm:p-8 lg:py-14 lg:px-0"
          type="type2"
          rightImg={rightImgPng}
        />

        <SectionSliderNewCategories
          className="pb-6"
          categories={DEMO_CATS_2}
          categoryCardType="card4"
          itemPerRow={4}
          heading="Gợi ý trải nghiệm nổi bật"
          subHeading="Những không gian được khách lưu trú yêu thích tại Yara"
        />

      </div>
    </main>
  );
}

export default PageHome2;

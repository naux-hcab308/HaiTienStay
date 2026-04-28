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
import Image from "next/image";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/home-2",
    name: "Sáng sớm đón gió biển Hải Tiến",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/home-2",
    name: "Không gian nghỉ ngơi thoáng mở",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/home-2",
    name: "Phòng ấm cúng cho gia đình nhỏ",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/home-2",
    name: "Sân vườn xanh và khu BBQ",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
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
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero2 className="" />



        <SectionHowItWork
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

        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div>

        <SectionOurFeatures type="type2" rightImg={rightImgPng} />

        <SectionSliderNewCategories
          categories={DEMO_CATS_2}
          categoryCardType="card4"
          itemPerRow={4}
          heading="Gợi ý trải nghiệm nổi bật"
          subHeading="Những không gian được khách lưu trú yêu thích tại Yara"
        />


        <SectionSliderNewCategories
          heading="Khám phá không gian homestay"
          subHeading="Tổng hợp các khu vực nghỉ ngơi, sinh hoạt chung và góc check-in đẹp"
          categoryCardType="card5"
          itemPerRow={5}
        />

      </div>
    </main>
  );
}

export default PageHome2;

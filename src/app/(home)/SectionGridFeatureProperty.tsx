import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import PropertyCardH from "@/components/PropertyCardH";
import HeaderFilter from "@/components/HeaderFilter";
import bedroom1 from "@/images/haitien/bedroom-1.jpg";
import bedroom2 from "@/images/haitien/bedroom-2.jpg";
import bedroom3 from "@/images/haitien/bedroom-3.jpg";
import bedroom4 from "@/images/haitien/bedroom-4.jpg";
import garden1 from "@/images/haitien/garden-1.jpg";
import garden2 from "@/images/haitien/garden-2.jpg";
import garden3 from "@/images/haitien/garden-3.jpg";
import chill1 from "@/images/haitien/chill-1.jpg";
import chill2 from "@/images/haitien/chill-2.jpg";
import chill3 from "@/images/haitien/chill-3.jpg";
import bar1 from "@/images/haitien/bar-1.jpg";
import bar2 from "@/images/haitien/bar-2.jpg";

const ROOM_CONFIGS = [
  {
    title: "Phòng đôi",
    roomTag: "Couple",
    roomBedInfo: "1 giường 1m6",
    weekdayPriceLabel: "Giá từ thứ 2 đến thứ 5: 400.000 VND/phòng",
    weekendPriceLabel: "Thứ 6, thứ 7 và CN: 500.000 VND/phòng",
    isBestSeller: false,
    featuredImage: bedroom1,
    galleryImgs: [bedroom1, bedroom2, garden1, chill1],
  },
  {
    title: "Phòng 3 người",
    roomTag: "Family",
    roomBedInfo: "1 giường đôi 1m6 và 1 giường 1m2",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 500.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 650.000 VND/phòng",
    isBestSeller: false,
    featuredImage: bedroom2,
    galleryImgs: [bedroom2, bedroom3, garden2, chill2],
  },
  {
    title: "Phòng 4 người",
    roomTag: "Family",
    roomBedInfo: "2 giường đôi 1m6",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 550.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 700.000 VND/phòng",
    isBestSeller: false,
    featuredImage: bedroom3,
    galleryImgs: [bedroom3, bedroom4, garden3, bar1],
  },
  {
    title: "Phòng 6 người",
    roomTag: "Group",
    roomBedInfo: "3 giường đôi 1m6",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    isBestSeller: true,
    featuredImage: garden1,
    galleryImgs: [garden1, garden2, bar1, chill3],
  },
  {
    title: "Phòng 8 người",
    roomTag: "Group",
    roomBedInfo: "4 giường đôi 1m6",
    weekdayPriceLabel: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekendPriceLabel: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    isBestSeller: false,
    featuredImage: garden2,
    galleryImgs: [garden2, garden3, bar2, chill1],
  },
];

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 5).map(
  (item, index) => ({
    ...item,
    ...ROOM_CONFIGS[index],
  })
);

export interface SectionGridFeaturePropertyProps {
  stayListing?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListing = DEMO_DATA,
  gridClass = "",
  heading = "Danh sách các hạng phòng",
  subHeading = "Chọn không gian phù hợp nhất cho chuyến đi của bạn",
  tabs = [],
}) => {
  const renderCard = (stay: StayDataType, index: number) => {
    return <PropertyCardH key={index} className="h-full" data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        tabActive={""}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {stayListing.map(renderCard)}
      </div>
      <p className="mt-8 text-base font-semibold text-neutral-800 dark:text-neutral-100">
        Giá phòng trên đã bao gồm: Phòng ở + ăn sáng (miễn phí) + xe điện 2 chiều
        chở đi tham quan chùa Bụt và khu vui chơi/bãi biển Flamingo, đi thăm đền
        thờ Tô Hiến Thành - di tích lịch sử Quốc Gia khi thuê phòng 02 đêm trở lên.
      </p>
    </div>
  );
};

export default SectionGridFeatureProperty;


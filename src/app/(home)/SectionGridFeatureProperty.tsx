import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";
import HeaderFilter from "@/components/HeaderFilter";

const ROOM_TYPES = [
  "Phòng đôi",
  "Phòng 3 người",
  "Phòng 4 người",
  "Phòng 6 người",
  "Phòng 8 người",
];

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 5).map((item, index) => ({
  ...item,
  title: ROOM_TYPES[index],
}));
//
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
  headingIsCenter,
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
    </div>
  );
};

export default SectionGridFeatureProperty;

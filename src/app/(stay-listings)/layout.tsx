import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import { TaxonomyType } from "@/data/types";
import React, { ReactNode } from "react";

const STAY_SPACE_CATS: TaxonomyType[] = [
  {
    id: "stay-space-1",
    href: "/listing-stay-map",
    name: "Quầy bar",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/quay-bar-1.jpg",
  },
  {
    id: "stay-space-2",
    href: "/listing-stay-map",
    name: "Quầy bar ngoài trời",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/quay-bar-2.jpg",
  },
  {
    id: "stay-space-3",
    href: "/listing-stay-map",
    name: "Phòng ngủ 1",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/phong-ngu-1.jpg",
  },
  {
    id: "stay-space-4",
    href: "/listing-stay-map",
    name: "Phòng ngủ 2",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/phong-ngu-2.jpg",
  },
  {
    id: "stay-space-5",
    href: "/listing-stay-map",
    name: "Phòng ngủ 3",
    taxonomy: "category",
    count: 188288,
    thumbnail: "/haitien/phong-ngu-3.jpg",
  },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />


      {children}

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Khám phá theo loại không gian"
            subHeading="Tìm kiếm chỗ nghỉ phù hợp với phong cách của bạn"
            categories={STAY_SPACE_CATS}
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;

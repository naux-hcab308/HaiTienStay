import React, { FC } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";

export interface HomeRealEstatePageProps {}

const HomeRealEstatePage: FC<HomeRealEstatePageProps> = ({}) => {
  return (
    <div className="container relative">
      <SectionGridFilterCard className="py-24 lg:py-28" />
    </div>
  );
};

export default HomeRealEstatePage;

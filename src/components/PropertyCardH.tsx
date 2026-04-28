import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import { StayDataType } from "@/data/types";
import Link from "next/link";

export interface PropertyCardHProps {
  className?: string;
  data?: StayDataType;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    galleryImgs,
    title,
    href,
    like,
    saleOff,
    isAds,
    id,
    roomTag,
    roomBedInfo,
    weekdayPriceLabel,
    weekendPriceLabel,
    isBestSeller,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={galleryImgs}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`PropertyCardH_${id}`}
          href={href}
        />

        {saleOff && (
          <SaleOffBadge className="absolute left-5 top-5 !bg-orange-500" />
        )}
      </div>
    );
  };

  const renderRoomInfo = () => {
    if (!roomBedInfo && !weekdayPriceLabel && !weekendPriceLabel) {
      return null;
    }

    return (
      <div className="mt-3 space-y-1.5 text-sm">
        {roomBedInfo && (
          <p className="text-neutral-800 dark:text-neutral-100 font-semibold">
            {roomBedInfo}{" "}
            {isBestSeller ? <span className="font-bold">(Best seller)</span> : null}
          </p>
        )}
        {weekdayPriceLabel && (
          <p className="text-neutral-700 dark:text-neutral-300">{weekdayPriceLabel}</p>
        )}
        {weekendPriceLabel && (
          <p className="text-neutral-700 dark:text-neutral-300">{weekendPriceLabel}</p>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const tagText = roomTag || "Family";

    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">{tagText}</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{title}</span>
            </h2>
          </div>
          {renderRoomInfo()}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
    >
      <Link href={href} className="absolute inset-0"></Link>
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      <BtnLikeIcon
        colorClass="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400"
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3"
      />
    </div>
  );
};

export default PropertyCardH;

import React, { useMemo } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getSelectedIndexByRoomNo,
  ROOM_TYPES,
} from "../listing-stay-detail/roomTypes";

const MobileFooterSticky = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedRoomNo = (searchParams.get("room") || "").toUpperCase();
  const room = useMemo(() => {
    const selectedIndex = getSelectedIndexByRoomNo(selectedRoomNo || null);
    return ROOM_TYPES[selectedIndex];
  }, [selectedRoomNo]);

  const effectiveRoomNo = useMemo(() => {
    if (selectedRoomNo && room.roomNos.includes(selectedRoomNo)) {
      return selectedRoomNo;
    }
    return room.roomNos[0] || "";
  }, [room, selectedRoomNo]);

  const handleOpenBookingForm = () => {
    const bookingForm = document.getElementById("booking-form");
    bookingForm?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!pathname?.includes("/listing-stay-detail")) {
    return null;
  }

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-lg font-semibold text-primary-600">
            {room.priceFrom}
          </span>
          <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {effectiveRoomNo ? `${room.label} • ${effectiveRoomNo}` : room.label}
          </span>
        </div>
        <ButtonPrimary
          sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
          onClick={handleOpenBookingForm}
        >
          Đặt phòng
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooterSticky;

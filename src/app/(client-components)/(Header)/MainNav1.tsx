"use client";

import React, { FC } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "@/shared/ButtonPrimary";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  const { isAdmin } = useAdminAuth();

  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container h-20 relative flex justify-between">
        <div className="flex md:hidden items-center justify-between flex-1 gap-3">
          <Logo className="w-24 flex-shrink-0" />
          <ButtonPrimary
            className="px-4 py-2 text-sm whitespace-nowrap"
            href={isAdmin ? "/admin/bookings" : "/listing-stay-detail"}
          >
            {isAdmin ? "Đơn đặt phòng" : "Đặt phòng"}
          </ButtonPrimary>
        </div>

        <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
          <Logo className="w-28 self-center" />
          <Navigation />
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-2">
            <SwitchDarkMode />
            <SearchDropdown className="flex items-center" />
            <ButtonPrimary
              className="self-center"
              href={isAdmin ? "/admin/bookings" : "/listing-stay-detail"}
            >
              {isAdmin ? "Đơn đặt phòng" : "Đặt phòng"}
            </ButtonPrimary>
          </div>

          <div className="flex xl:hidden items-center">
            <SwitchDarkMode />
            <div className="px-0.5" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;

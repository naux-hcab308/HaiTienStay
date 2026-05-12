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
        <div className="flex md:hidden items-center justify-between flex-1 gap-3 overflow-x-auto">
          <Logo className="w-24 flex-shrink-0" />
          <div className="flex items-center gap-2">
            {isAdmin && (
              <ButtonPrimary
                className="px-4 py-2 text-sm whitespace-nowrap bg-blue-500 hover:bg-blue-600"
                href="/admin/messages"
              >
                Tin nhắn
              </ButtonPrimary>
            )}
            <ButtonPrimary
              className="px-4 py-2 text-sm whitespace-nowrap"
              href={isAdmin ? "/admin/bookings" : "/listing-stay-detail"}
            >
              {isAdmin ? "Đơn đặt phòng" : "Đặt phòng"}
            </ButtonPrimary>
          </div>
        </div>

        <div className="hidden md:flex justify-start flex-1 space-x-3 lg:space-x-6">
          <Logo className="w-28 self-center" />
          <Navigation />
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end pr-4 2xl:pr-8 flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden xl:flex items-center space-x-2">
            <SwitchDarkMode />
            <SearchDropdown className="flex items-center" />
            <div className="flex items-center gap-2 ml-2">
              {isAdmin && (
                <ButtonPrimary
                  className="self-center bg-blue-500 hover:bg-blue-600"
                  href="/admin/messages"
                >
                  Tin nhắn
                </ButtonPrimary>
              )}
              <ButtonPrimary
                className="self-center"
                href={isAdmin ? "/admin/bookings" : "/listing-stay-detail"}
              >
                {isAdmin ? "Đơn đặt phòng" : "Đặt phòng"}
              </ButtonPrimary>
            </div>
            <div className="ml-2 text-center text-xs font-semibold leading-tight text-amber-700 dark:text-white">
              <span className="block">Hotline</span>
              <span className="block tracking-[0.12em]">08.33.55.57.57</span>
            </div>
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

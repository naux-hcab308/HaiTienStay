"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import FooterNav from "./FooterNav";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Điều hướng nhanh",
    menus: [
      { href: "/home-2", label: "Trang chủ" },
      { href: "/listing-stay", label: "Xem phòng" },
      { href: "/listing-stay-detail", label: "Đặt phòng" },
      { href: "/blog", label: "Blog trải nghiệm" },
      { href: "/contact", label: "Liên hệ" },
    ],
  },
  {
    id: "1",
    title: "Thông tin homestay",
    menus: [
      { href: "/about", label: "Giới thiệu" },
      { href: "/listing-stay", label: "1 hạng phòng - 8 phòng" },
      { href: "/listing-stay-detail", label: "Giá tham khảo" },
      { href: "/blog", label: "Nhật ký khách lưu trú" },
      { href: "/contact", label: "Hỗ trợ đặt phòng" },
    ],
  },
  {
    id: "2",
    title: "Hai vai trò chính",
    menus: [
      { href: "/home-2", label: "Khách xem và đặt phòng" },
      { href: "/blog", label: "Khách viết blog trải nghiệm" },
      { href: "/listing-stay-detail", label: "Quản trị xác nhận đặt phòng" },
      { href: "/blog", label: "Quản trị duyệt bài blog" },
      { href: "/contact", label: "Liên hệ quản trị homestay" },
    ],
  },
  {
    id: "4",
    title: "Kết nối",
    menus: [
      { href: "/blog", label: "Cộng đồng khách lưu trú" },
      { href: "/blog", label: "Chia sẻ trải nghiệm" },
      { href: "/contact", label: "Góp ý dịch vụ" },
      { href: "/contact", label: "Hợp tác địa phương" },
      { href: "/about", label: "Câu chuyện Hải Tiến Stay" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-2 md:col-span-1">
              <Logo />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  );
};

export default Footer;

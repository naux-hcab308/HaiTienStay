import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

const blogChildren: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Nhật ký trải nghiệm",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "Giới thiệu homestay",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Trang chủ",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Xem phòng",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay-detail",
    name: "Đặt phòng",
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog trải nghiệm",
    type: "dropdown",
    children: blogChildren,
  },
  {
    id: ncNanoId(),
    href: "/tuyen-dung",
    name: "Tuyển dụng",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Liên hệ",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Trang chủ",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Xem phòng",
  },
  {
    id: ncNanoId(),
    href: "/listing-stay-detail",
    name: "Đặt phòng",
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog trải nghiệm",
    children: blogChildren,
  },
  {
    id: ncNanoId(),
    href: "/tuyen-dung",
    name: "Tuyển dụng",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Liên hệ",
  },
];

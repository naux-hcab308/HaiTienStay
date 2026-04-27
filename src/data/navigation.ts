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
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Liên hệ",
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
];

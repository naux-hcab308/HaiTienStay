import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Công ty",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Tên ứng dụng",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Thành phố",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Công trình",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Quốc gia",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Country,
    })),
  },
];

const demoChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Đặt phòng trực tuyến",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Bất động sản",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/home-3",
    name: "Trang chủ 3",
    isNew: true,
  },
];

const otherPageChildrenMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Bài viết blog" },
  { id: ncNanoId(), href: "/about", name: "Giới thiệu" },
  { id: ncNanoId(), href: "/contact", name: "Liên hệ" },
  { id: ncNanoId(), href: "/login", name: "Đăng nhập" },
  { id: ncNanoId(), href: "/signup", name: "Đăng ký" },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing/1" as Route,
    name: "Thêm tin đăng",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing/1" as Route,
        name: "Thêm tin đăng 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/2" as Route,
        name: "Thêm tin đăng 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/3" as Route,
        name: "Thêm tin đăng 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/4" as Route,
        name: "Thêm tin đăng 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/5" as Route,
        name: "Thêm tin đăng 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/6" as Route,
        name: "Thêm tin đăng 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/7" as Route,
        name: "Thêm tin đăng 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/8" as Route,
        name: "Thêm tin đăng 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/9" as Route,
        name: "Thêm tin đăng 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/10" as Route,
        name: "Thêm tin đăng 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Thanh toán" },
  { id: ncNanoId(), href: "/pay-done", name: "Thanh toán thành công" },
  //
  { id: ncNanoId(), href: "/author", name: "Trang tác giả" },
  { id: ncNanoId(), href: "/account", name: "Trang tài khoản" },
  //
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Đăng ký gói",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Trang chủ",
    type: "dropdown",
    children: demoChildrenMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Năm cột",
    type: "megaMenu",
    megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Trang danh sách",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/listing-stay",
        name: "Danh sách lưu trú",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-stay", name: "Trang lưu trú" },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Trang lưu trú (bản đồ)",
          },
          { id: ncNanoId(), href: "/listing-stay-detail", name: "Chi tiết lưu trú" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Danh sách trải nghiệm",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/listing-experiences",
            name: "Trang trải nghiệm",
          },
          {
            id: ncNanoId(),
            href: "/listing-experiences-map",
            name: "Trang trải nghiệm (bản đồ)",
          },
          {
            id: ncNanoId(),
            href: "/listing-experiences-detail",
            name: "Chi tiết trải nghiệm",
          },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/listing-car",
        name: "Danh sách xe",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-car", name: "Cars page" },
          { id: ncNanoId(), href: "/listing-car-map", name: "Cars page (bản đồ)" },
          { id: ncNanoId(), href: "/listing-car-detail", name: "Chi tiết xe" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/home-2",
        name: "Danh sách bất động sản",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/home-2",
            name: "Danh sách bất động sản",
          },
          {
            id: ncNanoId(),
            href: "/listing-real-estate-map",
            name: "Bản đồ bất động sản",
          },
        ],
      },
      //
      {
        id: ncNanoId(),
        href: "/listing-flights",
        name: "Danh sách chuyến bay",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "Mẫu trang",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: "/blog",
    name: "Trang khác",
    type: "dropdown",
    children: otherPageChildrenMenus,
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Trang chủ",
    type: "dropdown",
    children: demoChildrenMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Trang danh sách",
    children: [
      { id: ncNanoId(), href: "/listing-stay", name: "Danh sách lưu trú" },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Danh sách lưu trú (bản đồ)",
      },
      { id: ncNanoId(), href: "/listing-stay-detail", name: "Chi tiết lưu trú" },

      //
      {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Danh sách trải nghiệm",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-map",
        name: "Trải nghiệm (bản đồ)",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-detail",
        name: "Chi tiết trải nghiệm",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/listing-car",
    name: "Trang danh sách",
    children: [
      { id: ncNanoId(), href: "/listing-car", name: "Danh sách xe" },
      { id: ncNanoId(), href: "/listing-car-map", name: "Danh sách xe (bản đồ)" },
      { id: ncNanoId(), href: "/listing-car-detail", name: "Chi tiết xe" },

      //
      {
        id: ncNanoId(),
        href: "/home-2",
        name: "Danh sách bất động sản",
      },
      {
        id: ncNanoId(),
        href: "/listing-real-estate-map",
        name: "Bất động sản (bản đồ)",
      },
      //
      {
        id: ncNanoId(),
        href: "/listing-flights",
        name: "Danh sách chuyến bay",
      },
    ],
  },

  //
  {
    id: ncNanoId(),
    href: "/author",
    name: "Mẫu trang",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Trang khác",
    type: "dropdown",
    children: otherPageChildrenMenus,
  },
];

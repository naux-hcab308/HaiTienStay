"use client";

import { useEffect } from "react";

const DICTIONARY: Array<[string, string]> = [
  ["Return Home Page", "Về trang chủ"],
  ["Page not found", "Không tìm thấy trang"],
  ["Not Found", "Không tìm thấy"],
  ["Online booking", "Đặt phòng trực tuyến"],
  ["Real estate listings", "Danh sách bất động sản"],
  ["Real Estate Listings", "Danh sách bất động sản"],
  ["Listing Page", "Trang danh sách"],
  ["Listing pages", "Trang danh sách"],
  ["Stay listings", "Danh sách lưu trú"],
  ["Stay detail", "Chi tiết lưu trú"],
  ["Stay Detail", "Chi tiết lưu trú"],
  ["Experiences listings", "Danh sách trải nghiệm"],
  ["Experiences detail", "Chi tiết trải nghiệm"],
  ["Experiences Detail", "Chi tiết trải nghiệm"],
  ["Cars listings", "Danh sách xe"],
  ["Car detail", "Chi tiết xe"],
  ["Car Detail", "Chi tiết xe"],
  ["Flights listings", "Danh sách chuyến bay"],
  ["Other pages", "Trang khác"],
  ["Five columns", "Năm cột"],
  ["Add listing", "Thêm tin đăng"],
  ["Subscription", "Đăng ký gói"],
  ["Contact us", "Liên hệ"],
  ["Sign up", "Đăng ký"],
  ["Signup", "Đăng ký"],
  ["Log in", "Đăng nhập"],
  ["Login", "Đăng nhập"],
  ["Log out", "Đăng xuất"],
  ["Forgot password?", "Quên mật khẩu?"],
  ["Forgot password", "Quên mật khẩu"],
  ["Remember me", "Ghi nhớ đăng nhập"],
  ["Email address", "Địa chỉ email"],
  ["Your email", "Email của bạn"],
  ["Password", "Mật khẩu"],
  ["Checkout", "Thanh toán"],
  ["Payment", "Thanh toán"],
  ["Pay done", "Thanh toán thành công"],
  ["Book now", "Đặt ngay"],
  ["Booking", "Đặt phòng"],
  ["Guests", "Khách"],
  ["Guest", "Khách"],
  ["Adults", "Người lớn"],
  ["Adult", "Người lớn"],
  ["Children", "Trẻ em"],
  ["Child", "Trẻ em"],
  ["Infants", "Em bé"],
  ["Pets", "Thú cưng"],
  ["Check in", "Nhận phòng"],
  ["Check out", "Trả phòng"],
  ["Search", "Tìm kiếm"],
  ["Filter", "Bộ lọc"],
  ["Filters", "Bộ lọc"],
  ["Price", "Giá"],
  ["Address", "Địa chỉ"],
  ["Phone", "Số điện thoại"],
  ["Message", "Tin nhắn"],
  ["Send message", "Gửi tin nhắn"],
  ["Country", "Quốc gia"],
  ["City", "Thành phố"],
  ["Company", "Công ty"],
  ["About", "Giới thiệu"],
  ["Blog", "Blog"],
  ["Contact", "Liên hệ"],
  ["Account", "Tài khoản"],
  ["Home", "Trang chủ"],
  ["Templates", "Mẫu trang"],
  ["Template", "Mẫu"],
  ["Listing", "Danh sách"],
  ["Map", "Bản đồ"],
  ["Save", "Lưu"],
  ["Cancel", "Hủy"],
  ["Close", "Đóng"],
  ["Apply", "Áp dụng"],
  ["Reset", "Đặt lại"],
  ["Previous", "Trước đó"],
  ["Next", "Tiếp theo"],
  ["Continue", "Tiếp tục"],
];

const ATTRS_TO_TRANSLATE = ["placeholder", "title", "aria-label", "alt", "value"];

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const WORD_REGEX = /^[A-Za-z][A-Za-z\s\-()&/]+$/;

function translateText(input: string) {
  if (!input || !input.trim()) return input;

  let output = input;
  for (const [source, target] of DICTIONARY) {
    const regex = new RegExp(`\\b${escapeRegExp(source)}\\b`, "g");
    output = output.replace(regex, target);
  }
  return output;
}

function translateElementAttributes(element: Element) {
  if (!(element instanceof HTMLElement || element instanceof SVGElement)) return;

  for (const attr of ATTRS_TO_TRANSLATE) {
    const value = element.getAttribute(attr);
    if (!value) continue;
    const next = translateText(value);
    if (next !== value) {
      element.setAttribute(attr, next);
    }
  }

  if (element instanceof HTMLInputElement && WORD_REGEX.test(element.value)) {
    const nextValue = translateText(element.value);
    if (nextValue !== element.value) {
      element.value = nextValue;
    }
  }
}

function translateNodeTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    const textNode = root as Text;
    const current = textNode.nodeValue || "";
    const next = translateText(current);
    if (next !== current) {
      textNode.nodeValue = next;
    }
    return;
  }

  if (!(root instanceof Element)) return;

  const tag = root.tagName.toLowerCase();
  if (tag === "script" || tag === "style" || tag === "noscript") return;

  translateElementAttributes(root);

  root.childNodes.forEach((child) => {
    translateNodeTree(child);
  });
}

export default function AutoVietnamese() {
  useEffect(() => {
    translateNodeTree(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") {
          translateNodeTree(mutation.target);
          return;
        }

        if (mutation.type === "attributes" && mutation.target) {
          translateElementAttributes(mutation.target as Element);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          translateNodeTree(node);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS_TO_TRANSLATE,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

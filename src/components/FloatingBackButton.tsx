"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const FloatingBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Không hiển thị nút back ở trang chủ
  if (!mounted || pathname === "/" || pathname === "/home-2") return null;

  return (
    <div className="fixed top-24 md:top-28 left-4 md:left-6 z-50 flex items-start">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center px-4 h-12 md:h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(255,165,0,0.5)] transition-transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="font-semibold text-sm uppercase tracking-wider">Trở lại</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingBackButton;

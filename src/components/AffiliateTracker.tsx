"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      // 1. Ghi nhận Click lên Server (Automated)
      fetch("/api/affiliate/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refCode }),
      }).catch(err => console.error("Failed to log click", err));

      // 2. Lưu vào localStorage để gắn vào đơn đặt hàng nếu khách tự đặt
      const now = new Date().getTime();
      const item = {
        code: refCode.toUpperCase(),
        expiry: now + 30 * 24 * 60 * 60 * 1000, // 30 ngày
      };
      localStorage.setItem("yara_ref_code", JSON.stringify(item));
    }
  }, [searchParams]);

  return null;
}

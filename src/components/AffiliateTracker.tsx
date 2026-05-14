"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function AffiliateTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refCode = searchParams.get("ref")?.toUpperCase();
    if (!refCode) return;

    const trackClick = async () => {
      // 1. Tạo hoặc lấy Visitor ID duy nhất cho trình duyệt này để chống lặp
      let visitorId = localStorage.getItem("yara_visitor_id");
      if (!visitorId) {
        visitorId = "vis_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("yara_visitor_id", visitorId);
      }

      // 2. Tìm affiliate_id từ ref_code
      const { data: aff } = await supabase
        .from("affiliates")
        .select("id")
        .eq("ref_code", refCode)
        .single();

      if (aff) {
        // 3. Ghi nhận click (Unique constraint trong DB sẽ chặn nếu visitorId này đã click KOL này)
        await supabase.from("affiliate_clicks").insert([
          {
            affiliate_id: aff.id,
            visitor_ip: visitorId, // Dùng visitorId thay cho IP để chính xác hơn ở client-side
          }
        ]);
      }

      // 3. Lưu vào localStorage để gắn vào đơn hàng
      const now = new Date().getTime();
      const item = {
        code: refCode,
        expiry: now + 30 * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem("yara_ref_code", JSON.stringify(item));
    };

    trackClick();
  }, [searchParams]);

  return null;
}

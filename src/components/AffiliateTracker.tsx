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
      console.log("AffiliateTracker: Bắt đầu xử lý cho mã", refCode);
      try {
        // 1. Visitor ID (Dùng mã ngẫu nhiên mạnh hơn)
        let visitorId = localStorage.getItem("yara_visitor_id");
        if (!visitorId) {
          visitorId = "v_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
          localStorage.setItem("yara_visitor_id", visitorId);
        }
        console.log("AffiliateTracker: VisitorID =", visitorId);

        // 2. Tìm ID của KOL
        const { data: aff, error: affError } = await supabase
          .from("affiliates")
          .select("id")
          .eq("ref_code", refCode)
          .single();

        if (affError || !aff) {
          console.error("AffiliateTracker: Lỗi tìm đối tác:", affError?.message || "Không thấy mã này trong DB");
          return;
        }
        console.log("AffiliateTracker: Đã tìm thấy KOL ID =", aff.id);

        // 3. Ghi nhận lượt click (Dùng insert đơn giản)
        const { error: clickError } = await supabase
          .from("affiliate_clicks")
          .insert([
            {
              affiliate_id: aff.id,
              visitor_ip: visitorId,
              user_agent: window.navigator.userAgent
            }
          ]);

        if (clickError) {
          // Nếu lỗi là do trùng (Unique), thì coi như đã đếm rồi, không phải lỗi hệ thống
          if (clickError.code === '23505') {
            console.log("AffiliateTracker: Khách này đã được tính lượt click trước đó.");
          } else {
            console.error("AffiliateTracker: Lỗi Supabase khi lưu click:", clickError.message, clickError);
          }
        } else {
          console.log("AffiliateTracker: Chúc mừng! Đã ghi nhận 1 click mới thành công.");
        }
      } catch (err) {
        console.error("AffiliateTracker: Lỗi không xác định:", err);
      }

      // 4. Lưu vào localStorage
      localStorage.setItem("yara_ref_code", JSON.stringify({
        code: refCode,
        expiry: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
      }));
    };

    trackClick();
  }, [searchParams]);

  return null;
}

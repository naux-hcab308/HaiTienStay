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
      try {
        // 1. Lấy hoặc tạo Visitor ID
        let visitorId = localStorage.getItem("yara_visitor_id");
        if (!visitorId) {
          visitorId = "vis_" + Math.random().toString(36).substring(2, 15);
          localStorage.setItem("yara_visitor_id", visitorId);
        }

        // 2. Tìm ID của KOL dựa trên mã ref
        const { data: aff, error: affError } = await supabase
          .from("affiliates")
          .select("id")
          .eq("ref_code", refCode)
          .single();

        if (affError || !aff) {
          console.warn("AffiliateTracker: Không tìm thấy đối tác với mã", refCode);
          return;
        }

        // 3. Ghi nhận lượt click (Dùng upsert để tránh lỗi trùng lặp và cập nhật thời gian mới)
        const { error: clickError } = await supabase
          .from("affiliate_clicks")
          .upsert(
            {
              affiliate_id: aff.id,
              visitor_ip: visitorId,
              user_agent: window.navigator.userAgent
            },
            { onConflict: 'affiliate_id, visitor_ip' }
          );

        if (clickError) {
          console.error("AffiliateTracker: Lỗi khi ghi nhận click", clickError.message);
        } else {
          console.log("AffiliateTracker: Ghi nhận click thành công cho", refCode);
        }
      } catch (err) {
        console.error("AffiliateTracker: Critical error", err);
      }

      // 4. Lưu vào localStorage cho đơn hàng
      const now = new Date().getTime();
      localStorage.setItem("yara_ref_code", JSON.stringify({
        code: refCode,
        expiry: now + 30 * 24 * 60 * 60 * 1000,
      }));
    };

    trackClick();
  }, [searchParams]);

  return null;
}

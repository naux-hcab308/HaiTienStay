import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refCode } = await req.json();
    if (!refCode) return NextResponse.json({ error: "Missing refCode" }, { status: 400 });

    // Lấy IP từ header (Next.js handling)
    const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Tìm affiliate_id từ ref_code
    const { data: affiliate, error: affError } = await supabase
      .from("affiliates")
      .select("id")
      .eq("ref_code", refCode.toUpperCase())
      .single();

    if (affError || !affiliate) {
      return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
    }

    // Ghi nhận click vào bảng affiliate_clicks
    // Unique constraint (affiliate_id, visitor_ip) sẽ ngăn việc lặp lại
    const { error: clickError } = await supabase
      .from("affiliate_clicks")
      .insert([
        {
          affiliate_id: affiliate.id,
          visitor_ip: ip,
          user_agent: userAgent,
        },
      ]);

    if (clickError) {
      // Nếu lỗi là do trùng (Unique constraint), Supabase sẽ trả về error
      // Chúng ta coi như click này đã tồn tại, không cần báo lỗi cho client
      return NextResponse.json({ status: "duplicate or error", message: clickError.message });
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Click logging error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

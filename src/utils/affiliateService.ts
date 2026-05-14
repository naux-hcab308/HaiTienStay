import { supabase } from "./supabaseClient";

export interface Affiliate {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  ref_code: string;
  commission_rate: number;
  balance: number;
  total_earned: number;
  created_at: string;
  click_count?: number; // Cột này có thể được update bằng trigger hoặc tính toán
}

export async function getAffiliates(): Promise<Affiliate[]> {
  // Lấy danh sách affiliate kèm theo số lượt click đếm từ bảng affiliate_clicks
  const { data, error } = await supabase
    .from("affiliates")
    .select(`
      *,
      affiliate_clicks:affiliate_clicks(count)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching affiliates:", error);
    return [];
  }

  return (data || []).map(item => ({
    ...item,
    click_count: (item.affiliate_clicks as any)?.[0]?.count || 0
  }));
}

export async function createAffiliate(payload: {
  name: string;
  email?: string;
  phone?: string;
  ref_code: string;
  commission_rate?: number;
  password?: string;
}): Promise<Affiliate | null> {
  const { data, error } = await supabase
    .from("affiliates")
    .insert([
      {
        name: payload.name,
        email: payload.email || null,
        phone: payload.phone || null,
        ref_code: payload.ref_code.toUpperCase(),
        commission_rate: payload.commission_rate || 50000,
        password: payload.password || "123456", // Mặc định pass nếu không nhập
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating affiliate:", error);
    return null;
  }

  return data;
}

export async function deleteAffiliate(id: string) {
  const { error } = await supabase.from("affiliates").delete().eq("id", id);
  if (error) {
    console.error("Error deleting affiliate:", error);
    return false;
  }
  return true;
}

export async function getAffiliateStats(refCode: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("referred_by", refCode.toUpperCase());

  if (error) {
    console.error("Error fetching affiliate stats:", error);
    return [];
  }

  return data || [];
}

export async function getAffiliateClickCount(affiliateId: string) {
  const { count, error } = await supabase
    .from("affiliate_clicks")
    .select("*", { count: "exact", head: true })
    .eq("affiliate_id", affiliateId);
  
  if (error) return 0;
  return count || 0;
}

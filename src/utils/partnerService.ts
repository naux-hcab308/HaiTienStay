import { supabase } from "./supabaseClient";
import { getPartnerSession } from "./partnerAuth";

export async function createGuestRequest(payload: {
  customerName: string;
  phone: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const session = getPartnerSession();
  if (!session) return null;

  const id = `REQ_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  
  // Lấy mức hoa hồng của đối tác hiện tại
  const { data: partner } = await supabase
    .from("affiliates")
    .select("commission_rate")
    .eq("id", session.id)
    .single();

  const commissionAmount = partner?.commission_rate || 0;

  const insertData = {
    id,
    customer_name: payload.customerName,
    phone: payload.phone,
    room_type: payload.roomType,
    guests: payload.guests,
    check_in: payload.checkIn,
    check_out: payload.checkOut,
    status: "pending",
    referred_by: session.ref_code,
    commission_amount: commissionAmount,
  };

  const { error } = await supabase.from("bookings").insert([insertData]);
  if (error) {
    console.error("Error creating guest request:", error);
    return null;
  }
  return id;
}

export async function getPartnerStats() {
  const session = getPartnerSession();
  if (!session) return null;

  // Lấy thông tin partner hiện tại
  const { data: partner } = await supabase
    .from("affiliates")
    .select("*")
    .eq("id", session.id)
    .single();

  // Lấy lượt click
  const { count: clicks } = await supabase
    .from("affiliate_clicks")
    .select("*", { count: "exact", head: true })
    .eq("affiliate_id", session.id);

  // Lấy các booking đã giới thiệu
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("referred_by", session.ref_code)
    .order("created_at", { ascending: false });

  return {
    partner,
    clicks: clicks || 0,
    bookings: bookings || []
  };
}

export async function updatePartnerPassword(newPassword: string) {
  const session = getPartnerSession();
  if (!session) return false;

  const { error } = await supabase
    .from("affiliates")
    .update({ password: newPassword })
    .eq("id", session.id);

  if (error) {
    console.error("Error updating password:", error);
    return false;
  }
  return true;
}

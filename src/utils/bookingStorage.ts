import { supabase } from "./supabaseClient";

export interface BookingRecord {
  id: string;
  createdAt: string;
  status: "pending" | "accepted" | "cancelled";
  roomType: string;
  roomNo: string;
  customerName: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  referredBy?: string | null;
  commissionAmount?: number | null;
}

export async function getBookings(): Promise<BookingRecord[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    createdAt: item.created_at,
    status: item.status,
    roomType: item.room_type,
    roomNo: item.room_no,
    customerName: item.customer_name,
    phone: item.phone,
    checkIn: item.check_in,
    checkOut: item.check_out,
    guests: item.guests,
    referredBy: item.referred_by,
    commissionAmount: item.commission_amount,
  }));
}

export async function getBookingById(id: string): Promise<BookingRecord | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    createdAt: data.created_at,
    status: data.status,
    roomType: data.room_type,
    roomNo: data.room_no,
    customerName: data.customer_name,
    phone: data.phone,
    checkIn: data.check_in,
    checkOut: data.check_out,
    guests: data.guests,
    referredBy: data.referred_by,
    commissionAmount: data.commission_amount,
  };
}

export async function addBooking(
  payload: Omit<BookingRecord, "id" | "createdAt" | "status">
): Promise<BookingRecord | null> {
  const id = `${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  
  // Kiểm tra ref code từ localStorage
  let referredBy = null;
  if (typeof window !== "undefined") {
    const rawRef = localStorage.getItem("yara_ref_code");
    if (rawRef) {
      try {
        const parsedRef = JSON.parse(rawRef);
        if (parsedRef.expiry > new Date().getTime()) {
          referredBy = parsedRef.code;
        } else {
          localStorage.removeItem("yara_ref_code");
        }
      } catch (e) {
        // ignore
      }
    }
  }

  let commissionAmount = 0;
  if (referredBy) {
    const { data: aff } = await supabase
      .from("affiliates")
      .select("commission_rate")
      .eq("ref_code", referredBy)
      .single();
    if (aff) {
      commissionAmount = aff.commission_rate || 50000;
    }
  }

  const insertData = {
    id,
    customer_name: payload.customerName,
    phone: payload.phone,
    room_type: payload.roomType,
    room_no: payload.roomNo,
    guests: payload.guests,
    check_in: payload.checkIn,
    check_out: payload.checkOut,
    status: "pending",
    referred_by: referredBy,
    commission_amount: commissionAmount,
  };

  const { error } = await supabase.from("bookings").insert([insertData]);

  if (error) {
    console.error("Error adding booking:", error);
    return null;
  }

  return {
    ...payload,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
    referredBy,
    commissionAmount: insertData.commission_amount,
  };
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingRecord["status"]
) {
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);
    
  if (error) {
    console.error("Error updating status:", error);
    return false;
  }
  
  // Nếu status là accepted và có affiliate, ở ứng dụng thực tế bạn có thể chạy edge function 
  // hoặc xử lý trigger DB để cập nhật balance của affiliate. Tạm thời quản trị viên sẽ thanh toán thủ công.
  
  return true;
}

export async function clearBookings() {
  // Thường không nên cho phép clear data trên Supabase, nhưng nếu cần:
  // await supabase.from("bookings").delete().neq('id', '0');
  console.warn("clearBookings is disabled when using Supabase");
}

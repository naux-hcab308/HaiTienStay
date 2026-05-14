import { supabase } from "./supabaseClient";

export interface PartnerSession {
  id: string;
  name: string;
  ref_code: string;
}

const PARTNER_SESSION_KEY = "yara_partner_session";

export async function loginPartner(refCode: string, password?: string): Promise<boolean> {
  // Vì hiện tại chúng ta chưa có hệ thống Auth phức tạp, 
  // tạm thời check mã ref và mật khẩu (nếu có) trong bảng affiliates.
  const { data, error } = await supabase
    .from("affiliates")
    .select("id, name, ref_code, password")
    .eq("ref_code", refCode.toUpperCase())
    .single();

  if (error || !data) return false;

  // Nếu bạn đã thiết lập cột password, hãy kiểm tra ở đây.
  // Ở bản MVP này, tôi check mã ref là chính.
  if (data.password && data.password !== password) return false;

  if (typeof window !== "undefined") {
    localStorage.setItem(PARTNER_SESSION_KEY, JSON.stringify({
      id: data.id,
      name: data.name,
      ref_code: data.ref_code
    }));
  }
  return true;
}

export function getPartnerSession(): PartnerSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PARTNER_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logoutPartner() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PARTNER_SESSION_KEY);
  }
}

export function isPartnerAuthenticated(): boolean {
  return getPartnerSession() !== null;
}

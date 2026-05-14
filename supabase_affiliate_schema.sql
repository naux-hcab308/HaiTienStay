-- Bảng lưu trữ Affiliates (KOLs/Đối tác)
CREATE TABLE public.affiliates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text,
    phone text,
    ref_code text UNIQUE NOT NULL, -- Mã giới thiệu, VD: KOL_LINH99
    commission_rate numeric NOT NULL DEFAULT 50000, -- Mặc định 50,000 VND / đơn
    balance numeric NOT NULL DEFAULT 0, -- Số dư khả dụng
    total_earned numeric NOT NULL DEFAULT 0, -- Tổng tiền đã kiếm được
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bảng lưu trữ Bookings (Đã chuyển từ localStorage sang Supabase)
CREATE TABLE public.bookings (
    id text PRIMARY KEY, -- Sinh ra từ phía frontend (VD: 170000000_123456)
    customer_name text NOT NULL,
    phone text NOT NULL,
    room_type text NOT NULL,
    room_no text,
    guests integer DEFAULT 1,
    check_in text,
    check_out text,
    status text DEFAULT 'pending', -- pending, accepted, cancelled
    referred_by text REFERENCES public.affiliates(ref_code) ON DELETE SET NULL, -- Liên kết với affiliate
    commission_amount numeric DEFAULT 0, -- Ghi nhận số tiền hoa hồng lúc chốt
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bảng lưu trữ Payouts (Lịch sử rút tiền của Affiliate)
CREATE TABLE public.payouts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    affiliate_id uuid REFERENCES public.affiliates(id) ON DELETE CASCADE,
    amount numeric NOT NULL,
    status text DEFAULT 'pending', -- pending, completed, rejected
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Cho phép truy cập Public (vì chúng ta đang dùng anon key trên frontend)
-- (Lưu ý: Nếu cần bảo mật cao hơn có thể cấu hình RLS sau)
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read affiliates" ON public.affiliates FOR SELECT USING (true);
CREATE POLICY "Allow public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public read payouts" ON public.payouts FOR SELECT USING (true);
CREATE POLICY "Allow public insert payouts" ON public.payouts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update payouts" ON public.payouts FOR UPDATE USING (true);

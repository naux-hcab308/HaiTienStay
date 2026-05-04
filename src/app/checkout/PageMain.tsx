"use client";

import React, { FC, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { getBookingById } from "@/utils/bookingStorage";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const ROOM_PRICE_MAP: Record<
  string,
  { weekday: string; weekend: string; from: string }
> = {
  "Phòng đôi (2 người)": {
    weekday: "Giá từ thứ 2 đến thứ 5: 400.000 VND/phòng",
    weekend: "Thứ 6, thứ 7 và CN: 500.000 VND/phòng",
    from: "400.000đ/đêm",
  },
  "Phòng 3 người": {
    weekday: "Giá thuê: Từ CN đến thứ 2: 500.000 VND/phòng",
    weekend: "Thứ 6,7 và CN: 650.000 VND/phòng",
    from: "500.000đ/đêm",
  },
  "Phòng 4 người": {
    weekday: "Giá thuê: Từ CN đến thứ 2: 550.000 VND/phòng",
    weekend: "Thứ 6,7 và CN: 700.000 VND/phòng",
    from: "550.000đ/đêm",
  },
  "Phòng 6 người": {
    weekday: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekend: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    from: "900.000đ/đêm",
  },
  "Phòng 8 người": {
    weekday: "Giá thuê: Từ CN đến thứ 2: 900.000 VND/phòng",
    weekend: "Thứ 6,7 và CN: 1.200.000 VND/phòng",
    from: "900.000đ/đêm",
  },
};

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  const booking = useMemo(
    () => (bookingId ? getBookingById(bookingId) : null),
    [bookingId]
  );
  const roomPrice = booking ? ROOM_PRICE_MAP[booking.roomType] : null;

  const handleConfirm = () => {
    if (!booking) {
      router.push("/listing-stay-detail");
      return;
    }
    router.push(`/pay-done?bookingId=${encodeURIComponent(booking.id)}`);
  };

  if (!booking) {
    return (
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-3xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-2xl font-semibold">Không tìm thấy đơn đặt phòng</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">
            Bạn vui lòng quay lại trang đặt phòng và gửi lại thông tin.
          </p>
          <div className="mt-5">
            <ButtonPrimary href="/listing-stay-detail">Quay lại đặt phòng</ButtonPrimary>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10">
          <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Xác nhận yêu cầu đặt phòng
            </h2>
            <div className="border-b border-neutral-200 dark:border-neutral-700" />

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Thông tin khách đặt</h3>
              <p>
                <span className="font-semibold">Họ tên:</span> {booking.customerName}
              </p>
              <p>
                <span className="font-semibold">Số điện thoại:</span> {booking.phone}
              </p>
              <p>
                <span className="font-semibold">Số khách:</span> {booking.guests}
              </p>
              <p>
                <span className="font-semibold">Nhận phòng:</span>{" "}
                {booking.checkIn || "-"}
              </p>
              <p>
                <span className="font-semibold">Trả phòng:</span>{" "}
                {booking.checkOut || "-"}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Thông tin phòng</h3>
              <p>
                <span className="font-semibold">Loại phòng:</span> {booking.roomType}
              </p>
              <p>
                <span className="font-semibold">Mã phòng:</span> {booking.roomNo || "-"}
              </p>
              {roomPrice ? (
                <>
                  <p>
                    <span className="font-semibold">Giá từ:</span> {roomPrice.from}
                  </p>
                  <p>{roomPrice.weekday}</p>
                  <p>{roomPrice.weekend}</p>
                </>
              ) : null}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-auto rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors text-white py-3 px-6 font-semibold"
              >
                Xác nhận gửi yêu cầu
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-grow">
          <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
              <Image
                alt="Phòng Yara Homestay"
                fill
                sizes="500px"
                className="object-cover"
                src="/haitien/bedroom-1.jpg"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-base">Yara Homestay</p>
              <p>Đây là bước xác nhận yêu cầu đặt phòng, chưa thực hiện thanh toán.</p>
              <p>Quản trị viên sẽ liên hệ lại để chốt thông tin cuối cùng.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;


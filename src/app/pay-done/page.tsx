"use client";

import React, { FC, useMemo } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSearchParams } from "next/navigation";
import { getBookingById } from "@/utils/bookingStorage";

export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";
  const booking = useMemo(
    () => (bookingId ? getBookingById(bookingId) : null),
    [bookingId]
  );

  return (
    <div className="nc-PayPage">
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex flex-col sm:rounded-2xl space-y-8 px-0 sm:p-6 xl:p-8">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Gửi yêu cầu thành công
            </h2>

            <div className="border-b border-neutral-200 dark:border-neutral-700" />

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Thông tin yêu cầu đặt phòng</h3>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                    <Image
                      fill
                      alt=""
                      className="object-cover"
                      src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    />
                  </div>
                </div>
                <div className="pt-5 sm:pb-5 sm:px-5 space-y-2">
                  <p>
                    <span className="font-semibold">Loại phòng:</span>{" "}
                    {booking?.roomType || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Phòng:</span>{" "}
                    {booking?.roomNo || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Khách đặt:</span>{" "}
                    {booking?.customerName || "-"}
                  </p>
                  <p>
                    <span className="font-semibold">SĐT:</span>{" "}
                    {booking?.phone || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5 text-neutral-700 dark:text-neutral-300">
              Đây là yêu cầu đặt phòng, chưa thanh toán online. Quản trị viên sẽ liên
              hệ lại để xác nhận đơn và hướng dẫn bước tiếp theo.
            </div>

            <div>
              <ButtonPrimary href="/listing-stay">Quay lại danh sách phòng</ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayPage;


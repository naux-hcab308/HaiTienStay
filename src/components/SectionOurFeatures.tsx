import React, { FC } from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
        } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${type === "type1" ? "lg:pl-16" : "lg:pr-16"
          }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          TRẢI NGHIỆM
        </span>
        <h2 className="font-semibold text-4xl mt-5">Lý do chọn Yara </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Tiện nghi" />
            <span className="block text-xl font-semibold">
              Không gian ấm cúng, riêng tư
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Hệ thống phòng ngủ đồng bộ, mang lại cảm giác thoải mái và thư giãn như ở chính ngôi nhà của bạn.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Vị trí " />
            <span className="block text-xl font-semibold">
              Gần biển Hải Tiến
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Cách bờ biển chỉ vài phút di chuyển, thuận tiện để bạn và gia đình tham gia các hoạt động vui chơi, ngắm cảnh.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Dịch vụ" />
            <span className="block text-xl font-semibold">
              Hỗ trợ nhiệt tình, chu đáo
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Đội ngũ quản lý luôn sẵn sàng hỗ trợ, đảm bảo bạn có một kỳ nghỉ dưỡng trọn vẹn và đáng nhớ nhất.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;

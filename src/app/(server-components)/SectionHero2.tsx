import React, { FC } from "react";
import Image from "next/image";
import imagePng from "@/images/haitien/hero-home.jpg";

export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div className={`nc-SectionHero2 relative ${className}`}>
      {/* Mobile */}
      <div className="relative overflow-hidden rounded-[28px] sm:hidden h-[320px]">
        <Image
          fill
          className="object-cover object-center"
          src={imagePng}
          alt="hero"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {children ? (
            children
          ) : (
            <h2 className="max-w-[11ch] font-semibold text-4xl leading-tight">
              Yara - góc nhỏ yên lành tại Hải Tiến
            </h2>
          )}
        </div>
      </div>

      {/* Desktop: chiều cao cố định, ảnh không bị thu nhỏ theo ô cam */}
      <div className="relative hidden sm:block h-[420px] lg:h-[500px]">
        {/* Ảnh nền - luôn fill chiều cao cố định */}
        <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0">
          <Image fill className="object-cover" src={imagePng} alt="hero" />
        </div>

        {/* Ô cam - căn giữa theo chiều dọc, độc lập với ảnh */}
        <div className="relative h-full flex items-center">
          <div className="relative inline-flex w-[min(36vw,440px)]">
            <div className="absolute inset-y-0 right-0 left-0 bg-primary-500 rounded-2xl" />
            <div className="relative flex min-h-[200px] w-full flex-shrink-0 flex-col items-center justify-center px-6 text-white sm:px-8 lg:px-10">
              {children ? (
                children
              ) : (
                <h2
                  className="mx-auto w-full text-center font-medium text-white leading-[1.3]"
                  style={{ fontSize: "clamp(16px, 2.6vw, 38px)" }}
                >
                  <span className="block font-bold">— <em>Yara</em> —</span>
                  <span className="block">Góc Nhỏ Yên Lành</span>
                  <span className="block">Tại Hải Tiến</span>
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;

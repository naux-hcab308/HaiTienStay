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

      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow hidden sm:block">
        <Image fill className="object-cover" src={imagePng} alt="hero" />
      </div>
      <div className="relative hidden sm:block py-14 lg:py-20">
        <div className="relative inline-flex">
          <div className="w-screen right-20 md:right-52 inset-y-0 absolute bg-primary-500" />
          <div className="relative max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 lg:py-24 space-y-8 sm:space-y-10 text-white">
            {children ? (
              children
            ) : (
              <h2 className="font-semibold text-4xl md:text-5xl xl:text-7xl !leading-[110%]">
                Yara - góc nhỏ yên lành tại Hải Tiến
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;


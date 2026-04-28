import React, { FC } from "react";
import HIW1img from "@/images/HIW1.png";
import HIW2img from "@/images/HIW2.png";
import HIW3img from "@/images/HIW3.png";
import VectorImg from "@/images/VectorHIW.svg";
import Image, { StaticImageData } from "next/image";
import Heading from "@/shared/Heading";

export interface SectionHowItWorkProps {
  className?: string;
  data?: {
    id: number;
    title: string;
    desc: string;
    img: StaticImageData;
    imgDark?: StaticImageData;
  }[];
}

const DEMO_DATA: SectionHowItWorkProps["data"] = [
  {
    id: 1,
    img: HIW1img,
    title: "Book & relax",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Smart checklist",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Save more",
    desc: "Let each trip be an inspirational journey, each room a peaceful space",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading isCenter desc="Chỉ với 3 bước đơn giản">
        Thao tác dễ dàng
      </Heading>
      <div className="mt-10 relative grid gap-5 md:mt-20 md:grid-cols-3 md:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-10"
          src={VectorImg}
          alt=""
        />
        {data.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none"
          >
            {item.imgDark ? (
              <>
                <Image
                  className="dark:hidden block mb-6 max-w-[140px] md:mb-8 md:max-w-[180px] mx-auto"
                  src={item.img}
                  alt=""
                />
                <Image
                  alt=""
                  className="hidden dark:block mb-6 max-w-[140px] md:mb-8 md:max-w-[180px] mx-auto"
                  src={item.imgDark}
                />
              </>
            ) : (
              <Image
                alt=""
                className="mb-6 max-w-[140px] md:mb-8 md:max-w-[180px] mx-auto"
                src={item.img}
              />
            )}
            <div className="text-center mt-auto">
              <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
              <span className="block mt-3 md:mt-5 text-sm md:text-base text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;

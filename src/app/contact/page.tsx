import React, { FC } from "react";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface PageContactProps { }

const info = [
  {
    title: "🗺 ĐỊA CHỈ",
    desc: "Số 81 đường 510B Hoằng Tiến, Thanh Hoá",
  },
  {
    title: "💌 GMAIL",
    desc: "yarahaitien@gmail.com",
  },
  {
    title: "☎ ĐIỆN THOẠI",
    desc: "08.33.55.57.57",
  },
];

const PageContact: FC<PageContactProps> = ({ }) => {
  return (
    <div className="nc-PageContact overflow-hidden">
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Liên hệ
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 MẠNG XÃ HỘI
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Họ và tên</Label>
                  <Input
                    placeholder="Ví dụ: Nguyễn Văn A"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Địa chỉ email</Label>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Tin nhắn</Label>
                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <ButtonPrimary type="submit">Gửi tin nhắn</ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    </div>
  );
};

export default PageContact;


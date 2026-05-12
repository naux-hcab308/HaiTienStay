"use client";

import React, { FC, useState } from "react";
import { saveContactMessage } from "@/utils/contactStorage";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsSubmitting(true);
    try {
      await saveContactMessage({ name, email, message });
      alert("Gửi tin nhắn thành công! Chúng tôi sẽ sớm liên hệ lại với bạn.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nc-PageContact overflow-hidden">
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center text-center">
          Liên hệ và Góp ý
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
              <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                  <Label>Họ và tên</Label>
                  <Input
                    placeholder="Ví dụ: Nguyễn Văn A"
                    type="text"
                    className="mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Địa chỉ email</Label>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="block">
                  <Label>Tin nhắn / Góp ý (Feedback)</Label>
                  <Textarea
                    className="mt-1"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Viết tin nhắn hoặc góp ý của bạn ở đây..."
                    required
                  />
                </label>
                <div>
                  <ButtonPrimary type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn / Góp ý"}
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    </div>
  );
};

export default PageContact;


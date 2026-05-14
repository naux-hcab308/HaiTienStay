"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginPartner } from "@/utils/partnerAuth";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";

export default function PartnerLoginPage() {
  const [refCode, setRefCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const success = await loginPartner(refCode, password);
    if (success) {
      router.push("/partner/dashboard");
    } else {
      setError("Mã đối tác hoặc mật khẩu không chính xác.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-24 lg:py-32 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Đối tác Đăng nhập</h1>
        <p className="text-neutral-500 text-center mb-8 text-sm">Hệ thống quản lý dành riêng cho KOL & Đối tác</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mã giới thiệu (Mã đối tác)</label>
            <Input
              type="text"
              placeholder="VD: LINHKA"
              className="uppercase font-mono"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`las ${showPassword ? "la-eye-slash" : "la-eye"} text-xl`}></i>
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">* Liên hệ Admin nếu bạn quên mật khẩu</p>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <ButtonPrimary type="submit" className="w-full" loading={loading}>
            Đăng nhập ngay
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
}

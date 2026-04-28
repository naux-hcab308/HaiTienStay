"use client";

import React, { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAdminAuthenticated, loginAdmin } from "@/utils/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin/bookings";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace("/admin/bookings");
    }
  }, [router]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(username, password);
    if (!ok) {
      setError("Sai tài khoản hoặc mật khẩu admin.");
      return;
    }
    router.push(nextUrl);
  };

  return (
    <main className="container py-10 lg:py-16">
      <div className="max-w-md mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
        <h1 className="text-2xl font-semibold">Đăng nhập Admin</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Chỉ admin mới xem được danh sách thông tin đặt phòng.
        </p>

        <form className="mt-5 space-y-3" onSubmit={onSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Tài khoản admin"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3"
            placeholder="Mật khẩu admin"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="w-full rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors text-white py-3 font-semibold"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </main>
  );
}


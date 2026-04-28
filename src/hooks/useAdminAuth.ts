"use client";

import { useEffect, useState } from "react";
import {
  getAdminAuthEventName,
  isAdminAuthenticated,
  logoutAdmin,
} from "@/utils/adminAuth";

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const sync = () => setIsAdmin(isAdminAuthenticated());
    sync();

    const onStorage = () => sync();
    const onAuthChanged = () => sync();

    window.addEventListener("storage", onStorage);
    window.addEventListener(getAdminAuthEventName(), onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(getAdminAuthEventName(), onAuthChanged);
    };
  }, []);

  return {
    isAdmin,
    logout: logoutAdmin,
  };
}


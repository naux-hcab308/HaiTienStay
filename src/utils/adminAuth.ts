const ADMIN_AUTH_KEY = "yara_admin_auth";
const ADMIN_AUTH_EVENT = "yara-admin-auth-changed";

function getExpectedUsername() {
  return process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
}

function getExpectedPassword() {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "1";
}

export function loginAdmin(username: string, password: string) {
  const isValid =
    username.trim() === getExpectedUsername() &&
    password.trim() === getExpectedPassword();

  if (!isValid || typeof window === "undefined") return false;

  window.localStorage.setItem(ADMIN_AUTH_KEY, "1");
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
  return true;
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ADMIN_AUTH_KEY);
  window.dispatchEvent(new Event(ADMIN_AUTH_EVENT));
}

export function getAdminAuthEventName() {
  return ADMIN_AUTH_EVENT;
}


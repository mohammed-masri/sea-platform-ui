export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || "";

export const AUTH_URLs = {
  LOGIN: AUTH_URL + "/login",
  PROFILE: AUTH_URL + "/profile",
  SETTINGS: AUTH_URL + "/settings",
  FORCE_LOGOUT: AUTH_URL + "/force-logout",
};

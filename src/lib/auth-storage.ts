import Cookies from "js-cookie";
import { AuthenticatedUser } from "@/types/auth";

export const STORAGE_KEYS = {
  USER: "sigest_user",
  TOKEN: "sigest_access_token",
  TOKEN_TYPE: "sigest_token_type",
  ROLE: "sigest_role",
} as const;

export const getStoredToken = () => Cookies.get(STORAGE_KEYS.TOKEN) ?? null;

export const getStoredTokenType = () =>
  Cookies.get(STORAGE_KEYS.TOKEN_TYPE) ?? null;

export const getStoredRoles = (): string[] => {
  const storedRole = Cookies.get(STORAGE_KEYS.ROLE);
  if (!storedRole) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedRole);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getStoredUser = (): AuthenticatedUser | null => {
  const storedUser = Cookies.get(STORAGE_KEYS.USER);
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthenticatedUser;
  } catch {
    Cookies.remove(STORAGE_KEYS.USER);
    return null;
  }
};

export const setStoredUser = (user: AuthenticatedUser) => {
  const expires = 7;

  Cookies.set(STORAGE_KEYS.USER, JSON.stringify(user), {
    expires,
    sameSite: "strict",
  });
  Cookies.set(STORAGE_KEYS.TOKEN, user.access_token, {
    expires,
    sameSite: "strict",
  });
  Cookies.set(STORAGE_KEYS.TOKEN_TYPE, user.token_type, {
    expires,
    sameSite: "strict",
  });
  Cookies.set(STORAGE_KEYS.ROLE, JSON.stringify(user.role), {
    expires,
    sameSite: "strict",
  });
};

export const clearStoredUser = () => {
  Cookies.remove(STORAGE_KEYS.USER);
  Cookies.remove(STORAGE_KEYS.TOKEN);
  Cookies.remove(STORAGE_KEYS.TOKEN_TYPE);
  Cookies.remove(STORAGE_KEYS.ROLE);
};

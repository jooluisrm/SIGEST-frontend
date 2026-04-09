"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthenticatedUser, AuthLoginData } from "@/types/auth";
import {
  clearStoredUser,
  getStoredRoles,
  getStoredToken,
  getStoredTokenType,
  getStoredUser,
  setStoredUser,
} from "@/lib/auth-storage";
import { useLogoutMutation } from "@/hooks/queries/auth";

type UserContextProps = {
  user: AuthenticatedUser | null;
  role: string[];
  accessToken: string | null;
  tokenType: string | null;
  setUserData: (loginData: AuthLoginData) => void;
  clearUser: () => Promise<void>;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const toAuthenticatedUser = (loginData: AuthLoginData): AuthenticatedUser => ({
  id: loginData.id,
  nome: loginData.nome,
  email: loginData.email,
  role: loginData.role,
  access_token: loginData.access_token,
  token_type: loginData.token_type,
});

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);
  const [role, setRole] = useState<string[]>([]);
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    const storedTokenType = getStoredTokenType();
    const storedRoles = getStoredRoles();

    if (storedUser) {
      setUser(storedUser);
    }

    setAccessToken(storedToken);
    setTokenType(storedTokenType);
    setRole(storedRoles);
  }, []);

  const setUserData = (loginData: AuthLoginData) => {
    const authenticatedUser = toAuthenticatedUser(loginData);

    setUser(authenticatedUser);
    setAccessToken(authenticatedUser.access_token);
    setTokenType(authenticatedUser.token_type);
    setRole(authenticatedUser.role);
    setStoredUser(authenticatedUser);
  };

  const clearUser = async () => {
    try {
      if (getStoredToken()) {
        await logoutMutation.mutateAsync();
      }
    } catch {
      // O backend pode já ter invalidado a sessão; limpeza local continua.
    } finally {
      clearStoredUser();
      setUser(null);
      setAccessToken(null);
      setTokenType(null);
      setRole([]);
      window.location.href = "/login";
    }
  };

  return (
    <UserContext.Provider
      value={{ user, role, accessToken, tokenType, setUserData, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};

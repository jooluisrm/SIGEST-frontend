"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserData = {
  id_user: number;
  name: string;
  cpf: string;
  rg: string;
  data_nascimento: string;
  nome_pai: string;
  nome_mae: string;
  genero: string;
  deficiencia: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cidade: string;
  estado: string;
  telefone: string;
  celular: string;
  email: string;
};

export type LoginResponse = {
  message: string;
  user: {
    "User Data": UserData;
  };
  access_token: string;
  token_type: string;
};

const STORAGE_KEYS = {
  USER: "sigest_user",
  TOKEN: "sigest_access_token",
  TOKEN_TYPE: "sigest_token_type",
};

type UserContextProps = {
  user: UserData | null;
  accessToken: string | null;
  tokenType: string | null;
  setUserData: (loginResponse: LoginResponse) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: UserData;
}) => {
  const [user, setUser] = useState<UserData | null>(initialUser ?? null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<string | null>(null);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedTokenType = localStorage.getItem(STORAGE_KEYS.TOKEN_TYPE);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setAccessToken(storedToken);
      }
      if (storedTokenType) {
        setTokenType(storedTokenType);
      }
    }
  }, []);

  const setUserData = (loginResponse: LoginResponse) => {
    const userData = loginResponse.user["User Data"];
    setUser(userData);
    setAccessToken(loginResponse.access_token);
    setTokenType(loginResponse.token_type);

    // Salvar no localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, loginResponse.access_token);
      localStorage.setItem(STORAGE_KEYS.TOKEN_TYPE, loginResponse.token_type);
    }
  };

  const clearUser = () => {
    setUser(null);
    setAccessToken(null);
    setTokenType(null);

    // Limpar localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
      // Redirecionar para login
      window.location.href = '/login';
    }
  };

  return (
    <UserContext.Provider value={{ user, accessToken, tokenType, setUserData, clearUser }}>
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


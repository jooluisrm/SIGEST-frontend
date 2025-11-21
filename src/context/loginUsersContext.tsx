"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

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
  user: UserData; // Mudança: user já é UserData diretamente, não tem "User Data"
  access_token: string;
  token_type: string;
  role: string[];
};

const STORAGE_KEYS = {
  USER: "sigest_user",
  TOKEN: "sigest_access_token",
  TOKEN_TYPE: "sigest_token_type",
  ROLE: "sigest_role",
};

type UserContextProps = {
  user: UserData | null;
  role: string[];
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
  const [role, setRole] = useState<string[]>([]);
  // Carregar dados dos cookies na inicialização
  useEffect(() => {
    try {
      const storedUser = Cookies.get(STORAGE_KEYS.USER);
      const storedToken = Cookies.get(STORAGE_KEYS.TOKEN);
      const storedTokenType = Cookies.get(STORAGE_KEYS.TOKEN_TYPE);
      const storedRole = Cookies.get(STORAGE_KEYS.ROLE);
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          }
        } catch (e) {
          console.error("Erro ao parsear dados do usuário:", e);
          Cookies.remove(STORAGE_KEYS.USER);
        }
      }
      if (storedToken) {
        setAccessToken(storedToken);
      }
      if (storedTokenType) {
        setTokenType(storedTokenType);
      }
      if (storedRole) {
        setRole(JSON.parse(storedRole));
      }
    } catch (error) {
      console.error("Erro ao carregar dados dos cookies:", error);
    }
  }, []);

  const setUserData = (loginResponse: LoginResponse) => {
    // Mudança: user já é UserData diretamente
    const userData = loginResponse.user;
    setUser(userData);
    setAccessToken(loginResponse.access_token);
    setTokenType(loginResponse.token_type);

    // Salvar nos cookies (expira em 7 dias)
    const expires = 7; // dias
    Cookies.set(STORAGE_KEYS.USER, JSON.stringify(userData), { expires, sameSite: 'strict' });
    Cookies.set(STORAGE_KEYS.TOKEN, loginResponse.access_token, { expires, sameSite: 'strict' });
    Cookies.set(STORAGE_KEYS.TOKEN_TYPE, loginResponse.token_type, { expires, sameSite: 'strict' });
    Cookies.set(STORAGE_KEYS.ROLE, JSON.stringify(loginResponse.role), { expires, sameSite: 'strict' });
  };

  const clearUser = () => {
    setUser(null);
    setAccessToken(null);
    setTokenType(null);
    setRole([]);
    // Limpar cookies
    Cookies.remove(STORAGE_KEYS.USER);
    Cookies.remove(STORAGE_KEYS.TOKEN);
    Cookies.remove(STORAGE_KEYS.TOKEN_TYPE);
    Cookies.remove(STORAGE_KEYS.ROLE);
    // Redirecionar para login
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, role, accessToken, tokenType, setUserData, clearUser }}>
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


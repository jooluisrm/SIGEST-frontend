import { ApiSuccessResponse } from "@/types/api";

export type AuthLoginData = {
  id: number;
  nome: string;
  email: string;
  access_token: string;
  token_type: string;
  role: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = ApiSuccessResponse<AuthLoginData>;

export type AuthenticatedUser = {
  id: number;
  nome: string;
  email: string;
  role: string[];
  access_token: string;
  token_type: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordValidatePayload = {
  email: string;
  code: string;
};

export type ResetPasswordPayload = {
  email: string;
  code: string;
  password: string;
};

export type ResetPasswordResponse = {
  status: true;
  user: Record<string, unknown>;
  token: string | null;
  message: string;
};

import axiosInstance from "@/lib/axiosInstance";
import { extractResponseData } from "@/lib/api-utils";
import { ApiSuccessResponse } from "@/types/api";
import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ResetPasswordValidatePayload,
} from "@/types/auth";

export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post<LoginResponse>("login", data);
  return response.data.data;
};

export const logout = async () => {
  await axiosInstance.post<ApiSuccessResponse<null>>("logout");
};

export const requestPasswordResetCode = async (data: ForgotPasswordPayload) => {
  const response = await axiosInstance.post("forgot-password-code", data);
  return response.data;
};

export const validatePasswordResetCode = async (
  data: ResetPasswordValidatePayload
) => {
  const response = await axiosInstance.post("reset-password-validate-code", data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await axiosInstance.post<ResetPasswordResponse>(
    "reset-password-code",
    data
  );
  return response.data;
};

export const extractLoginData = extractResponseData;

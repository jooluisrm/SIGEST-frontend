import axiosInstance from "@/lib/axiosInstance";
import {
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ResetPasswordValidatePayload,
} from "@/types/auth";
import { ApiSuccessResponse } from "@/types/api";
import { extractResponseData } from "@/lib/api-utils";

export const postLogin = async (data: LoginPayload) => {
  const response = await axiosInstance.post<LoginResponse>("api/login", data);
  return response.data.data;
};

export const postLogout = async () => {
  await axiosInstance.post<ApiSuccessResponse<null>>("api/logout");
};

export const postForgotPasswordCode = async (data: ForgotPasswordPayload) => {
  const response = await axiosInstance.post("api/forgot-password-code", data);
  return response.data;
};

export const postResetPasswordValidateCode = async (
  data: ResetPasswordValidatePayload
) => {
  const response = await axiosInstance.post(
    "api/reset-password-validate-code",
    data
  );
  return response.data;
};

export const postResetPasswordCode = async (
  data: ResetPasswordPayload
) => {
  const response = await axiosInstance.post<ResetPasswordResponse>(
    "api/reset-password-code",
    data
  );
  return response.data;
};

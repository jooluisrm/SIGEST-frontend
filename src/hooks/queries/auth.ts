import { useMutation } from "@tanstack/react-query";
import {
  login,
  logout,
  requestPasswordResetCode,
  resetPassword,
  validatePasswordResetCode,
} from "@/api/login/loginServices";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: logout,
  });

export const useRequestPasswordResetCodeMutation = () =>
  useMutation({
    mutationFn: requestPasswordResetCode,
  });

export const useValidatePasswordResetCodeMutation = () =>
  useMutation({
    mutationFn: validatePasswordResetCode,
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationFn: resetPassword,
  });

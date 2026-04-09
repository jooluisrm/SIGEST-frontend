"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useLoginMutation,
  useRequestPasswordResetCodeMutation,
  useResetPasswordMutation,
  useValidatePasswordResetCodeMutation,
} from "@/hooks/queries/auth";
import { AppButton } from "../shared/app-button";
import { AppInput } from "../shared/app-input";
import { Button } from "../ui/button";
import { useUser } from "@/context/loginUsersContext";
import { getApiMessage, getValidationMessage } from "@/lib/api-utils";

type LoginStep = "login" | "forgot" | "validate" | "reset";

export const ContainerLogin = () => {
  const router = useRouter();
  const { setUserData } = useUser();
  const [step, setStep] = useState<LoginStep>("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginMutation = useLoginMutation();
  const forgotPasswordMutation = useRequestPasswordResetCodeMutation();
  const validateCodeMutation = useValidatePasswordResetCodeMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const resetRecoveryFlow = () => {
    setCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
      return (
        getValidationMessage(error.response?.data) ??
        getApiMessage(error.response?.data) ??
        fallback
      );
    }

    return fallback;
  };

  const handleLoginButton = async () => {
    if (!email || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      setUserData(response);
      toast.success("Login realizado com sucesso.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "Email ou senha incorretos."));
    } finally {
      setLoading(false);
    }
  };

  const handleSendRecoveryCode = async () => {
    if (!email) {
      toast.error("Informe o e-mail para recuperar a senha.");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPasswordMutation.mutateAsync({ email });
      if (response.code === 422 || response.status === false) {
        toast.error(getApiMessage(response) ?? "Não foi possível enviar o código.");
        return;
      }

      toast.success(getApiMessage(response) ?? "Código enviado com sucesso.");
      setStep("validate");
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao enviar código."));
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCode = async () => {
    if (!email || !code) {
      toast.error("Informe o e-mail e o código.");
      return;
    }

    setLoading(true);
    try {
      const response = await validateCodeMutation.mutateAsync({ email, code });
      if (response.code === 422 || response.status === false) {
        toast.error(getApiMessage(response) ?? "Código inválido.");
        return;
      }

      toast.success(getApiMessage(response) ?? "Código validado.");
      setStep("reset");
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao validar código."));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Preencha a nova senha e a confirmação.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não conferem.");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPasswordMutation.mutateAsync({
        email,
        code,
        password: newPassword,
      });
      toast.success(response.message ?? "Senha redefinida com sucesso.");
      resetRecoveryFlow();
      setPassword("");
      setStep("login");
    } catch (error) {
      toast.error(getErrorMessage(error, "Erro ao redefinir senha."));
    } finally {
      setLoading(false);
    }
  };

  const renderLogin = () => (
    <>
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <AppButton
        isLoading={loading}
        onClick={handleLoginButton}
        className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer"
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Acessar</span>}
      </AppButton>
    </>
  );

  const renderForgot = () => (
    <>
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <AppButton
        isLoading={loading}
        onClick={handleSendRecoveryCode}
        className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer"
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Enviar código</span>}
      </AppButton>
    </>
  );

  const renderValidate = () => (
    <>
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="Código de 6 dígitos"
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <AppButton
        isLoading={loading}
        onClick={handleValidateCode}
        className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer"
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Validar código</span>}
      </AppButton>
    </>
  );

  const renderReset = () => (
    <>
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="Nova senha"
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <AppInput
        className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
        placeholder="Confirmar senha"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <AppButton
        isLoading={loading}
        onClick={handleResetPassword}
        className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer"
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Salvar senha</span>}
      </AppButton>
    </>
  );

  const swapToLogin = () => {
    setStep("login");
    resetRecoveryFlow();
  };

  const renderFooter = () => {
    if (step === "login") {
      return (
        <p className="text-text1">
          Esqueceu a senha?
          <Button
            onClick={() => setStep("forgot")}
            className="p-0 text-text1 ml-1 cursor-pointer"
            variant="link"
          >
            Clique aqui.
          </Button>
        </p>
      );
    }

    return (
      <p className="text-text1">
        Voltar para login?
        <Button
          onClick={swapToLogin}
          className="p-0 text-text1 ml-1 cursor-pointer"
          variant="link"
        >
          Clique aqui.
        </Button>
      </p>
    );
  };

  return (
    <div className="bg-white/30 backdrop-blur mx-5 w-full md:w-[400px] lg:w-[500px] h-[500px] rounded-4xl py-5 px-10 flex flex-col justify-between">
      <div>
        <Image
          alt="logo-sigest"
          src="/assets/sigest-logo.png"
          width={942}
          height={362}
          priority
        />
      </div>
      <div className="flex flex-col gap-5 items-center">
        {step === "login" && renderLogin()}
        {step === "forgot" && renderForgot()}
        {step === "validate" && renderValidate()}
        {step === "reset" && renderReset()}
      </div>
      <div className="text-center">{renderFooter()}</div>
    </div>
  );
};

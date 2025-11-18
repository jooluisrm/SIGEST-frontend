"use client"

import Image from "next/image";
import { InputLogin } from "./inputLogin";
import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonLogin } from "./buttonLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLogin } from "@/api/login/loginServices";
import { toast } from "sonner";
import { AppInput } from "../shared/app-input";
import { useUser } from "@/context/loginUsersContext";
import { AppButton } from "../shared/app-button";
import { Loader2 } from "lucide-react";

export const ContainerLogin = () => {

    const [pageLogin, setPageLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { setUserData } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSwapPage = () => {
        setPageLogin(!pageLogin);
    }

    const handleLoginButton = async () => {
        if (!email || !password) {
            toast.error('Preencha todos os campos');
            return;
        }
        setLoading(true);
        try {
            const response = await postLogin({ email, password });
            setUserData(response);
            toast.success('Login realizado com sucesso!');
            setTimeout(() => {
                router.push('/dashboard');
            }, 500);
        } catch (error: any) {
            toast.error("Email ou senha incorretos");
        } finally {
            setLoading(false);
        }
    }

    const handleNewPassword = () => {
        return;
    }

    return (
        <div className="bg-white/30 backdrop-blur mx-5 w-full md:w-[400px] lg:w-[500px] h-[500px] rounded-4xl py-5 px-10 flex flex-col justify-between">
            <div>
                <Image
                    alt="logo-sigest"
                    src={'/assets/sigest-logo.png'}
                    width={942}
                    height={362}
                    priority={true}
                />
            </div>
            <div className="flex flex-col gap-5 items-center">
                {
                    pageLogin ? (
                        <>
                            <AppInput
                                className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
                                placeholder="E-mail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <AppInput
                                className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
                                placeholder="Senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <AppButton
                                isLoading={loading}
                                onClick={handleLoginButton}
                                className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer"
                            >
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                                    <span>Acessar</span>}
                            </AppButton>
                        </>
                    ) : (
                        <>
                            <InputLogin placeholder="Senha" />
                            <InputLogin placeholder="Confirmar senha" />
                            <ButtonLogin text="Salvar" onClick={handleNewPassword} />
                        </>
                    )
                }
            </div>
            <div className="text-center">
                <p className="text-text1">
                    {pageLogin ? "Esqueceu a senha?" : "Fazer login?"}
                    <Button
                        onClick={handleSwapPage} className="p-0 text-text1 ml-1 cursor-pointer" variant={"link"}
                    >
                        Clique aqui.
                    </Button>
                </p>
            </div>
        </div>
    );
}
"use client"

import Image from "next/image";
import { InputLogin } from "./inputLogin";
import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonLogin } from "./buttonLogin";
import { useState } from "react";
import { redirect } from "next/navigation";

export const ContainerLogin = () => {

    const [pageLogin, setPageLogin] = useState(true);

    const handleSwapPage = () => {
        setPageLogin(!pageLogin);
    }

    const handleLoginButton = () => {
        redirect('/dashboard');
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
                            <InputLogin placeholder="E-mail" />
                            <InputLogin placeholder="Senha" />
                            <ButtonLogin text="Acessar" onClick={handleLoginButton}/>
                        </>
                    ) : (
                        <>
                            <InputLogin placeholder="Senha" />
                            <InputLogin placeholder="Confirmar senha" />
                            <ButtonLogin text="Salvar" onClick={handleNewPassword}/>
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
"use client"

import Image from "next/image";
import { InputLogin } from "./inputLogin";
import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonLogin } from "./buttonLogin";
import { useState } from "react";

export const ContainerLogin = () => {

    const [pageLogin, setPageLogin] = useState(true);

    const handleSwapPage = () => {
        setPageLogin(!pageLogin);
    }

    return (
        <div className="bg-white/30 backdrop-blur mx-5 w-full md:w-[400px] lg:w-[500px] h-[500px] rounded-4xl py-5 px-5 flex flex-col justify-between">
            <div>
                <Image
                    alt="logo-sigest"
                    src={'/assets/sigest-logo.png'}
                    width={942}
                    height={362}
                />
            </div>
            <div className="flex flex-col gap-5 items-center">
                {
                    pageLogin ? (
                        <>
                            <InputLogin placeholder="E-mail" />
                            <InputLogin placeholder="Senha" />
                            <ButtonLogin text="Acessar" />
                        </>
                    ) : (
                        <>
                            <InputLogin placeholder="Senha" />
                            <InputLogin placeholder="Confirmar senha" />
                            <ButtonLogin text="Salvar" />
                        </>
                    )
                }
            </div>
            <div className="text-center">
                <p className="text-text1">
                    Esqueceu a senha?
                    <Button
                        onClick={handleSwapPage} className="p-0 text-text1 ml-1" variant={"link"}
                    >
                        Clique aqui.
                    </Button>
                </p>
            </div>
        </div>
    );
}
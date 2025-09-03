"use client"

import { ButtonGerenciar } from "../gerenciar/buttonGerenciar";
import { useRouter } from "next/navigation";

export const ButtonBackPage = () => {

    const router = useRouter();
    const handleBackButton = () => {
        router.back();
    }

    return (
        <ButtonGerenciar
            alt="Voltar"
            icon="arrow"
            className="bg-secundaria"
            size={"default"}
            onClick={handleBackButton}
        />
    );
}
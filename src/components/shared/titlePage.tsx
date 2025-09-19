"use client"

import { ButtonBackPage } from "./buttonBackPage";
import { usePageType } from "@/context/pageTypeContext";

type Props = {
    title: string
}

const typeDisplayMap: Record<string, string> = {
    aluno: "Aluno",
    professor: "Professor",
    servidor: "Servidor",
    disciplina: "Disciplina",
    usuario: "Usuários", 
};

export const TitlePage = ({ title }: Props) => {
    const { type } = usePageType();

    return (
        <div className="flex items-center justify-start gap-5">
            <ButtonBackPage />
            <h1 className="text-xl sm:text-3xl md:text-4xl py-10">
                {title}{" "}
                <span className="font-bold">
                    {type ? typeDisplayMap[type] ?? type : ""}
                </span>
            </h1>
        </div>
    )
}

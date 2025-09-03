"use client"

import { ReactNode } from "react";
import { ButtonCadastro } from "../cadastrar/buttonCadastro";
import { useRouter } from "next/navigation";
import { ButtonBackPage } from "./buttonBackPage";
import { PageType, usePageType } from "@/context/pageTypeContext";

type Props = {
    title: string
}


export const TitlePage = ({ title }: Props) => {
    const { type } = usePageType();

    return (
        <div className="flex items-center justify-start gap-5">
            <ButtonBackPage />
            <h1 className="text-xl sm:text-3xl md:text-4xl py-10">
                {title} <span className="font-bold">{type as ReactNode}</span>
            </h1>
        </div>
    )
}
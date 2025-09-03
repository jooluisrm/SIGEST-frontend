import { UserType } from "@/app/(rotas)/(privadas)/cadastrar/[type]/page";
import { ReactNode } from "react";
import { ButtonCadastro } from "../cadastrar/buttonCadastro";
import { useRouter } from "next/navigation";
import { ButtonBackPage } from "./buttonBackPage";

type Props = {
    title: string
    type: UserType;
}


export const TitlePage = ({ title, type }: Props) => {

    return (
        <div className="flex items-center justify-start gap-5">
            <ButtonBackPage />
            <h1 className="text-xl sm:text-3xl md:text-4xl py-10">
                {title} <span className="font-bold">{type as ReactNode}</span>
            </h1>
        </div>
    )
}
"use client"

import { ContainerCadastro } from "./containerCadastro";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonCadastro } from "./buttonCadastro";
import { ReactNode } from "react";
import { UserType } from "@/app/(rotas)/(privadas)/cadastrar/[type]/page";
import { TitlePage } from "../shared/titlePage";
import { Card } from "../ui/card";

type Props = {
    type: UserType;
};

export const MainCadastrar = ({ type }: Props) => {

    const router = useRouter();

    const handleBackButton = () => {
        router.back();
    }

    return (
        <main className="">
            <div className="min-h-screen container mx-auto px-5">
                <TitlePage
                    title="Cadastrar"
                    type={type}
                />
                <Card>
                    <div className="flex mt-10 justify-center items-center">
                        <div className="w-35 h-35 p-4 bg-gray-300 rounded-full md:w-50 md:h-50">
                            <Image
                                src={`/assets/${type}-icon.png`}
                                alt={`${type} avatar`}
                                width={170}
                                height={170}
                                className="rounded-full w-full h-full"
                                priority={true}
                            />
                        </div>
                    </div>
                    <ContainerCadastro user={type} />
                </Card>
            </div>
        </main>
    );
};

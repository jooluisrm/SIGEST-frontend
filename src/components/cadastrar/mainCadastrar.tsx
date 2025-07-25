"use client"

import { ContainerCadastro } from "./containerCadastro";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonCadastro } from "./buttonCadastro";

type Props = {
    type: string;
};

export const MainCadastrar = ({ type }: Props) => {

    const router = useRouter();

    const handleBackButton = () => {
        router.back();
    }

    return (
        <main className="flex flex-col bg-white/60 backdrop-blur justify-center">
            <div className="relative flex bg-primaria h-15 mt-3 items-center sm:h-20">
                <span className="px-5">
                    <ButtonCadastro text="Voltar" onClick={handleBackButton} />
                </span>
                <h1 className="font-bold absolute left-1/2 transform -translate-x-1/2 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-1xl text-2xl sm:text-4xl text-white mx-auto">
                    Cadastro {type}
                </h1>
            </div>
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
        </main>
    );
};

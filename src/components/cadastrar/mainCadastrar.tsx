import { ContainerCadastro } from "./containerCadastro";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TitlePage } from "../shared/titlePage";
import { Card } from "../ui/card";
import { usePageType } from "@/context/pageTypeContext";
import { IconAvatar } from "./iconAvatar";

export const MainCadastrar = () => {

    return (
        <main className="">
            <div className="min-h-screen container mx-auto px-5">
                <TitlePage
                    title="Cadastrar"
                />
                <Card>
                    {/* <IconAvatar /> */}
                    <ContainerCadastro />
                </Card>
            </div>
        </main>
    );
};

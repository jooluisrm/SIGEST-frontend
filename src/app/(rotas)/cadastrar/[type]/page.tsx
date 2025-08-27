import { MainCadastrar } from "@/components/cadastrar/mainCadastrar";
import { LogoFundo } from "@/components/shared/logo-fundo";
import Image from "next/image";

type Props = {
    params: {
        type: string;
    };
}

const Page = async ({ params }: Props) => {

    const { type } = params;

    return (
        <section className="min-h-screen">
                <LogoFundo />
                <MainCadastrar type={type} />
        </section>
    );
}

export default Page;
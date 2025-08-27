import { MainGerenciar } from "@/components/gerenciar/mainGerenciar";
import { LogoFundo } from "@/components/shared/logo-fundo";

type Props = {
    params: {
        type: RouterType;
    };
}

const Page = async ({ params }: Props) => {

    const { type } = await params;

    return (
        <section className="min-h-screen">
            <LogoFundo />
            <MainGerenciar type={type}/>
        </section>
    );
}

export default Page;
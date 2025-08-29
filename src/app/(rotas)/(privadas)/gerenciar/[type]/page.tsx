import { MainGerenciar } from "@/components/gerenciar/mainGerenciar";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { notFound } from "next/navigation";
import { UserType } from "../../cadastrar/[type]/page";

type ProGerenciarPageProps = {
    params: Promise<{ type: UserType }>;
}

const validTypes: UserType[] = ['aluno', 'professor', 'servidor'];

const Page = async ({ params }: ProGerenciarPageProps) => {

    const resolvedParams = await params;
    const { type } = resolvedParams;

    if (!validTypes.includes(type)) {
        notFound();
    }

    return (
        <section className="min-h-screen">
            <MainGerenciar type={type} />
        </section>
    );
}

export default Page;
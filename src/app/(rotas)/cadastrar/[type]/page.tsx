// src/app/(rotas)/cadastrar/[type]/page.tsx

import { MainCadastrar } from "@/components/cadastrar/mainCadastrar";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { notFound } from "next/navigation"; // Importe a função notFound

// 1. Crie um tipo mais específico para os valores que você espera
export type UserType = 'aluno' | 'professor' | 'servidor';

// Use esse tipo nas suas props
type Props = {
    params: {
        type: UserType; // Agora 'type' SÓ PODE SER um desses três valores
    };
}

// Array com os valores válidos para a verificação em tempo de execução
const validTypes: UserType[] = ['aluno', 'professor', 'servidor'];

const Page = async ({ params }: Props) => {
    
    const { type } = await params;

    // 2. Valide o parâmetro da URL em tempo de execução
    // Se o 'type' da URL não for um dos valores válidos, mostra a página 404.
    if (!validTypes.includes(type)) {
        notFound();
    }

    return (
        <section className="min-h-screen">
            <LogoFundo />
            {/* O componente MainCadastrar agora recebe um tipo que é garantidamente válido */}
            <MainCadastrar type={type} />
        </section>
    );
}

export default Page;
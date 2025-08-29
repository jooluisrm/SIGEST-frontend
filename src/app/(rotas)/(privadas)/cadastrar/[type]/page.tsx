// src/app/(rotas)/cadastrar/[type]/page.tsx

import { MainCadastrar } from "@/components/cadastrar/mainCadastrar";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { notFound } from "next/navigation";

export type UserType = 'aluno' | 'professor' | 'servidor';

// A tipagem correta para o Next.js 15, refletindo que 'params' é uma Promise.
// Usei um nome único para as props para evitar qualquer conflito.
type CadastrarPageProps = {
    params: Promise<{ type: UserType }>;
}

const validTypes: UserType[] = ['aluno', 'professor', 'servidor'];

export default async function Page({ params }: CadastrarPageProps) {
    
    // AQUI ESTÁ A MUDANÇA FUNDAMENTAL:
    // Precisamos usar 'await' para resolver a Promise antes de acessar os valores.
    const resolvedParams = await params;
    const { type } = resolvedParams;

    // A partir daqui, o resto do código funciona como antes
    if (!validTypes.includes(type)) {
        notFound();
    }

    return (
        <section className="min-h-screen">
            <MainCadastrar type={type} />
        </section>
    );
}
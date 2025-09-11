// src/app/(rotas)/cadastrar/[type]/page.tsx

import { MainCadastrar } from "@/components/cadastrar/mainCadastrar";
import { PageTypeProvider } from "@/context/pageTypeContext";
import { PageTypeCentral, ROUTE_TYPES } from "@/types/routerType";
import { notFound } from "next/navigation";

type CadastrarPageProps = {
    params: Promise<{ type: PageTypeCentral }>;
}

const validTypes = ROUTE_TYPES;

export default async function Page({ params }: CadastrarPageProps) {

    const resolvedParams = await params;
    const { type } = resolvedParams;

    if (!validTypes.includes(type)) {
        notFound();
    }

    return (
        <PageTypeProvider initialType={type}>
            <section className="min-h-screen">
                <MainCadastrar />
            </section>
        </PageTypeProvider>
    );
}
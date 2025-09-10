"use client"

import { useSidebar } from "../ui/sidebar";
import { PageTypeProvider } from "@/context/pageTypeContext";
import { cn } from "@/lib/utils";
import { HeaderPage } from "@/components/shared/headerPage";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

type Props = {
    children: React.ReactNode;
}

export const PrivateLayoutContent = ({ children }: Props) => {
    // Agora sim, o hook é chamado DENTRO de um componente filho do Provider
    const { open, isMobile } = useSidebar();

    return (
        <div
            className={cn(
                "min-h-screen w-full transition-all duration-300",
                // A lógica de classe continua aqui, funcionando perfeitamente
                open && !isMobile && "md:pl-[16rem]"
            )}
        >
            <AppSidebar />
            <HeaderPage />
            <main className="pt-20">
                <LogoFundo />
                <div className="bg-white/70 backdrop-blur min-h-screen pb-20">
                    <PageTypeProvider>{children}</PageTypeProvider>
                </div>
            </main>
        </div>
    );
}
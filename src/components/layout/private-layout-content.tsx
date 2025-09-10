// components/layout/private-layout-content.tsx

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
    const { open, isMobile } = useSidebar();

    return (
        <div
            className={cn(
                "min-h-screen w-full transition-all duration-300",
                // Se estiver aberto E for desktop, padding de 16rem
                open && !isMobile && "md:pl-[16rem]",
                // Se estiver fechado E for desktop, padding de 3rem (largura do ícone)
                !open && !isMobile && "md:pl-[3rem]"
            )}
        >
            <AppSidebar />
            <HeaderPage />
            <main className="pt-20">
                <LogoFundo />
                {/* REMOVIDO: A classe de padding condicional daqui */}
                <div className="bg-white/70 min-h-screen pb-20">
                    <PageTypeProvider>{children}</PageTypeProvider>
                </div>
            </main>
        </div>
    );
}
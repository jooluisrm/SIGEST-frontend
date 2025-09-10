"use client"; // Necessário para usar o hook

import { HeaderPage } from "@/components/shared/headerPage";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { useSidebar } from "@/components/ui/sidebar"; // Importe o hook
import { PageTypeProvider } from "@/context/pageTypeContext";
import { cn } from "@/lib/utils";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Use o hook para saber o estado do sidebar
    const { open, isMobile } = useSidebar();

    return (
        <div
            className={cn(
                "min-h-screen w-full transition-all duration-300",
                // AQUI: Adicionamos a verificação !isMobile
                // O padding só será aplicado se o sidebar estiver aberto E não for mobile
                open && !isMobile && "md:pl-[16rem]"
            )}
        >
            <HeaderPage />
            <main className="pt-20">
                <LogoFundo />
                <div className="bg-white/70 backdrop-blur min-h-screen pb-20">
                    <PageTypeProvider>
                        {children}
                    </PageTypeProvider>
                </div>
            </main>
        </div>
    );
}
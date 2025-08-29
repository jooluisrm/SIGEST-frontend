import { HeaderPage } from "@/components/shared/headerPage";
import { LogoFundo } from "@/components/shared/logo-fundo";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <HeaderPage />
            <main className="pt-20">
                <LogoFundo />
                <div className="bg-white/70 backdrop-blur min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
import { MainDashboard } from "@/components/dashboard/mainDashboard";
import { BemVindo } from "@/components/PaginaInicial/bemVindo";
import { LogoFundo } from "@/components/shared/logo-fundo";
import Image from "next/image";

const Page = () => {
    return (
        <section className="min-h-screen">
                <MainDashboard />
        </section>

    );
}

export default Page;
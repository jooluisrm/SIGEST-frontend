import { MainDashboard } from "@/components/dashboard/mainDashboard";
import { LogoFundo } from "@/components/shared/logo-fundo";
import Image from "next/image";

const Page = () => {
    return (
        <section className="min-h-screen">
                <LogoFundo />
                <MainDashboard />
        </section>

    );
}

export default Page;
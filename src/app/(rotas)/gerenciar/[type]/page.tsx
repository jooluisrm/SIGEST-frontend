import { LogoFundo } from "@/components/shared/logo-fundo";
import Image from "next/image";

type Props = {
    params: {
        type: string;
    };
}

const Page = async ({ params }: Props) => {

    const { type } = await params;

    return (
        <section className="min-h-screen">
            <LogoFundo />
        </section>
    );
}

export default Page;
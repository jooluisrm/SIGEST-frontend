import { MainDashboard } from "@/components/dashboard/mainDashboard";
import Image from "next/image";

const Page = () => {
    return (
        <section className="bg-[url('/assets/bg-login.jpg')] bg-cover bg-center min-h-screen">
            <div className="w-full min-h-screen bg-white/50 backdrop-blur relative">
                <Image
                    alt="logo sigest"
                    src={'/assets/sigest-logo.png'}
                    width={942}
                    height={362}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
                    priority={true}
                />
                <MainDashboard />
            </div>
        </section>

    );
}

export default Page;
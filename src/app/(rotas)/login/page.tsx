import { InputLogin } from "@/components/login/inputLogin";
import { MainLogin } from "@/components/login/mainLogin";
import { Button } from "@/components/ui/button";

const Page = () => {
    return (
        <section className="bg-[url('/assets/bg-login.jpg')] bg-cover bg-center min-h-screen">
                <MainLogin />
        </section>
    );
}

export default Page;
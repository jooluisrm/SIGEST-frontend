import { redirect } from "next/navigation";

const Page = () => {

    const logado = false;

    if(logado) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }

    return (
        <main className="bg-secundaria">
            page de controle
        </main>
    );
}

export default Page;
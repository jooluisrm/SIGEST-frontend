import { ContainerLogin } from "./containerLogin";
import { InputLogin } from "./inputLogin";

export const MainLogin = () => {
    return (
        <main className="w-full h-screen flex justify-center items-center bg-black/50">
            <ContainerLogin />
        </main>
    );
}
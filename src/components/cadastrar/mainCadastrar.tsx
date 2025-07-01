import { ContainerCadastro } from "./containerCadastro";

type Props = {
    type: "aluno" | "professor" | "servidor"
}

export const MainCadastrar = ({ type }: Props) => {
    return (
        <main className="flex bg-black/50">
            <ContainerCadastro user={type}/>
        </main>
    );
}
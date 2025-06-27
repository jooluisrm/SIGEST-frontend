type Props = {
    type: "aluno" | "professor" | "servidor";
}

export const MainCadastrar = ({ type }: Props) => {
    return (
        <main>
            {type}
        </main>
    );
}
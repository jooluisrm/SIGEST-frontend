import { MainCadastrar } from "@/components/cadastrar/mainCadastrar";

type Props = {
    params: {
        type: "aluno" | "professor" | "servidor";
    };
}

const Page = ({ params }: Props) => {
    return (
        <section>
            <MainCadastrar type={params.type}/>
        </section>
    );
}

export default Page;
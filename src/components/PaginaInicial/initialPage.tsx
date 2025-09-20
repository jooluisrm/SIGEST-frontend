import { BemVindo } from "./bemVindo"
import { InicialItem } from "./inicialItem"



export const InitialPage = () => {
    return (
        <div className="flex justify-center flex-col items-center my-10 mx-10 gap-10 w-[300px] sm:w-[500px] md:w-[1000px]">
            <BemVindo />
            <InicialItem title="Todas as Notícias"/>
            <InicialItem title="Alunos destaque turma B"/>
            <InicialItem title=""/>
        </div>
    )
}
import { ItemGridDashboard } from "./itemGridDashboard";

export const DialogGridGerenciarDashboard = () => {
    return (
        <div className="px-5 pb-5 grid gap-5 grid-cols-1 md:grid-cols-3">
            <ItemGridDashboard bg={2} text="Professor" type="Professor" link="/gerenciar/professor"/>
            <ItemGridDashboard bg={2} text="Aluno" type="Aluno" link="/gerenciar/aluno"/>
            <ItemGridDashboard bg={2} text="Usuário" type="Usuario" link="/gerenciar/usuario"/>
            <ItemGridDashboard bg={2} text="Disciplina" type="Disciplina" link="/gerenciar/disciplina"/>
        </div>
    );
}
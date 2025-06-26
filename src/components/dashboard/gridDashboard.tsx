import { ItemGridDashboard } from "./itemGridDashboard";

export const GridDashboard = () => {
    return (
        <div className="px-5 mx-auto container grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ItemGridDashboard text="Cadastro" type="Cadastrar"/>
            <ItemGridDashboard text="Frequencia e Notas" type="Nota"/>
            <ItemGridDashboard text="Relatórios" type="Relatorio"/>
            <ItemGridDashboard text="Relatórios" type="Relatorio"/>
        </div>
    );
}
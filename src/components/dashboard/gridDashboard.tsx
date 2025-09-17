import { DialogGerenciarDashboard } from "./dialogGerenciarDashboard";
import { ItemGridDashboard } from "./itemGridDashboard";

export const GridDashboard = () => {
    return (
        <div className="px-5 mx-auto container grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
            <DialogGerenciarDashboard />
            <ItemGridDashboard text="Frequencia e Notas" type="Nota" bg={1}/>
            <ItemGridDashboard text="Relatórios" type="Relatorio" bg={1}/>
            <ItemGridDashboard text="Relatórios" type="Relatorio" bg={1}/>
        </div>
    );
}
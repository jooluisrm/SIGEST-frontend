import { ItemGridDashboard } from "./itemGridDashboard";

export const DialogGridCadastroDashboard = () => {
    return (
        <div className="px-5 pb-5 grid gap-5 grid-cols-1 md:grid-cols-3">
            <ItemGridDashboard bg={2} text="Professor" type="Professor"/>
            <ItemGridDashboard bg={2} text="Aluno" type="Aluno"/>
            <ItemGridDashboard bg={2} text="Servidor" type="Servidor"/>
        </div>
    );
}
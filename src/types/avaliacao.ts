export type Avaliacao = {
    id: number;
    titulo: string;
    data: string;
    max_pontos: number;
    turma_id: number;
    tipo: "Prova" | "Trabalho" | "Atividade";
};

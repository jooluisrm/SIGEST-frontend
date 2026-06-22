export type Avaliacao = {
  id: number;
  titulo: string;
  data: string;
  valor?: string | number;
  max_pontos?: number;
  pontuacao_maxima?: number;
  disciplina_id?: number;
  turma?: string | number;
  turma_id?: number;
  tipo: "Prova" | "Trabalho" | "Atividade" | string;
};

export type AvaliacaoPayload = {
  titulo?: string;
  data?: string;
  valor?: string | number;
  max_pontos?: number;
  pontuacao_maxima?: number;
  disciplina_id?: number;
  turma?: string | number;
  turma_id?: number;
  tipo?: string;
};

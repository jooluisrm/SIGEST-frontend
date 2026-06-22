export type Atividade = {
  id: number;
  titulo?: string;
  title?: string;
  data?: string;
  valor?: string | number;
  pontuacao_maxima?: number;
  max_pontos?: number;
  tipo?: string;
  turma?: string | number;
  turma_id?: number;
  disciplina_id?: number;
  oferta_disciplina_id?: number;
};

export type AtividadePayload = {
  titulo?: string;
  title?: string;
  data?: string;
  valor?: string | number;
  pontuacao_maxima?: number;
  max_pontos?: number;
  tipo?: string;
  turma?: string | number;
  turma_id?: number;
  disciplina_id?: number;
  oferta_disciplina_id?: number;
};

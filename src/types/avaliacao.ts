export type Atividade = {
  id: number;
  titulo?: string;
  title?: string;
  data?: string;
  data_inicio?: string;
  data_fim?: string | null;
  valor?: string | number;
  pontuacao_maxima?: number;
  max_pontos?: number;
  tipo?: string;
  turma?: string | number;
  turma_id?: number;
  descricao?: string;
  disciplina_id?: number;
  oferta_disciplina_id?: number;
};

export type AtividadePayload = {
  titulo?: string;
  title?: string;
  data?: string;
  data_inicio?: string;
  data_fim?: string | null;
  valor?: string | number;
  pontuacao_maxima?: number;
  max_pontos?: number;
  tipo?: string;
  turma?: string | number;
  turma_id?: number;
  descricao?: string;
  disciplina_id?: number;
  oferta_disciplina_id?: number;
};

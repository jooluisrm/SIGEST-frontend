export type Disciplina = {
  id: number;
  nome: string;
  sigla: string;
  area_conhecimento: string;
  unidade: string;
  carga_horaria: string;
  data_inicio: string;
  data_encerramento: string | null;
  ementa: string;
  bibliografia: string;
};

export type DisciplinaPayload = {
  nome?: string;
  sigla?: string;
  area_conhecimento?: string;
  unidade?: string;
  carga_horaria?: string;
  data_inicio?: string;
  data_encerramento?: string;
  ementa?: string;
  bibliografia?: string;
};

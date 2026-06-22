export type FrequenciaStub = {
  message: string;
};

export type FrequenciaStatus = "P" | "F" | "J";

export type FrequenciaAluno = {
  aluno_id: number;
  status: FrequenciaStatus;
};

export type Frequencia = {
  id: number;
  data?: string;
  data_aula?: string;
  classroom_id?: number;
  turma_id?: number;
  turma?: string;
  disciplina_id?: number;
  disciplina?: string;
  conteudo?: string;
  conteudo_trabalhado?: string;
  presencas?: FrequenciaAluno[];
  alunos?: FrequenciaAluno[];
};

export type FrequenciaPayload = {
  data_aula: string;
  classroom_id?: number;
  turma_id?: number;
  disciplina_id: number;
  conteudo: string;
  conteudo_trabalhado?: string;
  presencas: FrequenciaAluno[];
};

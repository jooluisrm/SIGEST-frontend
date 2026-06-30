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
  matricula_disciplina_id?: number;
  matricula_disciplina?: {
    id?: number;
    matricula?: {
      id?: number;
      aluno_id?: number;
      codigo_matricula?: string;
      aluno?: {
        id?: number;
        name?: string;
        nome?: string;
      };
    };
  };
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
  matricula_disciplina_id: number;
  data: string;
  situacao: boolean;
  justificativa?: string | null;
};

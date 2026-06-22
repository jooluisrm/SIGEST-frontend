import { Classroom } from "./classroom";
import { Disciplina } from "./disciplina";
import { Period } from "./period";
import { Professor } from "./professor";

export type OfertaDisciplina = {
  id: number;
  disciplina?: Disciplina;
  classroom?: Classroom;
  professor?: Professor;
  periodo_letivo?: Period;
  status?: boolean | 0 | 1;
  created_at?: string;
};

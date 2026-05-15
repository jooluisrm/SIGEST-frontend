export type Period = {
  id: number;
  course_id?: number;
  periodo_letivo_id?: number;
  name: string;
  start_date?: string;
  end_date?: string;
  data_inicio?: string;
  data_encerramento?: string;
  total_hours?: number;
  status?: boolean;
};

export type CreatePeriodPayload = {
  course_id: number;
  name: string;
  start_date: string;
  end_date: string;
};

export type GenerateClassroomsPayload = {
  max_students: number;
  shift: "Matutino" | "Vespertino" | "Noturno";
};

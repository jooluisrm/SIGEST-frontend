export type Period = {
  id: number;
  course_id: number;
  name: string;
  start_date?: string;
  end_date?: string;
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

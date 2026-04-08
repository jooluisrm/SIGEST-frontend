export type Classroom = {
  id: number;
  period_id: number;
  name: string;
  max_students: number;
  shift: string;
  status: boolean | 0 | 1;
};

export type ClassroomPayload = {
  period_id: number;
  name: string;
  max_students: number;
  shift: string;
  status: boolean;
};

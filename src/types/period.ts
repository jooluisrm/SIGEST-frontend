export type Period = {
  id: number;
  course_id: number;
  name: string;
};

export type GenerateClassroomsPayload = {
  max_students: number;
  shift: "Matutino" | "Vespertino" | "Noturno";
};

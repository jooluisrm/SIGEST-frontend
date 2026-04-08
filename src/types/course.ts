export type Course = {
  id: number;
  name: string;
  number_periods: number;
  total_hours: number;
  hours_period: number;
  details: string;
  status: boolean | 0 | 1;
};

export type CoursePayload = {
  name?: string;
  number_periods?: number;
  total_hours?: number;
  hours_period?: number;
  details?: string;
  status?: boolean;
};

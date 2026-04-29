export type Course = {
  id: number;
  name: string;
  number_periods: number;
  total_hours: number;
  hours_period: number;
  details: string;
  status: boolean | 0 | 1;
  periodo_letivo?: string | null;
  periodoLetivo?: string | null;
  current_period?: {
    name?: string | null;
  } | null;
  currentPeriod?: {
    name?: string | null;
  } | null;
};

export type CoursePayload = {
  name?: string;
  number_periods?: number;
  total_hours?: number;
  hours_period?: number;
  details?: string;
  status?: boolean;
};

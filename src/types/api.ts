export type ApiSuccessResponse<T> = {
  status: boolean;
  code: number;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  status: false;
  code: number;
  message: string;
  data: null;
};

export type ApiValidationErrorResponse = {
  status: false;
  code: 422;
  mensagem: Record<string, string[]>;
};

export type ApiLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type ApiMetaLink = {
  url: string | null;
  label: string;
  page?: number | null;
  active: boolean;
};

export type ApiMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: ApiMetaLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type ApiPaginatedResponse<T> = {
  data: T[];
  links: ApiLinks;
  meta: ApiMeta;
  status: boolean;
  code: number;
  message: string;
};

export type NormalizedListResponse<T> = {
  data: T[];
  links: ApiLinks | null;
  meta: ApiMeta | null;
  status: boolean;
  code: number;
  message: string;
};

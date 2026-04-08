# API SIGEST - Contrato Oficial para Integração Frontend

Data de referência do contrato: **06/03/2026**  
Escopo: **todas as rotas API registradas atualmente (56)**.

## 1) Fonte da Verdade do Contrato
Este documento foi gerado com base em:
- `routes/api.php`
- `php artisan route:list --path=api --json`
- `app/Http/Controllers/*`
- `app/Http/Requests/*`
- `app/Http/Resources/*`
- `app/Traits/HttpResponse.php`

## 2) Padrão Global de Respostas

### 2.1 Sucesso padrão (trait `HttpResponse::successJsonResponse`)
```json
{
  "status": true,
  "code": 200,
  "message": "Mensagem",
  "data": {}
}
```

### 2.2 Sucesso paginado (trait `HttpResponse::successCollectionResponse`)
Retorno baseado em `Resource::collection(...)` com paginação Laravel:
```json
{
  "data": [],
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [],
    "path": "...",
    "per_page": 10,
    "to": 10,
    "total": 10
  },
  "status": true,
  "code": 200,
  "message": "Mensagem"
}
```

### 2.3 Erro padrão (trait `HttpResponse::errorResponse`)
```json
{
  "status": false,
  "code": 500,
  "message": "Não foi possível processar a solicitação",
  "data": null
}
```

### 2.4 Erro de validação 422 (classe `ApiResquest`)
```json
{
  "status": false,
  "code": 422,
  "mensagem": {
    "campo": ["mensagem de validação"]
  }
}
```

### 2.5 Casos fora do padrão global
- `POST /api/login`: retorno customizado com `data.access_token`.
- `POST /api/reset-password-code`: retorno customizado com `user` e `token` na raiz.
- `DELETE` implementados geralmente retornam `204 No Content` (corpo vazio).
- Em alguns fluxos de negócio, há `status=false` com `HTTP 422` mas via resposta de “sucesso” da trait.

## 3) Tipos TypeScript Recomendados

```ts
export type ApiSuccessResponse<T> = {
  status: boolean; // true em 2xx
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
```

### 3.1 Tipos de domínio (retorno real atual)
```ts
export type AuthLoginData = {
  id: number;
  nome: string;
  email: string;
  access_token: string;
  token_type: 'Bearer' | string;
  role: string[];
};

export type UserBase = {
  id_user: number;
  name: string;
  cpf: string;
  rg: string;
  data_nascimento: string;
  nome_pai: string | null;
  nome_mae: string;
  genero: string | null;
  deficiencia: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  cidade: string;
  estado: string;
  telefone: string | null;
  celular: string;
  email: string;
};

export type Professor = UserBase & {
  id_professor: number;
  matricula_adpm: string;
  codigo_disciplina: string;
};

export type Servidor = UserBase & {
  id_servidor: number;
  cargo: string;
  setor: string;
};

export type Aluno = {
  period_id: number | null;
  classroom_id: number | null;
  id: number;
  name: string;
  cpf: string;
  rg: string | null;
  data_nascimento: string;
  nome_pai: string | null;
  nome_mae: string;
  genero: string | null;
  deficiencia: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string | null;
  cidade: string;
  estado: string;
  telefone: string | null;
  celular: string;
  email: string;
  matricula: string;
  turma: string | null;
  status: boolean | 0 | 1;
};

export type Disciplina = {
  id: number;
  nome: string;
  sigla: string;
  area_conhecimento: string;
  unidade: string;
  carga_horaria: string;
  data_inicio: string;
  data_encerramento: string | null;
  ementa: string;
  bibliografia: string;
};

export type Course = {
  id: number;
  name: string;
  number_periods: number;
  total_hours: number;
  hours_period: number;
  details: string;
  status: boolean | 0 | 1;
};

export type Period = {
  id: number;
  course_id: number;
  name: string;
};

export type Classroom = {
  id: number;
  period_id: number;
  name: string;
  max_students: number;
  shift: string;
  status: boolean | 0 | 1;
};

export type FrequenciaStub = {
  message: string;
};
```

## 4) Autenticação e Permissões

### 4.1 Rotas públicas
- `POST /api/login`
- `POST /api/forgot-password-code`
- `POST /api/reset-password-validate-code`
- `POST /api/reset-password-code`

### 4.2 Rotas autenticadas (`auth:sanctum`)
- Todas as demais rotas de domínio.
- Header esperado:
```http
Authorization: Bearer <token>
```

### 4.3 Regras de role
- `role:servidor|admin`: alunos, professors, servidors, disciplinas, courses, periods, classrooms.
- `role:professor|admin`: frequencias.

## 5) Inventário Completo de Rotas (56)

| Método | Rota | Action | Middleware | Status | Observação |
|---|---|---|---|---|---|
| GET|HEAD | /api/alunos | App\Http\Controllers\AlunoController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/alunos | App\Http\Controllers\AlunoController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/alunos/{aluno} | App\Http\Controllers\AlunoController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/alunos/{aluno} | App\Http\Controllers\AlunoController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/alunos/{aluno} | App\Http\Controllers\AlunoController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/alunos/value/{value} | App\Http\Controllers\AlunoController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/classrooms | App\Http\Controllers\ClassroomController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/classrooms | App\Http\Controllers\ClassroomController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/classrooms/{classroom} | App\Http\Controllers\ClassroomController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/classrooms/{classroom} | App\Http\Controllers\ClassroomController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/classrooms/{classroom} | App\Http\Controllers\ClassroomController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| GET|HEAD | /api/classrooms/show-classroom-for-period/{classroom} | App\Http\Controllers\ClassroomController@showClassroomInPeriods | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/classrooms/value/{value} | App\Http\Controllers\ClassroomController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| GET|HEAD | /api/courses | App\Http\Controllers\CourseController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/courses | App\Http\Controllers\CourseController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/courses/{course} | App\Http\Controllers\CourseController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/courses/{course} | App\Http\Controllers\CourseController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/courses/{course} | App\Http\Controllers\CourseController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/courses/value/{value} | App\Http\Controllers\CourseController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/disciplinas | App\Http\Controllers\DisciplinaController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/disciplinas | App\Http\Controllers\DisciplinaController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/disciplinas/{disciplina} | App\Http\Controllers\DisciplinaController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/disciplinas/{disciplina} | App\Http\Controllers\DisciplinaController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/disciplinas/{disciplina} | App\Http\Controllers\DisciplinaController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/disciplinas/value/{value} | App\Http\Controllers\DisciplinaController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/forgot-password-code | App\Http\Controllers\RecoverPasswordCodeController@forgotPasswordCode | api | implementada |  |
| GET|HEAD | /api/frequencias | App\Http\Controllers\FrequenciaController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:professor\|admin | stub | Retorno provisório fixo |
| POST | /api/frequencias | App\Http\Controllers\FrequenciaController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:professor\|admin | stub | Retorno provisório fixo |
| DELETE | /api/frequencias/{frequencia} | App\Http\Controllers\FrequenciaController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:professor\|admin | stub | Retorno provisório fixo |
| GET|HEAD | /api/frequencias/{frequencia} | App\Http\Controllers\FrequenciaController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:professor\|admin | stub | Retorno provisório fixo |
| PUT|PATCH | /api/frequencias/{frequencia} | App\Http\Controllers\FrequenciaController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:professor\|admin | stub | Retorno provisório fixo |
| POST | /api/login | App\Http\Controllers\AuthController@login | api | implementada |  |
| POST | /api/logout | App\Http\Controllers\AuthController@logout | api, Illuminate\Auth\Middleware\Authenticate:sanctum | implementada |  |
| GET|HEAD | /api/periods | App\Http\Controllers\PeriodController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/periods | App\Http\Controllers\PeriodController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| DELETE | /api/periods/{period} | App\Http\Controllers\PeriodController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| GET|HEAD | /api/periods/{period} | App\Http\Controllers\PeriodController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/periods/{period} | App\Http\Controllers\PeriodController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| GET|HEAD | /api/periods/{period}/generate-classrooms | App\Http\Controllers\ClassroomController@generateClassroom | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/periods/show-periods-for-course/{period} | App\Http\Controllers\PeriodController@showPeriodsInCourse | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/periods/value/{value} | App\Http\Controllers\PeriodController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | pendente | Método não implementado no controller |
| GET|HEAD | /api/professors | App\Http\Controllers\ProfessorController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/professors | App\Http\Controllers\ProfessorController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/professors/{professor} | App\Http\Controllers\ProfessorController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/professors/{professor} | App\Http\Controllers\ProfessorController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/professors/{professor} | App\Http\Controllers\ProfessorController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/professors/value/{value} | App\Http\Controllers\ProfessorController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/reset-password-code | App\Http\Controllers\RecoverPasswordCodeController@resetPasswordCode | api | implementada |  |
| POST | /api/reset-password-validate-code | App\Http\Controllers\RecoverPasswordCodeController@resetPasswordValidateCode | api | implementada |  |
| GET|HEAD | /api/servidors | App\Http\Controllers\ServidorController@index | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| POST | /api/servidors | App\Http\Controllers\ServidorController@store | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| DELETE | /api/servidors/{servidor} | App\Http\Controllers\ServidorController@destroy | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/servidors/{servidor} | App\Http\Controllers\ServidorController@show | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| PUT|PATCH | /api/servidors/{servidor} | App\Http\Controllers\ServidorController@update | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/servidors/value/{value} | App\Http\Controllers\ServidorController@search | api, Illuminate\Auth\Middleware\Authenticate:sanctum, Spatie\Permission\Middleware\RoleMiddleware:servidor\|admin | implementada |  |
| GET|HEAD | /api/status | Closure | api, Illuminate\Auth\Middleware\Authenticate:sanctum | implementada | Closure |

### 5.1 Rotas pendentes (método ausente no controller)
- `PUT/PATCH /api/classrooms/{classroom}`
- `GET /api/classrooms/value/{value}`
- `POST /api/periods`
- `PUT/PATCH /api/periods/{period}`
- `DELETE /api/periods/{period}`
- `GET /api/periods/value/{value}`

### 5.2 Rotas stub
- Todas as rotas de `frequencias` retornam mensagem fixa e não executam regra de negócio ainda.

## 6) Contratos por Recurso

## 6.1 Auth

### POST `/api/login`
- Auth: pública
- Body:
```ts
type LoginRequest = { email: string; password: string };
```
- `200`:
```ts
type LoginResponse = {
  status: true;
  message: string;
  data: AuthLoginData;
};
```
- `401`:
```ts
type LoginUnauthorized = {
  status: false;
  code: 401;
  message: string;
  data: [null];
};
```

### POST `/api/logout`
- Auth: `auth:sanctum`
- Body: vazio
- `200`: `ApiSuccessResponse<null>`

## 6.2 RecoverPassword

### POST `/api/forgot-password-code`
- Body:
```ts
type ForgotPasswordRequest = { email: string };
```
- `200` sucesso: `ApiSuccessResponse<string>` (email)
- `422` negócio (email não encontrado): `ApiSuccessResponse<null>` com `code=422`
- `422` validação: `ApiValidationErrorResponse`

### POST `/api/reset-password-validate-code`
- Body:
```ts
type ResetPasswordValidateCodeRequest = {
  email: string;
  code: string | number; // 6 dígitos
};
```
- `200`: `ApiSuccessResponse<null>`
- `422` negócio: `ApiSuccessResponse<null>` com `code=422`

### POST `/api/reset-password-code`
- Body:
```ts
type ResetPasswordCodeRequest = {
  email: string;
  code: string | number;
  password: string;
};
```
- `200` custom:
```ts
type ResetPasswordCodeResponse = {
  status: true;
  user: Record<string, unknown>;
  token: string | null;
  message: string;
};
```

## 6.3 Alunos
- Rotas: `GET/POST /api/alunos`, `GET/PUT/DELETE /api/alunos/{aluno}`, `GET /api/alunos/value/{value}`
- GET lista: `ApiPaginatedResponse<Aluno>`
- GET item: `ApiSuccessResponse<Aluno>`
- POST: `ApiSuccessResponse<Aluno>` (201)
- PUT: `ApiSuccessResponse<Aluno>`
- DELETE: `204 No Content`
- Search: `ApiPaginatedResponse<Aluno>` ou `ApiSuccessResponse<null | Aluno[]>`
- Payload base de create/update (derivado de `StoreAlunoRequest`/`UpdateAlunoRequest`):
```ts
type AlunoPayload = {
  period_id?: number;
  classroom_id?: number | null;
  name: string;
  cpf: string;
  rg?: string;
  data_nascimento: string;
  nome_pai?: string | null;
  nome_mae: string;
  genero?: string | null;
  deficiencia: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento?: string | null;
  cidade: string;
  estado: string;
  telefone?: string | null;
  celular: string;
  email: string;
  matricula: string;
  status?: boolean;
};
```

## 6.4 Professors
- Rotas: `GET/POST /api/professors`, `GET/PUT/DELETE /api/professors/{professor}`, `GET /api/professors/value/{value}`
- GET lista: `ApiPaginatedResponse<Professor>`
- GET item: `ApiSuccessResponse<Professor>`
- POST: `ApiSuccessResponse<Professor>` (201)
- PUT: `ApiSuccessResponse<Professor>`
- DELETE: `204 No Content`
- Search: `ApiPaginatedResponse<Professor>`
- Payload base (store/update):
```ts
type ProfessorPayload = {
  name?: string;
  cpf?: string;
  rg?: string;
  data_nascimento?: string;
  nome_pai?: string | null;
  nome_mae?: string;
  genero?: string | null;
  deficiencia?: string;
  logradouro?: string;
  numero?: string | null;
  bairro?: string;
  complemento?: string | null;
  cidade?: string;
  estado?: string;
  telefone?: string | null;
  celular?: string;
  email?: string;
  password?: string;
  matricula_adpm?: string;
  codigo_disciplina?: string;
};
```

## 6.5 Servidors
- Rotas: `GET/POST /api/servidors`, `GET/PUT/DELETE /api/servidors/{servidor}`, `GET /api/servidors/value/{value}`
- GET lista: `ApiPaginatedResponse<Servidor>`
- GET item: `ApiSuccessResponse<Servidor>`
- POST: `ApiSuccessResponse<Servidor>` (201)
- PUT: `ApiSuccessResponse<Servidor>`
- DELETE: `204 No Content`
- Search: `ApiPaginatedResponse<Servidor>`
- Payload base:
```ts
type ServidorPayload = {
  name?: string;
  cpf?: string;
  rg?: string;
  data_nascimento?: string;
  nome_pai?: string | null;
  nome_mae?: string;
  genero?: string | null;
  deficiencia?: string;
  logradouro?: string;
  numero?: string | null;
  bairro?: string;
  complemento?: string | null;
  cidade?: string;
  estado?: string;
  telefone?: string | null;
  celular?: string;
  email?: string;
  password?: string;
  cargo?: string;
  setor?: string;
};
```

## 6.6 Disciplinas
- Rotas: `GET/POST /api/disciplinas`, `GET/PUT/DELETE /api/disciplinas/{disciplina}`, `GET /api/disciplinas/value/{value}`
- GET lista: `ApiPaginatedResponse<Disciplina>`
- GET item: `ApiSuccessResponse<Disciplina>`
- POST: `ApiSuccessResponse<Disciplina>` (201)
- PUT: `ApiSuccessResponse<Disciplina>`
- DELETE: `204 No Content`
- Search: `ApiPaginatedResponse<Disciplina>`
- Payload base:
```ts
type DisciplinaPayload = {
  nome?: string;
  sigla?: string;
  area_conhecimento?: string;
  unidade?: string;
  carga_horaria?: string;
  data_inicio?: string;
  data_encerramento?: string;
  ementa?: string;
  bibliografia?: string;
};
```

## 6.7 Courses
- Rotas: `GET/POST /api/courses`, `GET/PUT/DELETE /api/courses/{course}`, `GET /api/courses/value/{value}`
- GET lista: `ApiPaginatedResponse<Course>`
- GET item: `ApiSuccessResponse<Course>`
- POST: `ApiSuccessResponse<Course>`
- PUT: `ApiSuccessResponse<Course>`
- DELETE: `204 No Content`
- Search: `ApiPaginatedResponse<Course>`
- Payload base:
```ts
type CoursePayload = {
  name?: string; // store aceita apenas "Fundamental I" ou "Fundamental II"
  number_periods?: number;
  total_hours?: number;
  hours_period?: number;
  details?: string;
  status?: boolean;
};
```

## 6.8 Periods
- Rotas implementadas:
  - `GET /api/periods` -> `ApiPaginatedResponse<Period>`
  - `GET /api/periods/{period}` -> `ApiSuccessResponse<Period>`
  - `GET /api/periods/show-periods-for-course/{period}` -> `ApiPaginatedResponse<Period>`
- Rotas pendentes:
  - `POST /api/periods`
  - `PUT/PATCH /api/periods/{period}`
  - `DELETE /api/periods/{period}`
  - `GET /api/periods/value/{value}`

## 6.9 Classrooms
- Rotas implementadas:
  - `GET /api/classrooms` -> `ApiSuccessResponse<ApiPaginatedResponse<Classroom>['data'] | ApiPaginatedResponse<Classroom>>`
  - `POST /api/classrooms` -> `ApiSuccessResponse<Classroom>`
  - `GET /api/classrooms/{classroom}` -> `ApiSuccessResponse<Classroom>`
  - `DELETE /api/classrooms/{classroom}` -> `204 No Content`
  - `GET /api/periods/{period}/generate-classrooms` -> `ApiSuccessResponse<Classroom[] | null>`
  - `GET /api/classrooms/show-classroom-for-period/{classroom}` -> `ApiPaginatedResponse<Classroom>`
- Rotas pendentes:
  - `PUT/PATCH /api/classrooms/{classroom}`
  - `GET /api/classrooms/value/{value}`
- Payload `POST /api/classrooms`:
```ts
type ClassroomPayload = {
  period_id: number;
  name: string;
  max_students: number;
  shift: string;
  status: boolean;
};
```
- Query/body `generate-classrooms`:
```ts
type GenerateClassroomsPayload = {
  max_students: number;
  shift: 'Matutino' | 'Vespertino' | 'Noturno';
};
```

## 6.10 Frequencias (stub)
- Rotas: resource completo em `/api/frequencias`
- Todas retornam atualmente:
```ts
type FrequenciaResponse = { message: string };
```

## 6.11 Status
### GET `/api/status`
- Auth: `auth:sanctum`
- `200`:
```ts
type StatusResponse = {
  status: 'ok';
  message: 'API is running';
};
```

## 7) Exemplos JSON (curtos)

### 7.1 GET lista paginada (`/api/disciplinas`)
```json
{
  "data": [{ "id": 1, "nome": "Matemática", "sigla": "MAT" }],
  "links": { "first": "...", "last": "...", "prev": null, "next": null },
  "meta": { "current_page": 1, "last_page": 1, "total": 1 },
  "status": true,
  "code": 200,
  "message": "Disciplinas encontradas com sucesso"
}
```

### 7.2 GET detalhe (`/api/alunos/{id}`)
```json
{
  "status": true,
  "code": 200,
  "message": "Aluno encontrado com sucesso",
  "data": {
    "id": 10,
    "name": "Aluno Exemplo",
    "cpf": "00000000000"
  }
}
```

### 7.3 POST criação (`/api/servidors`)
```json
{
  "status": true,
  "code": 201,
  "message": "Servidor criado com sucesso",
  "data": {
    "id_user": 4,
    "id_servidor": 2,
    "name": "Servidor Exemplo"
  }
}
```

### 7.4 DELETE (`/api/disciplinas/{id}`)
- `204 No Content` (sem corpo).

## 8) Compatibilidade com Frontend Atual (SIGEST-frontend)

| Tema | Backend hoje | Frontend hoje | Como tipar hoje | Ajuste recomendado |
|---|---|---|---|---|
| Login | `response.data` contém token e usuário | `setUserData(response)` espera token na raiz | Criar adaptador `const login = response.data` | Padronizar frontend para ler `response.data` |
| Busca professor | Rota: `/api/professors/value/{value}` | Usa `/api/professors/search-name?nome=` | Tratar chamada atual como inválida | Atualizar serviço frontend para rota `/value/{value}` |
| Mensagem | Predominância de `message` | Alguns toasts usam `mensagem` | `message ?? mensagem` | Unificar frontend para `message` |
| Estrutura item | Recursos retornam shape plano (ex.: `Professor`) | Alguns tipos/componentes assumem `user_data` | Tipar união temporária | Migrar tipos para shape real dos Resources |
| 422 validação | Campo `mensagem` no `ApiResquest` | Tratamento genérico de erro | Mapear ambos (`mensagem` e `message`) | Considerar padronizar backend para `errors` + `message` |

## 9) Checklist de Implementação Frontend
- Usar `ApiSuccessResponse<T>` para endpoints não paginados.
- Usar `ApiPaginatedResponse<T>` para listagens/search paginadas.
- Tratar `204` sem tentar acessar `response.data`.
- Em login, mapear `response.data` para contexto de usuário.
- Em erro 422, verificar `mensagem` (validação) e `message` (negócio).
- Não integrar rotas `pendente` e `stub` como se estivessem prontas.
- Para buscas, usar apenas rotas oficiais `/value/{value}`.

## 10) Cenários de validação deste documento
- Cobertura de **56/56** rotas do `route:list`.
- Toda rota GET/POST com tipo de retorno explícito.
- Rotas PUT/DELETE com contrato mínimo descrito.
- As 6 rotas pendentes destacadas.
- Rotas de `frequencias` marcadas como `stub`.
- Compatibilidade frontend mapeada com ação recomendada.

## 11) Observações de risco técnico
- Existem respostas não homogêneas entre endpoints (principalmente login e reset de senha).
- `errorResponse` pode quebrar quando chamado com valor que não é exceção (há chamadas passando `null` ou `string` em alguns pontos).
- Há inconsistências de domínio/modelagem (ex.: campos esperados em frontend diferentes do shape real de `Resource`).

---

Documento destinado à implementação de consumo no frontend sem alterar comportamento atual da API.


# Analise de Gap de Implementacao Frontend vs Contrato API

Data da analise: **06/03/2026**  
Projeto analisado: `SIGEST-frontend`  
Documento de referencia: `docs/API_FRONTEND_CONTRATO.md`

## Resumo executivo

Objetivo desta analise: identificar, no frontend atual, o que ja esta aderente ao contrato da API e o que precisa ser alterado por divergencia de versao, lacuna de implementacao ou inconsistencias de tipagem/fluxo.

### Panorama rapido
- Cobertura funcional atual no frontend: **Auth/Login + CRUD de Alunos, Professores, Servidores e Disciplinas**.
- Modulos previstos no contrato e ausentes no consumo frontend: **Recover Password, Courses, Periods, Classrooms, Frequencias, Status**.
- Principais riscos encontrados: **parse de login divergente, busca de professor em rota antiga, IDs de update/delete possivelmente incorretos, tipagem legada (`user_data`) e uso de `any` no fluxo de gerenciamento**.

---

## 1) Objetivo e escopo da analise

1. Fonte de referencia: `docs/API_FRONTEND_CONTRATO.md`.
2. Escopo funcional auditado: camada `src/api`, `src/types`, `src/context`, `src/hooks` e componentes de cadastro/gerenciamento/login.
3. Definicao de status usada no relatorio:
   - `Aderente`
   - `Parcial`
   - `Divergente (versao antiga)`
   - `Nao implementado`

---

## 2) Inventario de modulos frontend auditados

1. `Auth/Login`
2. `Alunos`
3. `Professores`
4. `Usuarios/Servidores`
5. `Disciplinas`
6. `Gerenciamento/Listagem/Paginacao`
7. `Tipos e contratos TS`
8. `Schemas e formularios`

Evidencia de modulos de API existentes hoje: `src/api` possui apenas `aluno`, `disciplina`, `login`, `professor`, `usuario`.

---

## 3) Matriz de aderencia por modulo

### 3.1 Auth/Login

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| Endpoint de login `POST /api/login` consumido | `src/api/login/loginServices.ts:8-10` chama `api/login` | Aderente | Medio | Manter endpoint e padronizar contrato de retorno no service | Login continua autenticando sem regressao |
| Retorno de login deve ser tratado via `data` (contrato: `data: AuthLoginData`) | Contrato indica `data.access_token` em `docs/API_FRONTEND_CONTRATO.md:76,357`; frontend faz `setUserData(response)` em `src/components/login/containerLogin.tsx:38-39` | Divergente (versao antiga) | Alto | Criar parser no service/context para mapear `response.data` para objeto do contexto | Context recebe token/role a partir de `response.data` sem `any`/cast |
| Tipo `LoginResponse` do contexto | `src/context/loginUsersContext.tsx:27-33` espera `user`, `access_token`, `token_type` na raiz | Divergente (versao antiga) | Alto | Atualizar tipo para contrato real ou criar adaptador oficial | Tipagem do login compila e reflete payload real da API |
| Tratamento de 401 e limpeza de sessao | `src/lib/axiosInstance.ts:38-47` remove cookies em 401 | Parcial | Medio | Incluir estrategia de redirecionamento e feedback de expiracao de sessao | Em 401, usuario e redirecionado para login de forma consistente |
| Fluxo de recuperar senha (forgot/reset) | Toggle existe, mas `handleNewPassword` e vazio em `src/components/login/containerLogin.tsx:49-51` e nao ha services dedicados | Nao implementado | Alto | Implementar services e UI para `/forgot-password-code`, `/reset-password-validate-code`, `/reset-password-code` | Fluxo completo de recuperacao funciona ponta a ponta |

### 3.2 Alunos

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| CRUD basico (GET/POST/PUT/DELETE) | `src/api/aluno/alunoServices.ts` | Aderente | Medio | Manter endpoints e reforcar tipagem de response padrao | CRUD segue funcionando com tipos fortes |
| Tipo de retorno deve ser shape plano de `Aluno` | Contrato define `Aluno` plano em `docs/API_FRONTEND_CONTRATO.md:182+`; frontend usa `user_data` em `src/types/aluno.ts:4-25` | Divergente (versao antiga) | Alto | Refatorar `Aluno` para shape real do contrato | Lista/edicao sem dependencia de `user_data` |
| ID usado para update/delete do aluno | Em edicao usa `id_user` (`src/components/cadastrar/formularios/formAluno.tsx:37-38`); delete idem em `src/components/gerenciar/itemTable.tsx:92` | Divergente (versao antiga) | Alto | Passar a usar `id` da entidade aluno | Update/delete atuam no registro correto |
| Campos enviados fora do contrato atual (ex.: `turma`, `password`) | `turma` e senha no schema/form (`cadastroAlunoSchema.ts:65-73`, `formAluno.tsx:168-174`) | Parcial | Medio | Remover/normalizar campos legados ou documentar adaptador de payload | Payload enviado bate com contrato atual de `AlunoPayload` |
| Busca por alunos no gerenciamento | Nao ha busca dedicada por aluno no fluxo atual (busca centralizada em professor) | Nao implementado | Medio | Implementar busca por `api/alunos/value/{value}` no modulo aluno | Busca funciona por tipo de pagina (aluno) |

### 3.3 Professores

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| CRUD basico (GET/POST/PUT/DELETE) | `src/api/professor/professorServices.ts` | Aderente | Medio | Manter e tipar retorno com contrato global | CRUD permanece funcional e tipado |
| Busca de professor deve usar `/api/professors/value/{value}` | Frontend usa `/api/professors/search-name?nome=` em `src/api/professor/professorServices.ts:13`; contrato aponta rota oficial em `docs/API_FRONTEND_CONTRATO.md:320,670` | Divergente (versao antiga) | Alto | Trocar endpoint e ajustar parser de resposta da busca | Busca retorna resultados via endpoint oficial |
| Tipo de retorno de lista de professores | `GetProfessoresResponse` usa `TypeProfessorCadastro[]` em `src/types/professor.ts:27-30` | Parcial | Medio | Criar tipo de dominio `Professor` separado do payload de cadastro | Listagem usa tipo de leitura, cadastro usa tipo de escrita |
| ID usado para update/delete do professor | Form extrai `id_user` (`formProfessor.tsx:34-35`); delete usa fallback `id_user` em `itemTable.tsx:92` | Divergente (versao antiga) | Alto | Usar `id_professor` (ou id correto da entidade rota) | Update/delete professor sem erro de rota/registro |

### 3.4 Usuarios/Servidores

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| CRUD basico (GET/POST/PUT/DELETE) | `src/api/usuario/usuarioServices.ts` | Aderente | Medio | Manter e padronizar contratos de response | CRUD segue estavel |
| Tipo de retorno deve refletir shape plano de `Servidor` | Frontend usa `user_data` + `servidor_data` (`src/types/servidor.ts:27-52`) enquanto contrato define shape plano com `id_servidor` (`docs/API_FRONTEND_CONTRATO.md:176-179`) | Divergente (versao antiga) | Alto | Refatorar tipo de leitura para modelo real do backend | Telas de lista/edicao sem fallback legado |
| ID usado para update/delete servidor | Form usa `id_user` (`formUsuario.tsx:34-35`), itemTable usa `id_user` fallback (`itemTable.tsx:92`) | Divergente (versao antiga) | Alto | Usar id da entidade servidor para chamadas `api/servidors/{id}` | Operacoes mutaveis executam no recurso correto |
| Mensageria de sucesso/erro | Services usam `mensagem` em sucesso (`usuarioServices.ts:13,25`) e `message` em erro | Parcial | Medio | Padronizar leitura para `message` + fallback controlado | Toasters consistentes em todos os cenarios |

### 3.5 Disciplinas

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| CRUD basico (GET/POST/PUT/DELETE) | `src/api/disciplina/disciplinaServices.ts` | Aderente | Baixo | Manter endpoints | Operacoes continuam funcionais |
| Tipo `Disciplina` alinhado ao retorno real | Tipo inclui `created_at`/`updated_at` e `data_encerramento` obrigatoria (`src/types/disciplina.ts:9-15`), mas contrato nao garante esses campos e aceita `null` | Parcial | Medio | Ajustar tipo para contrato real (`data_encerramento: string | null`, sem campos inexistentes) | Sem erro de render/tipagem com responses reais |
| Mensageria padronizada | Usa `mensagem` em sucesso (`disciplinaServices.ts:13,25`) | Parcial | Medio | Padronizar `message` com fallback legado | Toasts usam uma regra unica |

### 3.6 Gerenciamento/Listagem/Paginacao

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| Busca deve respeitar tipo do modulo | Busca atual sempre chama professor (`mainGerenciar.tsx:15,43`) | Divergente (versao antiga) | Alto | Implementar estrategia por tipo (aluno/professor/usuario/disciplina) com endpoints `/value/{value}` | Campo buscar funciona para todos os modulos |
| Tipagem de fetch generico | Uso de `any` em `mainGerenciar.tsx:18` e `Record<..., Promise<any>>` em `api/services.ts:10` | Parcial | Medio | Criar map tipado por recurso e remover `any` critico | `tsc --noEmit` sem `any` em fluxo central |
| Tipos de paginacao devem suportar `from/to` nulos | `src/types/getRequestType.ts:16,21` usa `number` (nao nulo), contrato aceita `number | null` | Divergente (versao antiga) | Medio | Ajustar `ApiMeta.from` e `ApiMeta.to` para `number | null` | Paginacao sem quebra em paginas vazias |
| Normalizacao de dados na tabela | `itemTable.tsx:75-92` depende de `user_data` e fallback manual | Parcial | Medio | Centralizar normalizacao em adaptador de leitura por modulo | Tabela recebe shape consistente por tipo |

### 3.7 Tipos e contratos TS

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| Tipos base globais (`ApiSuccessResponse`, `ApiErrorResponse`, `ApiValidationErrorResponse`, `ApiPaginatedResponse`) | Nao existem no `src` (sem ocorrencias em busca), apenas no contrato | Nao implementado | Alto | Criar `src/types/api.ts` com contratos globais | Services e hooks usam contratos base compartilhados |
| Separacao entre tipo de leitura e tipo de escrita | Alguns modulos reutilizam tipo de cadastro para response (`src/types/professor.ts:27`) | Parcial | Medio | Definir `Professor`/`Servidor`/`Aluno` de leitura independentes de payloads | Menos cast e menos fallback no componente |
| Alinhamento de nomes/shape com contrato | Presenca forte de shape legado (`user_data`, `servidor_data`) | Divergente (versao antiga) | Alto | Migrar tipos e consumidores para shape plano atual | Tipos refletem retorno real da API |

### 3.8 Schemas e formularios

| Item do contrato | Implementacao atual | Status | Risco | O que alterar | Criterio de aceite |
|---|---|---|---|---|---|
| Schema alinhado a payload de aluno | `cadastroAlunoSchema` exige `turma` e senha/confirmacao (`cadastroAlunoSchema.ts:65-73`) | Divergente (versao antiga) | Medio | Ajustar schema para contrato atual e fluxo real de API | Formulario valida exatamente o payload esperado |
| Extracao de IDs nos forms de edicao | Aluno/professor/usuario extraem `id_user` (`formAluno.tsx:37-38`, `formProfessor.tsx:34-35`, `formUsuario.tsx:34-35`) | Divergente (versao antiga) | Alto | Mapear e persistir id de entidade correta por modulo | Edicoes usam endpoint com id correto |
| Normalizacao de payload antes de submit | Existe mapeamento manual e envio condicional em todos os forms | Parcial | Baixo | Manter, mas mover para utilitarios compartilhados por modulo | Menos duplicacao e menos divergencia entre forms |

---

## 4) Casos de versao diferente (obrigatorio)

1. **Busca de professor em rota antiga**
   - Atual: `/api/professors/search-name?nome=` (`src/api/professor/professorServices.ts:13`).
   - Contrato: `/api/professors/value/{value}` (`docs/API_FRONTEND_CONTRATO.md:320,670`).
   - Acao: trocar endpoint e padronizar busca por modulo.

2. **Tipos com shape antigo (`user_data`, `servidor_data`)**
   - Atual: `src/types/aluno.ts:4`, `src/types/servidor.ts:27-52`, consumo em `itemTable.tsx:75-92`.
   - Contrato: recursos planos (`docs/API_FRONTEND_CONTRATO.md:170-205`).
   - Acao: migrar tipos e componentes para shape plano.

3. **Mensageria inconsistente (`mensagem` vs `message`)**
   - Atual: sucesso por `mensagem` em services (`alunoServices.ts:13,25`, `usuarioServices.ts:13,25`, `disciplinaServices.ts:13,25`, `professorServices.ts:20,31`).
   - Contrato: padrao principal `message` e `mensagem` apenas em validacao 422 (`docs/API_FRONTEND_CONTRATO.md:22,69,671,673`).
   - Acao: unificar parser de mensagens com regra central.

4. **Fluxo de login com shape incompatível**
   - Atual: `setUserData(response)` (`containerLogin.tsx:39`) e tipo de contexto na raiz (`loginUsersContext.tsx:27-33`).
   - Contrato: dados de autenticacao em `data` (`docs/API_FRONTEND_CONTRATO.md:76,357`).
   - Acao: adaptar resposta no service/contexto.

5. **IDs de update/delete baseados em `id_user`**
   - Atual: forms e tabela usam `id_user` (`formAluno.tsx:37-38`, `formProfessor.tsx:34-35`, `formUsuario.tsx:34-35`, `itemTable.tsx:92`).
   - Contrato: perfis possuem IDs proprios (`id_professor`, `id_servidor`) e aluno usa `id` (`docs/API_FRONTEND_CONTRATO.md:170-179,182+`).
   - Acao: corrigir mapeamento de ID por entidade.

6. **Funcionalidades previstas no contrato e ausentes no frontend**
   - Ausentes no consumo atual: recover password, courses, periods, classrooms, frequencias, status.
   - Evidencia: `src/api` possui somente `aluno`, `disciplina`, `login`, `professor`, `usuario`.
   - Acao: registrar backlog por fase e implementar conforme prioridade.

---

## 5) Plano de alteracao por modulo (somente frontend)

### 5.1 Auth/Login
1. Criar adaptador de login no service para converter resposta real (`ApiSuccessResponse<AuthLoginData>`) para modelo do contexto.
2. Ajustar `LoginResponse` em `loginUsersContext.tsx` para shape oficial interno (ou DTO adaptado).
3. Implementar fluxo de recover password com tres services e telas de validacao/alteracao.
4. Tratar 422 (validacao e negocio) em camada unica de erro.

### 5.2 Professores
1. Trocar busca para `/api/professors/value/{value}`.
2. Separar `ProfessorResponse` (leitura) de `ProfessorPayload` (escrita).
3. Corrigir extracao e uso do ID da entidade professor em update/delete.

### 5.3 Usuarios/Servidores
1. Refatorar tipo de leitura para shape plano do contrato.
2. Corrigir ID usado em update/delete para id da entidade servidor.
3. Padronizar toasts para `message` (com fallback controlado legado).

### 5.4 Alunos
1. Refatorar tipo de leitura para shape plano.
2. Revisar e reduzir payload enviado no form para aderencia contratual (remover legado nao suportado).
3. Corrigir ID de update/delete para `aluno.id`.
4. Implementar busca de aluno por endpoint oficial `/api/alunos/value/{value}`.

### 5.5 Disciplinas
1. Ajustar tipo `Disciplina` para campos realmente retornados.
2. Padronizar parser de mensagens de sucesso/erro.

### 5.6 Gerenciamento/Paginacao
1. Tornar busca dependente do modulo ativo.
2. Remover `any` do fluxo central (`mainGerenciar`, `dataFetchers`, `useGerenciarData`).
3. Atualizar tipos de paginacao para `from/to` nulos.
4. Criar adaptadores por modulo para normalizacao de dados de tabela.

---

## 6) Mudancas importantes em APIs/interfaces/types publicas (frontend)

1. Adotar tipos base globais em `src/types/api.ts`:
   - `ApiSuccessResponse<T>`
   - `ApiErrorResponse`
   - `ApiValidationErrorResponse`
   - `ApiPaginatedResponse<T>`
2. Refatorar tipos de dominio para leitura real de API (`Aluno`, `Professor`, `Servidor`, `Disciplina`).
3. Separar definitivamente tipos de `payload` (POST/PUT) de tipos de `response` (GET).
4. Criar adaptadores de resposta por modulo em `src/api/*` para proteger componentes de mudancas de contrato.
5. Definir regra unica de mensagem:
   - sucesso/erro de negocio: `message`
   - validacao 422: `mensagem`
   - fallback legado temporario: `message ?? mensagem`

---

## 7) Testes e cenarios de validacao

### 7.1 Validacao do relatorio
1. Todos os 8 modulos auditados devem estar presentes com status.
2. Cada divergencia relevante deve conter acao objetiva e criterio de aceite.
3. Os 6 casos obrigatorios de versao diferente devem estar explicitamente documentados.

### 7.2 Cenarios de aceite tecnico (apos ajustes)
1. Login autentica e popula contexto sem cast inseguro e com shape consistente.
2. Busca de professor usa endpoint oficial e retorna dados corretamente em tela.
3. Listagens renderizam com tipagem aderente a `ApiPaginatedResponse<T>`.
4. Update/delete usam o ID correto da entidade em cada modulo.
5. Toasters e tratamento de erro seguem regra unica de mensagens.
6. Modulos ausentes do contrato entram em backlog explicito com prioridade definida.

---

## 8) Assumptions e defaults

1. `docs/API_FRONTEND_CONTRATO.md` e a fonte oficial para comparacao.
2. Este documento e apenas de analise/plano; nao altera codigo fonte.
3. Escopo limitado ao frontend (impactos de backend aparecem como dependencia externa, sem proposta de alteracao server-side aqui).
4. Arquivo separado foi adotado para manter o contrato oficial limpo e usar este documento como plano de execucao.

---

## Anexo A - Backlog de funcionalidades do contrato nao consumidas no frontend

1. Recover password:
   - `POST /api/forgot-password-code`
   - `POST /api/reset-password-validate-code`
   - `POST /api/reset-password-code`
2. Courses:
   - `GET/POST/PUT/DELETE /api/courses...`
3. Periods:
   - `GET /api/periods`, `GET /api/periods/{period}`, `GET /api/periods/show-periods-for-course/{period}`
4. Classrooms:
   - `GET/POST/DELETE /api/classrooms...`, `GET /api/periods/{period}/generate-classrooms`, `GET /api/classrooms/show-classroom-for-period/{classroom}`
5. Frequencias (stub no backend, mas ainda nao consumido no frontend):
   - resource em `/api/frequencias`
6. Status:
   - `GET /api/status`

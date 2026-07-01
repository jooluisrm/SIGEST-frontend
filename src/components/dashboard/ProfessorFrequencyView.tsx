"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOfertaDisciplinaList } from "@/hooks/queries/ofertaDisciplina";
import { useTurmaList } from "@/hooks/queries/turma";
import { AppInput } from "@/components/shared/app-input";
import { Disciplina } from "@/types/disciplina";
import { Frequencia } from "@/types/frequencia";
import { OfertaDisciplina } from "@/types/oferta-disciplina";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Classroom } from "@/types/classroom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import { ActionDialog } from "@/components/gerenciar/actionDialog";
import { AlertDialogComponent } from "@/components/shared/alertComponent";
import { PaginationTable } from "@/components/gerenciar/paginationTable";

type Props = { disciplina: Disciplina; onBack: () => void };

type FrequencyItem = Frequencia & {
  situacao?: boolean | 0 | 1;
  justificativa?: string | null;
  __matriculaDisciplina?: {
    matricula?: {
      codigo_matricula?: string;
      aluno?: {
        name?: string;
        nome?: string;
      };
    };
    oferta_disciplina?: {
      classroom?: {
        name?: string;
      };
    };
  };
};

type SessionGroup = {
  key: string;
  data: string;
  turma: string;
  disciplina: string;
  conteudo: string;
  items: FrequencyItem[];
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const dateStr = value.length === 10 ? `${value}T12:00:00` : value;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const normalizeDateKey = (value?: string) => value?.slice(0, 10) ?? "";

const getPresenceLabel = (item: FrequencyItem) => {
  if (item.situacao === true || item.situacao === 1) return { label: "P", className: "text-green-600" };
  if (item.justificativa) return { label: "J", className: "text-orange-500" };
  return { label: "F", className: "text-red-600" };
};

export const ProfessorFrequencyView = ({ disciplina, onBack }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [frequencias, setFrequencias] = useState<FrequencyItem[]>([]);
  const [page, setPage] = useState(1);

  const ofertasQuery = useOfertaDisciplinaList();
  const turmasQuery = useTurmaList();

  const ofertasDaDisciplina = useMemo(() => {
    const ofertas = ofertasQuery.data?.data ?? [];
    return ofertas.filter((oferta: OfertaDisciplina) => oferta.disciplina?.id === disciplina.id);
  }, [ofertasQuery.data?.data, disciplina.id]);

  const turmaNomePorOferta = useMemo(() => {
    const turmaMap = new Map<number, string>();
    (turmasQuery.data?.data ?? []).forEach((turma: Classroom) => {
      turmaMap.set(turma.id, turma.name);
    });
    return (oferta: OfertaDisciplina) => {
      const turmaId = oferta.classroom?.id ?? (oferta as OfertaDisciplina & { classroom_id?: number })?.classroom_id;
      return turmaId ? turmaMap.get(turmaId) ?? `Turma ${turmaId}` : "-";
    };
  }, [turmasQuery.data?.data]);

  const loadFrequenciasDaMatricula = useCallback(async (matriculaDisciplinaId: number) => {
    const frequencias: FrequencyItem[] = [];
    let page = 1;

    while (true) {
      const frequenciasResponse = await axiosInstance.get(
        `frequencias/matricula-disciplina/${matriculaDisciplinaId}?page=${page}`
      );
      const frequenciasPayload = frequenciasResponse.data?.data ?? frequenciasResponse.data;
      const list = Array.isArray(frequenciasPayload) ? frequenciasPayload : frequenciasPayload?.data ?? [];

      frequencias.push(...list);

      const lastPage = frequenciasResponse.data?.meta?.last_page ?? frequenciasPayload?.meta?.last_page ?? 1;
      if (page >= lastPage) {
        break;
      }

      page += 1;
    }

    return frequencias;
  }, []);

  const loadMatriculasDaOferta = useCallback(async (ofertaId: number) => {
    const matriculas: { id: number }[] = [];
    let page = 1;

    while (true) {
      const response = await axiosInstance.get(`matricula-disciplinas/oferta/${ofertaId}?page=${page}`);
      const payload = response.data?.data ?? response.data;
      const list = Array.isArray(payload) ? payload : payload?.data ?? [];

      matriculas.push(...list);

      const lastPage = response.data?.meta?.last_page ?? payload?.meta?.last_page ?? 1;
      if (page >= lastPage) {
        break;
      }

      page += 1;
    }

    return matriculas;
  }, []);

  const loadFrequencias = useCallback(async () => {
    if (!ofertasDaDisciplina.length) {
      setFrequencias([]);
      return;
    }

    try {
      const lists = await Promise.all(
        ofertasDaDisciplina.map(async (oferta) => {
          const matriculas = await loadMatriculasDaOferta(oferta.id);

          const frequenciasPorOferta = await Promise.all(
            matriculas.map(async (item: { id: number; matricula?: { codigo_matricula?: string; aluno?: { name?: string; nome?: string } } }) => {
              const frequenciasDaMatricula = await loadFrequenciasDaMatricula(item.id);
              return frequenciasDaMatricula.map((freq) => ({
                ...freq,
                __matriculaDisciplina: {
                  matricula: item.matricula,
                  oferta_disciplina: {
                    classroom: {
                      name: turmaNomePorOferta(oferta),
                    },
                  },
                },
              }));
            })
          );

          return frequenciasPorOferta.flat();
        })
      );

      setFrequencias(lists.flat());
    } catch {
      setFrequencias([]);
    }
  }, [loadFrequenciasDaMatricula, loadMatriculasDaOferta, ofertasDaDisciplina]);

  useEffect(() => {
    void loadFrequencias();
  }, [loadFrequencias]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "frequencia:refresh") {
        void loadFrequencias();
      }
    };

    const onRefreshEvent = () => {
      void loadFrequencias();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onRefreshEvent);
    window.addEventListener("frequencia:refresh", onRefreshEvent as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onRefreshEvent);
      window.removeEventListener("frequencia:refresh", onRefreshEvent as EventListener);
    };
  }, [loadFrequencias]);

  const groupedSessions = useMemo<SessionGroup[]>(() => {
    const map = new Map<string, SessionGroup>();
    frequencias.forEach((item) => {
      const data = normalizeDateKey(item.data_aula ?? item.data);
      const conteudo = item.conteudo_trabalhado ?? item.conteudo ?? "-";
      const matriculaDisciplina = (item.matricula_disciplina ?? item.__matriculaDisciplina) as
        | {
            oferta_disciplina?: {
              classroom?: { name?: string };
            };
          }
        | undefined;
      const turmaNome = matriculaDisciplina?.oferta_disciplina?.classroom?.name ?? "-";
      const key = `${data}-${turmaNome}-${conteudo}`;
      const current = map.get(key);
      if (!current) {
        map.set(key, {
          key,
          data,
          turma: turmaNome,
          disciplina: disciplina.nome ?? disciplina.name ?? "-",
          conteudo,
          items: [item],
        });
      } else {
        current.items.push(item);
      }
    });

    return Array.from(map.values()).sort((a, b) => b.data.localeCompare(a.data));
  }, [disciplina.name, disciplina.nome, frequencias]);

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groupedSessions;
    return groupedSessions.filter((group) =>
      [group.data, group.turma, group.disciplina, group.conteudo].join(" ").toLowerCase().includes(q)
    );
  }, [groupedSessions, search]);

  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pagedGroups = filteredGroups.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => {
    setPage(1);
  }, [search, disciplina.id]);

  const handleDeleteGroup = async (group: SessionGroup) => {
    try {
      await Promise.all(group.items.map((item) => axiosInstance.delete(`frequencias/${item.id}`)));
      toast.success("Lista de presença excluída com sucesso.");
      setFrequencias((current) =>
        current.filter((item) => {
          const itemData = normalizeDateKey(item.data_aula ?? item.data);
          const itemConteudo = item.conteudo_trabalhado ?? item.conteudo ?? "-";
          const itemTurma = ((item.matricula_disciplina ?? item.__matriculaDisciplina) as
            | {
                oferta_disciplina?: {
                  classroom?: { name?: string };
                };
              }
            | undefined)?.oferta_disciplina?.classroom?.name ?? "-";
          return !(itemData === group.data && itemConteudo === group.conteudo && itemTurma === group.turma);
        })
      );
    } catch {
      toast.error("Não foi possível excluir a lista.");
    }
  };

  const paginationMeta = {
    current_page: currentPage,
    from: filteredGroups.length ? (currentPage - 1) * perPage + 1 : null,
    last_page: totalPages,
    links: [
      { url: null, label: "Anterior", active: false },
      ...Array.from({ length: totalPages }, (_, index) => ({
        url: `?page=${index + 1}`,
        label: String(index + 1),
        active: index + 1 === currentPage,
      })),
      { url: null, label: "Próximo", active: false },
    ],
    path: "",
    per_page: perPage,
    to: filteredGroups.length ? Math.min(currentPage * perPage, filteredGroups.length) : null,
    total: filteredGroups.length,
  } as any;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-5 pt-10 min-h-screen">
        <Card>
          <CardHeader className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Button size="icon" className="bg-primaria" onClick={onBack}>
                <ArrowLeft />
              </Button>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">Cadastrar Frequência</h1>
            </div>
            <Button className="bg-primaria text-lg" onClick={() => router.push(`/frequencia/registrar/${disciplina.id}`)}>
              <Plus />
              Registrar Frequência
            </Button>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-lg font-semibold">{`${filteredGroups.length} Registros de Frequência`}</h2>
              <div className="relative flex w-full items-center md:w-64">
                <AppInput
                  className="border-primaria pl-10"
                  placeholder="Buscar"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  intent="formCamp"
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>

            <div className="overflow-x-auto py-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Turma</TableHead>
                    <TableHead>Disciplina</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead>Presença</TableHead>
                    <TableHead className="w-24 text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedGroups.map((group) => {
                    const present = group.items.filter((item) => item.situacao === true || item.situacao === 1).length;
                    const absent = group.items.filter((item) => item.situacao === false || item.situacao === 0).length;
                    const justified = group.items.filter((item) => item.justificativa && (item.situacao === false || item.situacao === 0)).length;
                    const unexcused = Math.max(0, absent - justified);
                    const percent = group.items.length ? Math.round(((present + justified) / group.items.length) * 100) : 0;

                    return (
                      <TableRow key={group.key}>
                        <TableCell>{formatDate(group.data)}</TableCell>
                        <TableCell>{group.turma}</TableCell>
                        <TableCell>{group.disciplina}</TableCell>
                        <TableCell>{group.conteudo}</TableCell>
                        <TableCell className="font-medium">
                          <span className="text-green-600">{present}P</span> /{" "}
                          <span className="text-red-600">{unexcused}F</span> /{" "}
                          <span className="text-orange-500">{justified}J</span>{" "}
                          <span className="ml-2">({percent}%)</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <ActionDialog
                              triggerIcon="view"
                              triggerTooltip="Visualizar frequência"
                              triggerClassName="bg-secundaria1"
                              dialogTitle="Detalhes da Lista de Presença"
                            >
                              {() => (
                                <div className="overflow-hidden rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Aluno</TableHead>
                                        <TableHead>Matrícula</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Justificativa</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {group.items.map((item) => {
                                        const aluno =
                                          item.matricula_disciplina?.matricula?.aluno?.name ??
                                          item.matricula_disciplina?.matricula?.aluno?.nome ??
                                          item.matricula_disciplina?.matricula?.codigo_matricula ??
                                          "-";
                                        const matricula = item.matricula_disciplina?.matricula?.codigo_matricula ?? "-";
                                        const presence = getPresenceLabel(item);
                                        return (
                                          <TableRow key={item.id}>
                                            <TableCell>{aluno}</TableCell>
                                            <TableCell>{matricula}</TableCell>
                                            <TableCell className={presence.className}>{presence.label}</TableCell>
                                            <TableCell>{item.justificativa ?? "-"}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </ActionDialog>
                            <ActionDialog
                              triggerIcon="edit"
                              triggerTooltip="Editar frequência"
                              triggerClassName="bg-secundaria"
                              dialogTitle="Editar Lista de Presença"
                            >
                              {() => (
                                <div className="space-y-4 p-2">
                                  <p className="text-sm text-muted-foreground">
                                    A edição completa da lista e dos presentes pode ser integrada aqui.
                                  </p>
                                </div>
                              )}
                            </ActionDialog>
                            <AlertDialogComponent
                              triggerIcon="delete"
                              triggerTooltip="Excluir frequência"
                              triggerClassName="bg-red-500"
                              dialogTitle="Excluir Lista de Presença"
                              dialogDescription="Tem certeza que deseja excluir esta lista de presença? Esta ação não poderá ser desfeita."
                              onConfirm={() => handleDeleteGroup(group)}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {!pagedGroups.length && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                        Nenhum registro de frequência encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredGroups.length > perPage && (
              <PaginationTable
                meta={paginationMeta}
                onPageChange={(url) => {
                  const match = url.match(/[?&]page=(\d+)/);
                  if (match) {
                    setPage(Number(match[1]));
                  }
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

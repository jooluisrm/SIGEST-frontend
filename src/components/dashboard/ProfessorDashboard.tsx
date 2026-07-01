"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useUser } from "@/context/loginUsersContext";
import { useAvaliacaoList } from "@/hooks/queries/avaliacao";
import { useDisciplinaList } from "@/hooks/queries/disciplina";
import { useFrequenciaList } from "@/hooks/queries/frequencia";
import { useOfertaDisciplinaList } from "@/hooks/queries/ofertaDisciplina";
import { Disciplina } from "@/types/disciplina";
import { Frequencia } from "@/types/frequencia";
import { OfertaDisciplina } from "@/types/oferta-disciplina";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axiosInstance from "@/lib/axiosInstance";
import { ProfessorEvaluationView } from "./ProfessorEvaluationView";
import { ProfessorFrequencyView } from "./ProfessorFrequencyView";

type ProfessorPanel = "home" | "frequency" | "evaluation" | "info";

const getClassroomLabel = (disciplina: Disciplina) => (disciplina.classroom_id ? `Turma ${disciplina.classroom_id}` : "-");
const getPeriodLabel = (disciplina: Disciplina) => disciplina.unidade ?? disciplina.sigla ?? "-";
const percent = (value: number, total: number) => (total ? Math.min(100, Math.round((value / total) * 100)) : 0);

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <p className="text-xl font-semibold text-zinc-600">{label}</p>
    <div className="h-8 overflow-hidden rounded bg-zinc-200">
      <div
        className="flex h-full min-w-12 items-center rounded bg-primaria px-2 text-sm font-bold text-white"
        style={{ width: `${Math.max(value, 8)}%` }}
      >
        {value}%
      </div>
    </div>
  </div>
);

type StudentInfo = {
  id: number;
  name: string;
  enrollmentCode: string;
};

type ActivityInfo = {
  id: number;
  title: string;
  maxScore: number;
};

const extractScoreNum = (raw: any): number => {
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const match = raw.match(/(\d+(?:[.,]\d+)?)/);
    return match ? Number(match[1].replace(",", ".")) : 0;
  }
  return 0;
};

const DisciplineGradesSection = ({ ofertaId }: { ofertaId: number }) => {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [grades, setGrades] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Students
        const matriculasRes = await axiosInstance.get(`matricula-disciplinas/oferta/${ofertaId}`);
        const matriculasPayload = matriculasRes.data?.data ?? matriculasRes.data;
        const studentsList = (Array.isArray(matriculasPayload) ? matriculasPayload : matriculasPayload?.data ?? []).map((m: any) => ({
          id: m.id,
          name: m.matricula?.aluno?.name ?? m.matricula?.aluno?.nome ?? "-",
          enrollmentCode: m.matricula?.codigo_matricula ?? "-",
        }));

        // Fetch Activities
        const atividadesRes = await axiosInstance.get(`atividades/oferta/${ofertaId}`);
        const atividadesPayload = atividadesRes.data?.data ?? atividadesRes.data;
        const activitiesList = (Array.isArray(atividadesPayload) ? atividadesPayload : atividadesPayload?.data ?? []).map((a: any) => ({
          id: a.id,
          title: a.titulo ?? a.title ?? "-",
          maxScore: extractScoreNum(a.pontuacao_maxima ?? a.max_pontos ?? a.valor ?? a.descricao),
        }));

        // Fetch Grades for each activity
        const gradesMap: Record<string, number> = {};
        await Promise.all(activitiesList.map(async (act: ActivityInfo) => {
          try {
            const gradesRes = await axiosInstance.get(`nota-atividades/atividade/${act.id}`);
            const gradesPayload = gradesRes.data?.data ?? gradesRes.data;
            const gradesList = Array.isArray(gradesPayload) ? gradesPayload : gradesPayload?.data ?? [];
            gradesList.forEach((g: any) => {
              const studentId = g.matricula_disciplina_id;
              if (studentId) {
                gradesMap[`${studentId}-${act.id}`] = Number(g.nota ?? 0);
              }
            });
          } catch (err) {
            console.error("Error fetching grades for activity", act.id, err);
          }
        }));

        setStudents(studentsList);
        setActivities(activitiesList);
        setGrades(gradesMap);
      } catch (err) {
        console.error("Error fetching discipline info data", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [ofertaId]);

  if (loading) {
    return <div className="text-center py-6 text-zinc-500">Carregando alunos e notas...</div>;
  }

  if (students.length === 0) {
    return <div className="text-center py-6 text-zinc-500">Nenhum aluno matriculado nesta disciplina.</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-zinc-700">Alunos e Notas</h3>
      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Aluno</TableHead>
              <TableHead>Matrícula</TableHead>
              {activities.map((act) => (
                <TableHead key={act.id} className="text-center">
                  {act.title}
                </TableHead>
              ))}
              <TableHead className="text-right font-bold">Nota Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              let total = 0;
              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.enrollmentCode}</TableCell>
                  {activities.map((act) => {
                    const grade = grades[`${student.id}-${act.id}`];
                    if (grade !== undefined) {
                      total += grade;
                    }
                    return (
                      <TableCell key={act.id} className="text-center">
                        {grade !== undefined ? grade : "-"}
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-right font-bold text-primaria">{total.toFixed(1)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const ProfessorDashboard = () => {
  const { user } = useUser();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [panel, setPanel] = useState<ProfessorPanel>("home");

  const disciplinasQuery = useDisciplinaList();
  const ofertasQuery = useOfertaDisciplinaList();
  const frequenciasQuery = useFrequenciaList();
  const avaliacoesQuery = useAvaliacaoList();

  const disciplinas = useMemo(() => {
    const list = disciplinasQuery.data?.data ?? [];
    const ofertas = ofertasQuery.data?.data ?? [];
    const disciplinaIds = new Set<number>();
    ofertas.forEach((oferta: OfertaDisciplina) => {
      const professorId =
        oferta.professor?.id_user ?? (oferta as OfertaDisciplina & { professor_id?: number }).professor_id;
      const disciplinaId = oferta.disciplina?.id ?? (oferta as OfertaDisciplina & { disciplina_id?: number }).disciplina_id;

      if (professorId === user?.id && disciplinaId) {
        disciplinaIds.add(disciplinaId);
      }
    });

    return list.filter((disciplina) => disciplinaIds.has(disciplina.id));
  }, [disciplinasQuery.data?.data, ofertasQuery.data?.data, user?.id]);

  const openPanel = (nextPanel: ProfessorPanel, disciplina: Disciplina) => {
    setSelectedDisciplina(disciplina);
    setPanel(nextPanel);
  };

  const handleBack = () => {
    setPanel("home");
    setSelectedDisciplina(null);
  };

  const selectedStats = useMemo(() => {
    if (!selectedDisciplina && !expandedId) return { evaluationPercent: 0, classPercent: 0 };

    const disciplinaId = selectedDisciplina?.id ?? expandedId;
    const avaliacoes = (avaliacoesQuery.data?.data ?? []).filter((avaliacao) => avaliacao.disciplina_id === disciplinaId);
    const frequencias = (frequenciasQuery.data?.data ?? []).filter((frequencia) => {
      const matriculaDisciplina = frequencia.matricula_disciplina as
        | {
            oferta_disciplina?: {
              disciplina?: {
                id?: number;
              };
              disciplina_id?: number;
            };
          }
        | undefined;
      const nestedDisciplinaId =
        matriculaDisciplina?.oferta_disciplina?.disciplina?.id ?? matriculaDisciplina?.oferta_disciplina?.disciplina_id;

      return nestedDisciplinaId === disciplinaId;
    });
    const pontos = avaliacoes.reduce((total, avaliacao) => total + Number(avaliacao.pontuacao_maxima ?? avaliacao.max_pontos ?? avaliacao.valor ?? 0), 0);
    return {
      evaluationPercent: percent(pontos, 100),
      classPercent: percent(frequencias.length, 20),
    };
  }, [avaliacoesQuery.data?.data, expandedId, frequenciasQuery.data?.data, selectedDisciplina]);

  const ofertaDaDisciplina = useMemo(() => {
    if (!selectedDisciplina) return null;
    const ofertas = ofertasQuery.data?.data ?? [];
    return ofertas.find((oferta: OfertaDisciplina) => {
      const professorId =
        oferta.professor?.id_user ?? (oferta as OfertaDisciplina & { professor_id?: number }).professor_id;
      const disciplinaId = oferta.disciplina?.id ?? (oferta as OfertaDisciplina & { disciplina_id?: number }).disciplina_id;
      return professorId === user?.id && disciplinaId === selectedDisciplina.id;
    });
  }, [ofertasQuery.data?.data, selectedDisciplina, user?.id]);

  if (panel === "frequency" && selectedDisciplina) return <ProfessorFrequencyView disciplina={selectedDisciplina} onBack={handleBack} />;
  if (panel === "evaluation" && selectedDisciplina) return <ProfessorEvaluationView disciplina={selectedDisciplina} onBack={handleBack} />;

  if (panel === "info" && selectedDisciplina) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Button size="icon" className="bg-primaria" onClick={handleBack}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">Informações da Disciplina</h1>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">{selectedDisciplina.nome ?? selectedDisciplina.name}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <p><strong>Código:</strong> {selectedDisciplina.id}</p>
            <p><strong>Carga Horária:</strong> {selectedDisciplina.carga_horaria}</p>
            <p><strong>Turma:</strong> {getClassroomLabel(selectedDisciplina)}</p>
            <p><strong>Período:</strong> {getPeriodLabel(selectedDisciplina)}</p>
            <p className="md:col-span-2"><strong>Ementa:</strong> {selectedDisciplina.ementa ?? "-"}</p>
          </div>
        </div>
        {ofertaDaDisciplina && (
          <DisciplineGradesSection ofertaId={ofertaDaDisciplina.id} />
        )}
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Button size="icon" className="bg-primaria" aria-label="Voltar">
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold md:text-4xl">Bem vindo {user?.nome ?? "Professor"}</h1>
      </div>

      <div className="rounded-lg bg-white p-5 shadow-sm md:p-8">
        <h2 className="mb-8 text-3xl font-bold">Disciplinas</h2>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código Disciplina</TableHead>
                <TableHead>Nome Disciplina</TableHead>
                <TableHead>Carga Horária</TableHead>
                <TableHead>Período</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {disciplinas.map((disciplina) => {
                const isExpanded = expandedId === disciplina.id;
                return (
                  <Fragment key={disciplina.id}>
                    <TableRow>
                      <TableCell className="font-semibold">{disciplina.id}</TableCell>
                      <TableCell>{disciplina.nome ?? disciplina.name}</TableCell>
                      <TableCell>{disciplina.carga_horaria}</TableCell>
                      <TableCell>{getPeriodLabel(disciplina)}</TableCell>
                      <TableCell>
                        <button type="button" className="text-primaria" onClick={() => setExpandedId(isExpanded ? null : disciplina.id)}>
                          {isExpanded ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={5} className="whitespace-normal bg-zinc-50 p-8">
                          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                            <div className="flex items-center justify-center grid gap-5 md:grid-cols-3">
                              <Button className="h-[80%] rounded-lg bg-primaria text-2xl font-bold" onClick={() => openPanel("frequency", disciplina)}>
                                Frequência
                              </Button>
                              <Button className="h-[80%] rounded-lg bg-primaria text-2xl font-bold" onClick={() => openPanel("evaluation", disciplina)}>
                                Avaliações
                              </Button>
                              <Button className="h-[80%] rounded-lg bg-primaria text-2xl font-bold" onClick={() => openPanel("info", disciplina)}>
                                <Info />
                                Informações
                              </Button>
                            </div>
                            <aside className="space-y-6">
                              <h3 className="text-3xl font-bold text-zinc-600">Estatísticas</h3>
                              <StatBar label="Pontos distribuídos" value={selectedStats.evaluationPercent} />
                              <StatBar label="Aulas lançadas" value={selectedStats.classPercent} />
                            </aside>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
              {!disciplinas.length && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Nenhuma disciplina vinculada ao professor logado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

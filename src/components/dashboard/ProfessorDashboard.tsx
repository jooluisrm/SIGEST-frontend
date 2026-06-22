"use client";

import { Fragment, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useUser } from "@/context/loginUsersContext";
import { useAvaliacaoList } from "@/hooks/queries/avaliacao";
import { useDisciplinaList } from "@/hooks/queries/disciplina";
import { useFrequenciaList } from "@/hooks/queries/frequencia";
import { useProfessorList } from "@/hooks/queries/professor";
import { Disciplina } from "@/types/disciplina";
import { Frequencia } from "@/types/frequencia";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProfessorEvaluationView } from "./ProfessorEvaluationView";
import { ProfessorFrequencyView } from "./ProfessorFrequencyView";

type ProfessorPanel = "home" | "frequency" | "evaluation" | "info";

const getClassroomLabel = (disciplina: Disciplina) =>
  disciplina.classroom_id ? `Turma ${disciplina.classroom_id}` : "-";

const getPeriodLabel = (disciplina: Disciplina) =>
  disciplina.unidade ?? disciplina.sigla ?? "-";

const countFrequenciaEntries = (frequencia: Frequencia) =>
  (frequencia.presencas ?? frequencia.alunos ?? []).length;

const percent = (value: number, total: number) =>
  total ? Math.min(100, Math.round((value / total) * 100)) : 0;

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

export const ProfessorDashboard = () => {
  const { user } = useUser();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [panel, setPanel] = useState<ProfessorPanel>("home");

  const professoresQuery = useProfessorList();
  const disciplinasQuery = useDisciplinaList();
  const frequenciasQuery = useFrequenciaList();
  const avaliacoesQuery = useAvaliacaoList();

  const professor = useMemo(() => {
    const professores = professoresQuery.data?.data ?? [];
    return professores.find((item) => item.id_user === user?.id);
  }, [professoresQuery.data?.data, user?.id]);

  const disciplinas = useMemo(() => {
    const list = disciplinasQuery.data?.data ?? [];
    if (!professor?.id_professor) {
      return [];
    }

    return list.filter((disciplina) => disciplina.professor_id === professor.id_professor);
  }, [disciplinasQuery.data?.data, professor?.id_professor]);

  const openPanel = (nextPanel: ProfessorPanel, disciplina: Disciplina) => {
    setSelectedDisciplina(disciplina);
    setPanel(nextPanel);
  };

  const handleBack = () => {
    setPanel("home");
    setSelectedDisciplina(null);
  };

  const selectedStats = useMemo(() => {
    if (!selectedDisciplina && !expandedId) {
      return { evaluationPercent: 0, classPercent: 0 };
    }

    const disciplinaId = selectedDisciplina?.id ?? expandedId;
    const avaliacoes = (avaliacoesQuery.data?.data ?? []).filter(
      (avaliacao) => avaliacao.disciplina_id === disciplinaId
    );
    const frequencias = (frequenciasQuery.data?.data ?? []).filter(
      (frequencia) => frequencia.disciplina_id === disciplinaId
    );
    const pontos = avaliacoes.reduce(
      (total, avaliacao) =>
        total +
        Number(avaliacao.pontuacao_maxima ?? avaliacao.max_pontos ?? avaliacao.valor ?? 0),
      0
    );
    const aulas = frequencias.length;

    return {
      evaluationPercent: percent(pontos, 100),
      classPercent: percent(aulas, 20),
    };
  }, [
    avaliacoesQuery.data?.data,
    expandedId,
    frequenciasQuery.data?.data,
    selectedDisciplina,
  ]);

  if (panel === "frequency" && selectedDisciplina) {
    return <ProfessorFrequencyView disciplina={selectedDisciplina} onBack={handleBack} />;
  }

  if (panel === "evaluation" && selectedDisciplina) {
    return <ProfessorEvaluationView disciplina={selectedDisciplina} onBack={handleBack} />;
  }

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
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <Button size="icon" className="bg-primaria" aria-label="Voltar">
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold md:text-4xl">
          Bem vindo {user?.nome ?? "Professor"}
        </h1>
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
                        <button
                          type="button"
                          className="text-primaria"
                          onClick={() => setExpandedId(isExpanded ? null : disciplina.id)}
                        >
                          {isExpanded ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={5} className="whitespace-normal bg-zinc-50 p-8">
                          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                            <div className="grid gap-5 md:grid-cols-3">
                              <Button
                                className="h-32 rounded-lg bg-primaria text-2xl font-bold"
                                onClick={() => openPanel("frequency", disciplina)}
                              >
                                Frequência
                              </Button>
                              <Button
                                className="h-32 rounded-lg bg-primaria text-2xl font-bold"
                                onClick={() => openPanel("evaluation", disciplina)}
                              >
                                Avaliações
                              </Button>
                              <Button
                                className="h-32 rounded-lg bg-primaria text-2xl font-bold"
                                onClick={() => openPanel("info", disciplina)}
                              >
                                <Info />
                                Informações
                              </Button>
                            </div>
                            <aside className="space-y-6">
                              <h3 className="text-3xl font-bold text-zinc-600">Estatísticas</h3>
                              <StatBar
                                label="Pontos distribuídos"
                                value={selectedStats.evaluationPercent}
                              />
                              <StatBar
                                label="Aulas lançadas"
                                value={selectedStats.classPercent}
                              />
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

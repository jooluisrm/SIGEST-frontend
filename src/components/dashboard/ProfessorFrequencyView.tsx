"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useAlunoList } from "@/hooks/queries/aluno";
import { useCreateFrequencia, useFrequenciaList } from "@/hooks/queries/frequencia";
import { useTurmaList } from "@/hooks/queries/turma";
import { Aluno } from "@/types/aluno";
import { Classroom } from "@/types/classroom";
import { Disciplina } from "@/types/disciplina";
import { Frequencia, FrequenciaStatus } from "@/types/frequencia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = { disciplina: Disciplina; onBack: () => void };

const getFrequencyDate = (frequencia: Frequencia) => frequencia.data_aula ?? frequencia.data ?? "-";
const getFrequencyContent = (frequencia: Frequencia) => frequencia.conteudo_trabalhado ?? frequencia.conteudo ?? "-";

const summarizePresence = (frequencia: Frequencia) => {
  const entries = frequencia.presencas ?? frequencia.alunos ?? [];
  const total = entries.length;
  const present = entries.filter((entry) => entry.status === "P").length;
  const absent = entries.filter((entry) => entry.status === "F").length;
  const justified = entries.filter((entry) => entry.status === "J").length;
  const percent = total ? Math.round((present / total) * 100) : 0;
  return { present, absent, justified, percent };
};

export const ProfessorFrequencyView = ({ disciplina, onBack }: Props) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [classroomId, setClassroomId] = useState(disciplina.classroom_id ? String(disciplina.classroom_id) : "");
  const [content, setContent] = useState("");
  const [attendance, setAttendance] = useState<Record<number, FrequenciaStatus>>({});
  const frequenciasQuery = useFrequenciaList();
  const alunosQuery = useAlunoList();
  const turmasQuery = useTurmaList();
  const createFrequencia = useCreateFrequencia();

  const turmas = turmasQuery.data?.data ?? [];
  const selectedClassroomId = Number(classroomId);
  const selectedClassroom = turmas.find((turma) => turma.id === selectedClassroomId);

  const disciplinaFrequencias = useMemo(() => (frequenciasQuery.data?.data ?? []).filter((frequencia) => frequencia.disciplina_id === disciplina.id), [disciplina.id, frequenciasQuery.data?.data]);
  const filteredFrequencias = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return disciplinaFrequencias;
    return disciplinaFrequencias.filter((frequencia) => [getFrequencyDate(frequencia), frequencia.turma, getFrequencyContent(frequencia)].join(" ").toLowerCase().includes(normalizedSearch));
  }, [disciplinaFrequencias, search]);
  const alunosDaTurma = useMemo(() => {
    const alunos = alunosQuery.data?.data ?? [];
    if (!selectedClassroomId) return [];
    return alunos.filter((aluno) => aluno.classroom_id === selectedClassroomId);
  }, [alunosQuery.data?.data, selectedClassroomId]);

  const updateAttendance = (alunoId: number, status: FrequenciaStatus) => setAttendance((current) => ({ ...current, [alunoId]: status }));

  const handleSave = async () => {
    if (!date || !classroomId || !content.trim()) {
      toast.error("Preencha data, turma e conteúdo.");
      return;
    }
    if (!alunosDaTurma.length) {
      toast.error("Nenhum aluno encontrado para a turma selecionada.");
      return;
    }

    await createFrequencia.mutateAsync({
      data_aula: date,
      classroom_id: selectedClassroomId,
      turma_id: selectedClassroomId,
      disciplina_id: disciplina.id,
      conteudo: content,
      conteudo_trabalhado: content,
      presencas: alunosDaTurma.map((aluno) => ({ aluno_id: aluno.id, status: attendance[aluno.id] ?? "P" })),
    });

    setIsRegistering(false);
    setDate("");
    setContent("");
    setAttendance({});
  };

  if (isRegistering) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Button size="icon" className="bg-primaria" onClick={() => setIsRegistering(false)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">Registrar Frequência</h1>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[180px_220px_1fr]">
            <label className="space-y-2 font-semibold">
              <span>Data da Aula</span>
              <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <label className="space-y-2 font-semibold">
              <span>Turma</span>
              <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={classroomId} onChange={(event) => setClassroomId(event.target.value)}>
                <option value="">Selecione</option>
                {turmas.map((turma: Classroom) => (
                  <option key={turma.id} value={turma.id}>{turma.name}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 font-semibold">
              <span>Conteúdo Trabalhado</span>
              <Input value={content} onChange={(event) => setContent(event.target.value)} />
            </label>
          </div>
          <div className="mt-8 overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead className="text-right">Presença</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alunosDaTurma.map((aluno: Aluno) => (
                  <TableRow key={aluno.id}>
                    <TableCell className="font-medium">{aluno.name}</TableCell>
                    <TableCell>{aluno.matricula}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {(["P", "F", "J"] as FrequenciaStatus[]).map((status) => (
                          <button key={status} type="button" onClick={() => updateAttendance(aluno.id, status)} className={cn("h-9 w-9 rounded-md border font-bold transition", status === "P" && "border-green-600 text-green-700", status === "F" && "border-red-600 text-red-700", status === "J" && "border-orange-500 text-orange-600", (attendance[aluno.id] ?? "P") === status && status === "P" && "bg-green-600 text-white", attendance[aluno.id] === status && status === "F" && "bg-red-600 text-white", attendance[aluno.id] === status && status === "J" && "bg-orange-500 text-white")}>{status}</button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!alunosDaTurma.length && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                      Selecione uma turma com alunos cadastrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-primaria" onClick={handleSave} disabled={createFrequencia.isPending}>
              <Check />
              Salvar Frequência
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Button size="icon" className="bg-primaria" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">Cadastrar Frequência</h1>
        </div>
        <Button className="bg-primaria text-lg" onClick={() => setIsRegistering(true)}>
          <Plus />
          Registrar Frequência
        </Button>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold">{filteredFrequencias.length} Registros de Frequência</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-primaria" />
            <Input className="border-primaria pl-10" placeholder="Buscar" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Turma</TableHead>
              <TableHead>Disciplina</TableHead>
              <TableHead>Conteúdo</TableHead>
              <TableHead>Presença</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFrequencias.map((frequencia) => {
              const summary = summarizePresence(frequencia);
              return (
                <TableRow key={frequencia.id}>
                  <TableCell>{getFrequencyDate(frequencia)}</TableCell>
                  <TableCell>{frequencia.turma ?? selectedClassroom?.name ?? "-"}</TableCell>
                  <TableCell>{disciplina.nome ?? disciplina.name}</TableCell>
                  <TableCell>{getFrequencyContent(frequencia)}</TableCell>
                  <TableCell className="font-bold">
                    <span className="text-green-600">{summary.present}P</span> / <span className="text-red-600">{summary.absent}F</span> / <span className="text-orange-500">{summary.justified}J</span> <span className="ml-2">({summary.percent}%)</span>
                  </TableCell>
                </TableRow>
              );
            })}
            {!filteredFrequencias.length && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Nenhum registro de frequência encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOfertaDisciplinaList } from "@/hooks/queries/ofertaDisciplina";
import { useTurmaList } from "@/hooks/queries/turma";
import { AppInput } from "@/components/shared/app-input";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import { Classroom } from "@/types/classroom";
import { FrequenciaStatus } from "@/types/frequencia";
import { OfertaDisciplina } from "@/types/oferta-disciplina";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axiosInstance";

type Props = { disciplinaId: number };

type MatriculaDisciplinaItem = {
  id: number;
  matricula?: {
    codigo_matricula?: string;
    aluno?: {
      name?: string;
      nome?: string;
    };
  };
};

type JustificationDraft = {
  rowId: number;
  motivo: string;
  comprovanteNome: string;
};

const normalizeDateKey = (value?: string) => value?.slice(0, 10) ?? "";

export const ProfessorFrequencyRegisterView = ({ disciplinaId }: Props) => {
  const router = useRouter();
  const [classroomId, setClassroomId] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [content, setContent] = useState("");
  const [attendance, setAttendance] = useState<Record<number, FrequenciaStatus>>({});
  const [matriculas, setMatriculas] = useState<MatriculaDisciplinaItem[]>([]);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [justificationDraft, setJustificationDraft] = useState<JustificationDraft | null>(null);
  const [justifications, setJustifications] = useState<Record<number, JustificationDraft>>({});

  const ofertasQuery = useOfertaDisciplinaList();
  const turmasQuery = useTurmaList();

  const ofertaDaDisciplina = useMemo(() => {
    const ofertas = ofertasQuery.data?.data ?? [];
    return ofertas.find((oferta: OfertaDisciplina) => {
      const currentDisciplinaId = oferta.disciplina?.id ?? (oferta as any).disciplina_id;
      const disciplinaMatches = currentDisciplinaId === disciplinaId;
      const turmaId = oferta.classroom?.id ?? (oferta as any).classroom_id;
      const turmaMatches = !classroomId || turmaId === Number(classroomId);
      return disciplinaMatches && turmaMatches;
    });
  }, [classroomId, disciplinaId, ofertasQuery.data?.data]);

  const turmasVinculadas = useMemo(() => {
    const ofertas = ofertasQuery.data?.data ?? [];
    const turmaIds = new Set<number>();

    ofertas.forEach((oferta: OfertaDisciplina) => {
      if (oferta.disciplina?.id !== disciplinaId) return;
      const turmaId = oferta.classroom?.id ?? (oferta as OfertaDisciplina & { classroom_id?: number }).classroom_id;
      if (turmaId) turmaIds.add(turmaId);
    });

    return (turmasQuery.data?.data ?? []).filter((turma: Classroom) => turmaIds.has(turma.id));
  }, [disciplinaId, ofertasQuery.data?.data, turmasQuery.data?.data]);

  useEffect(() => {
    if (!classroomId && turmasVinculadas[0]?.id) {
      setClassroomId(String(turmasVinculadas[0].id));
    }
  }, [classroomId, turmasVinculadas]);

  useEffect(() => {
  const load = async () => {
      if (!ofertaDaDisciplina?.id) {
        setMatriculas([]);
        return;
      }

      const matriculasCarregadas: MatriculaDisciplinaItem[] = [];
      let page = 1;

      while (true) {
        const response = await axiosInstance.get(`matricula-disciplinas/oferta/${ofertaDaDisciplina.id}?page=${page}`);
        const payload = response.data?.data ?? response.data;
        const list = Array.isArray(payload) ? payload : payload?.data ?? [];
        matriculasCarregadas.push(...list);

        const lastPage = response.data?.meta?.last_page ?? payload?.meta?.last_page ?? 1;
        if (page >= lastPage) break;
        page += 1;
      }

      setMatriculas(matriculasCarregadas);
    };

    void load();
  }, [ofertaDaDisciplina?.id]);

  const rows = useMemo(
    () =>
      matriculas.map((item) => ({
        id: item.id,
        aluno: item.matricula?.aluno?.name ?? item.matricula?.aluno?.nome ?? `Matrícula ${item.id}`,
        matricula: item.matricula?.codigo_matricula ?? `Matrícula ${item.id}`,
      })),
    [matriculas]
  );

  const openJustification = (rowId: number) => {
    setJustificationDraft(
      justifications[rowId] ?? {
        rowId,
        motivo: "",
        comprovanteNome: "",
      }
    );
  };

  const findExistingFrequency = async (matriculaDisciplinaId: number, dataIso: string) => {
    let page = 1;

    while (true) {
      const response = await axiosInstance.get(`frequencias/matricula-disciplina/${matriculaDisciplinaId}?page=${page}`);
      const payload = response.data?.data ?? response.data;
      const list = Array.isArray(payload) ? payload : payload?.data ?? [];

      const found = list.find(
        (item: { id: number; data?: string; data_aula?: string }) =>
          normalizeDateKey(item.data_aula ?? item.data) === dataIso
      );

      if (found) {
        return found;
      }

      const lastPage = response.data?.meta?.last_page ?? payload?.meta?.last_page ?? 1;
      if (page >= lastPage) {
        return null;
      }

      page += 1;
    }
  };

  const saveJustification = () => {
    if (!justificationDraft) return;
    setJustifications((current) => ({ ...current, [justificationDraft.rowId]: justificationDraft }));
    setAttendance((current) => ({ ...current, [justificationDraft.rowId]: "J" }));
    setJustificationDraft(null);
  };

  const handleSave = async () => {
    if (!classroomId || !date || !content.trim()) {
      toast.error("Preencha turma, data e conteúdo.");
      return;
    }

    if (!rows.length) {
      toast.error("Nenhuma matrícula encontrada para a oferta selecionada.");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dataIso = `${year}-${month}-${day}`;
    setLoadingRegister(true);

    try {
      await Promise.all(
        rows.map(async (row) => {
          const situacao = attendance[row.id] ? attendance[row.id] === "P" : true;
          const justificativa =
            attendance[row.id] === "J"
              ? justifications[row.id]?.motivo || justifications[row.id]?.comprovanteNome || content
              : null;

          const existing = await findExistingFrequency(row.id, dataIso);

          if (existing?.id) {
            return axiosInstance.put(`frequencias/${existing.id}`, {
              situacao,
              justificativa,
              conteudo: content,
              conteudo_trabalhado: content,
            });
          }

          return axiosInstance.post("frequencias", {
            matricula_disciplina_id: row.id,
            data: dataIso,
            data_aula: dataIso,
            situacao,
            justificativa,
            conteudo: content,
            conteudo_trabalhado: content,
          });
        })
      );

      toast.success("Frequência registrada com sucesso.");
      localStorage.setItem("frequencia:refresh", String(Date.now()));
      window.dispatchEvent(new Event("frequencia:refresh"));
      router.back();
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <Card className="mt-0">
      <CardHeader className="flex items-center gap-3">
        <Button size="icon" className="bg-primaria" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold">Cadastrar Frequência</h1>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[180px_220px_1fr]">
          <label className="space-y-2">
            <span>Data da Aula</span>
            <CalendarioCadastro value={date} onValueChange={setDate} />
          </label>
          <label className="space-y-2">
            <span>Turma</span>
            <Select value={classroomId} onValueChange={setClassroomId}>
              <SelectTrigger className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {turmasVinculadas.map((turma: Classroom) => (
                  <SelectItem key={turma.id} value={String(turma.id)}>
                    {turma.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-2">
            <span>Conteúdo Trabalhado</span>
            <AppInput value={content} onChange={(event) => setContent(event.target.value)} intent="formCamp" />
          </label>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead className="text-right">Presença</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.aluno}</TableCell>
                  <TableCell>{row.matricula}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {(["P", "F", "J"] as FrequenciaStatus[]).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => {
                            if (status === "J") {
                              openJustification(row.id);
                              return;
                            }
                            setAttendance((current) => ({ ...current, [row.id]: status }));
                          }}
                          className={cn(
                            "h-9 w-9 rounded-md border font-bold transition",
                            status === "P" && "border-green-600 text-green-700",
                            status === "F" && "border-red-600 text-red-700",
                            status === "J" && "border-orange-500 text-orange-600",
                            (attendance[row.id] ?? "P") === status && status === "P" && "bg-green-600 text-white",
                            attendance[row.id] === status && status === "F" && "bg-red-600 text-white",
                            attendance[row.id] === status && status === "J" && "bg-orange-500 text-white"
                          )}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    Nenhuma matrícula encontrada para a oferta desta disciplina.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <Button className="bg-primaria" onClick={handleSave} disabled={loadingRegister}>
            <Check />
            Salvar Frequência
          </Button>
        </div>
      </CardContent>

      <Dialog open={!!justificationDraft} onOpenChange={(open) => !open && setJustificationDraft(null)}>
        <DialogContent className="max-w-2xl border-primaria bg-white p-0">
          <div className="p-8">
            <DialogHeader className="mb-8 text-left">
              <DialogTitle className="text-4xl font-semibold">Justificativa Falta</DialogTitle>
              <DialogDescription className="sr-only">Preencha o motivo e anexe um comprovante visual.</DialogDescription>
            </DialogHeader>

            <div className="rounded-[24px] border-2 border-primaria bg-zinc-50 p-6 shadow-sm">
              <div className="space-y-8">
                <label className="block space-y-3">
                  <span className="text-2xl font-medium">Motivo falta?</span>
                  <Textarea
                    value={justificationDraft?.motivo ?? ""}
                    onChange={(event) =>
                      setJustificationDraft((current) => (current ? { ...current, motivo: event.target.value } : current))
                    }
                    placeholder="Descreva o motivo da falta"
                    className="min-h-[96px] border-primaria bg-white text-base"
                  />
                </label>

                <label className="block space-y-3">
                  <span className="text-2xl font-medium">Comprovante</span>
                  <div className="rounded-2xl border-2 border-primaria bg-white p-5">
                    <input
                      type="file"
                      className="hidden"
                      id={`comprovante-${justificationDraft?.rowId ?? "draft"}`}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setJustificationDraft((current) =>
                          current
                            ? {
                                ...current,
                                comprovanteNome: file ? file.name : "",
                              }
                            : current
                        );
                      }}
                    />
                    <label
                      htmlFor={`comprovante-${justificationDraft?.rowId ?? "draft"}`}
                      className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primaria/80 bg-zinc-100 px-6 text-center transition hover:bg-zinc-50"
                    >
                      <span className="text-lg font-medium text-zinc-500">
                        {justificationDraft?.comprovanteNome || "Anexe um arquivo"}
                      </span>
                      <span className="mt-2 text-sm text-zinc-400">Clique para selecionar um comprovante</span>
                    </label>
                  </div>
                </label>

                <div className="flex gap-3 pt-6">
                  <Button className="bg-green-600 px-5 py-6 text-2xl font-semibold" onClick={saveJustification}>
                    Cadastrar
                  </Button>
                  <Button
                    type="button"
                    className="bg-red-500 px-5 py-6 text-2xl font-semibold"
                    onClick={() => setJustificationDraft(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

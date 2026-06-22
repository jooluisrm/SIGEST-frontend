"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useAvaliacaoList, useCreateAvaliacao } from "@/hooks/queries/avaliacao";
import { Avaliacao } from "@/types/avaliacao";
import { Disciplina } from "@/types/disciplina";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  disciplina: Disciplina;
  onBack: () => void;
};

const getMaxScore = (avaliacao: Avaliacao) =>
  avaliacao.pontuacao_maxima ?? avaliacao.max_pontos ?? avaliacao.valor ?? "-";

export const ProfessorEvaluationView = ({ disciplina, onBack }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Prova");
  const [data, setData] = useState("");
  const [pontuacao, setPontuacao] = useState("");
  const avaliacoesQuery = useAvaliacaoList();
  const createAvaliacao = useCreateAvaliacao();

  const disciplinaAvaliacoes = useMemo(() => {
    const list = avaliacoesQuery.data?.data ?? [];
    return list.filter((avaliacao) => avaliacao.disciplina_id === disciplina.id);
  }, [avaliacoesQuery.data?.data, disciplina.id]);

  const filteredAvaliacoes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return disciplinaAvaliacoes;
    }

    return disciplinaAvaliacoes.filter((avaliacao) =>
      [avaliacao.id, avaliacao.titulo, avaliacao.tipo, avaliacao.data]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [disciplinaAvaliacoes, search]);

  const handleSave = async () => {
    if (!tipo || !data || !pontuacao) {
      toast.error("Preencha tipo, data e pontuação máxima.");
      return;
    }

    await createAvaliacao.mutateAsync({
      titulo: `${tipo} - ${disciplina.nome ?? disciplina.name ?? "Disciplina"}`,
      tipo,
      data,
      valor: Number(pontuacao),
      max_pontos: Number(pontuacao),
      pontuacao_maxima: Number(pontuacao),
      disciplina_id: disciplina.id,
      turma_id: disciplina.classroom_id ?? undefined,
    });

    setIsCreating(false);
    setTipo("Prova");
    setData("");
    setPontuacao("");
  };

  if (isCreating) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Button size="icon" className="bg-primaria" onClick={() => setIsCreating(false)}>
            <ArrowLeft />
          </Button>
          <h1 className="text-3xl font-bold">Cadastro de Avaliações</h1>
        </div>

        <div className="max-w-3xl rounded-lg bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-3">
            <label className="space-y-2 font-semibold">
              <span>Tipo de Avaliação</span>
              <select
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
              >
                <option value="Prova">Prova</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Exercício">Exercício</option>
              </select>
            </label>
            <label className="space-y-2 font-semibold">
              <span>Data</span>
              <Input type="date" value={data} onChange={(event) => setData(event.target.value)} />
            </label>
            <label className="space-y-2 font-semibold">
              <span>Pontuação Máxima</span>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={pontuacao}
                onChange={(event) => setPontuacao(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-8 flex justify-end">
            <Button className="bg-primaria" onClick={handleSave} disabled={createAvaliacao.isPending}>
              <Check />
              Salvar Avaliação
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
          <h1 className="text-3xl font-bold">Gerenciar Avaliação</h1>
        </div>
        <Button className="bg-primaria text-lg" onClick={() => setIsCreating(true)}>
          <Plus />
          Criar Avaliação
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold">{filteredAvaliacoes.length} Avaliações</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-primaria" />
            <Input
              className="border-primaria pl-10"
              placeholder="Buscar"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Pontuação Máxima</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAvaliacoes.map((avaliacao) => (
              <TableRow key={avaliacao.id}>
                <TableCell>{avaliacao.id}</TableCell>
                <TableCell>{avaliacao.titulo}</TableCell>
                <TableCell>{avaliacao.data}</TableCell>
                <TableCell>{getMaxScore(avaliacao)}</TableCell>
              </TableRow>
            ))}
            {!filteredAvaliacoes.length && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Nenhuma avaliação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

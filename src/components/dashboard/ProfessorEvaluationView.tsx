"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Check, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useAvaliacaoList, useCreateAvaliacao } from "@/hooks/queries/avaliacao";
import { useOfertaDisciplinaList } from "@/hooks/queries/ofertaDisciplina";
import { Atividade } from "@/types/avaliacao";
import { Disciplina } from "@/types/disciplina";
import { OfertaDisciplina } from "@/types/oferta-disciplina";
import { Button } from "@/components/ui/button";
import { AppInput } from "@/components/shared/app-input";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = { disciplina: Disciplina; onBack: () => void };

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

const extractScore = (avaliacao: Atividade) => {
  const raw =
    avaliacao.pontuacao_maxima ??
    avaliacao.max_pontos ??
    avaliacao.valor ??
    avaliacao.descricao ??
    "-";

  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const match = raw.match(/(\d+(?:[.,]\d+)?)/);
    return match ? match[1].replace(",", ".") : raw;
  }

  return "-";
};

export const ProfessorEvaluationView = ({ disciplina, onBack }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Prova");
  const [data, setData] = useState("");
  const [pontuacao, setPontuacao] = useState("");
  const ofertasQuery = useOfertaDisciplinaList();
  const createAvaliacao = useCreateAvaliacao();

  const ofertaDaDisciplina = useMemo(() => {
    const ofertas = ofertasQuery.data?.data ?? [];
    return ofertas.find((oferta: OfertaDisciplina) => oferta.disciplina?.id === disciplina.id);
  }, [ofertasQuery.data?.data, disciplina.id]);

  const avaliacoesQuery = useAvaliacaoList(
    ofertaDaDisciplina?.id ? `atividades/oferta/${ofertaDaDisciplina.id}` : null
  );

  const avaliacoes = useMemo(() => avaliacoesQuery.data?.data ?? [], [avaliacoesQuery.data?.data]);

  const filteredAvaliacoes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return avaliacoes;
    return avaliacoes.filter((avaliacao) =>
      [avaliacao.id, avaliacao.titulo, avaliacao.tipo, formatDate(avaliacao.data_inicio ?? avaliacao.data)]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [avaliacoes, search]);

  const handleSave = async () => {
    if (!nome.trim() || !tipo || !data || !pontuacao) {
      toast.error("Preencha nome, tipo, data e pontuação máxima.");
      return;
    }

    if (!ofertaDaDisciplina?.id) {
      toast.error("Não foi possível identificar a oferta desta disciplina.");
      return;
    }

    await createAvaliacao.mutateAsync({
      titulo: nome.trim(),
      tipo,
      data_inicio: data,
      data_fim: null,
      descricao: `Pontuação máxima: ${pontuacao}`,
      oferta_disciplina_id: ofertaDaDisciplina.id,
    });

    setIsCreating(false);
    setNome("");
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
          <h1 className="text-2xl font-semibold">Cadastro de Avaliações</h1>
        </div>

        <div className="w-full rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-10">
            <label className="space-y-2">
              <span>Nome da Avaliação</span>
              <AppInput
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                intent="formCamp"
                placeholder="Ex: Prova Bimestral 1"
              />
            </label>

            <label className="space-y-2">
              <span>Tipo de Avaliação</span>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="w-full border-primaria">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prova">Prova</SelectItem>
                  <SelectItem value="Trabalho">Trabalho</SelectItem>
                  <SelectItem value="Exercício">Exercício</SelectItem>
                </SelectContent>
              </Select>
            </label>

            <label className="space-y-2">
              <span>Data</span>
              <CalendarioCadastro
                value={data ? new Date(`${data}T00:00:00`) : undefined}
                onValueChange={(selectedDate) =>
                  setData(selectedDate ? selectedDate.toISOString().split("T")[0] : "")
                }
              />
            </label>

            <label className="space-y-2">
              <span>Pontuação Máxima</span>
              <AppInput
                type="number"
                min="0"
                step="0.1"
                value={pontuacao}
                onChange={(event) => setPontuacao(event.target.value)}
                intent="formCamp"
              />
            </label>
          </div>

          <div className="mt-10 flex justify-end">
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
          <h1 className="text-2xl font-semibold">Gerenciar Avaliação</h1>
        </div>
        <Button className="bg-primaria" onClick={() => setIsCreating(true)}>
          <Plus />
          Criar Avaliação
        </Button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-xl font-semibold">{filteredAvaliacoes.length} Avaliações</h2>
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
                <TableCell>{formatDate(avaliacao.data_inicio ?? avaliacao.data)}</TableCell>
                <TableCell>{extractScore(avaliacao)}</TableCell>
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

"use client";

import { useId, useState } from "react";
import { Search } from "lucide-react";
import { AppInput } from "../../shared/app-input";
import { ButtonGerenciar } from "../buttonGerenciar";
import { TitlePage } from "../../shared/titlePage";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { ActionDialog } from "../actionDialog";
import { AlertDialogComponent } from "../../shared/alertComponent";

const mockAvaliacoes = [
  { id: 1, titulo: "Avaliação Mensal - Matemática", valor: 10, data: "15/05/2026", turma: "Turma 111" },
  { id: 2, titulo: "Trabalho Bimestral - Português", valor: 20, data: "20/05/2026", turma: "Turma 222" },
];

export const GerenciarAvaliacaoList = () => {
  const [search, setSearch] = useState("");
  const id = useId();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-5">
        <TitlePage title="Gerenciar" />

        <Card className="rounded-[40px] shadow-2xl border-none bg-white/95 backdrop-blur-md overflow-hidden max-w-7xl mx-auto mt-8">
          <CardHeader className="flex flex-row items-center justify-between p-12 md:p-16 border-b border-border/50 gap-8">
            <ButtonGerenciar
                icon="add"
                className="bg-primaria h-14 px-8 rounded-2xl text-xl font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                alt="Cadastrar Avaliação"
                link="/cadastrar/avaliacao"
            />
            <div className="flex-1 max-w-xl">
                <AppInput
                    id={id}
                    placeholder="Buscar avaliação por título ou turma"
                    icon={<Search size={24} className="text-primaria" />}
                    className="h-14 pl-14 rounded-2xl border-primaria/20 bg-muted/30 focus:bg-white transition-all text-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-xs font-bold text-foreground/50 uppercase tracking-[0.2em] h-12 px-6">
                  <th className="px-8">Título da Avaliação</th>
                  <th className="px-8">Turma</th>
                  <th className="px-8">Data</th>
                  <th className="px-8">Valor</th>
                  <th className="px-8 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockAvaliacoes.map((av) => (
                  <tr key={av.id} className="bg-white hover:bg-muted/5 transition-all shadow-sm rounded-3xl group">
                    <td className="px-8 py-6 font-bold text-xl first:rounded-l-3xl border-y border-l border-border/20 group-hover:border-primaria/30">{av.titulo}</td>
                    <td className="px-8 py-6 text-foreground/70 text-lg border-y border-border/20 group-hover:border-primaria/30">{av.turma}</td>
                    <td className="px-8 py-6 text-foreground/70 text-lg border-y border-border/20 group-hover:border-primaria/30">{av.data}</td>
                    <td className="px-8 py-6 text-foreground/70 text-lg border-y border-border/20 group-hover:border-primaria/30">{av.valor}</td>
                    <td className="px-8 py-6 text-right last:rounded-r-3xl border-y border-r border-border/20 group-hover:border-primaria/30">
                      <div className="flex items-center justify-end gap-3">
                        <AlertDialogComponent
                          onConfirm={() => {}}
                          triggerClassName="bg-red-500 hover:bg-red-600 h-10 w-10 p-0 rounded-xl text-white shadow-md active:scale-90 transition-all"
                          triggerIcon="delete"
                          triggerTooltip="Excluir Avaliação"
                          dialogTitle="Excluir Avaliação"
                          dialogDescription="Tem certeza que deseja excluir esta avaliação? Esta ação não poderá ser desfeita."
                        />
                        <ActionDialog
                          triggerIcon="edit"
                          triggerClassName="bg-orange-500 hover:bg-orange-600 h-10 w-10 p-0 rounded-xl text-white shadow-md active:scale-90 transition-all"
                          triggerTooltip="Editar Avaliação"
                          dialogTitle="Editar Avaliação"
                        >
                            {() => <div className="p-10">Formulário de Edição</div>}
                        </ActionDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

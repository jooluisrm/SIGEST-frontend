"use client";

import { useState } from "react";
import { Search, ChevronDown, CheckCircle2, ChevronRight, ArrowLeft, Eye } from "lucide-react";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { usePeriodosByCurso, useCreatePeriodo, useClosePeriodo } from "@/hooks/queries/periodo";
import { AlertDialogComponent } from "@/components/shared/alertComponent";
import { cn } from "@/lib/utils";

type ViewState = "LIST" | "CREATE" | "SUCCESS" | "DETAIL";

export const PeriodoLetivoModal = ({ courseId }: { courseId: number }) => {
  const [view, setView] = useState<ViewState>("LIST");
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  // Form State
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const { data: periods, isLoading } = usePeriodosByCurso(courseId);
  const createMutation = useCreatePeriodo();
  const closeMutation = useClosePeriodo();

  const handleOpenCreate = () => setView("CREATE");
  const handleBack = () => setView("LIST");

  const handleCreate = async () => {
    if (!startDate || !endDate) return;

    await createMutation.mutateAsync({
      course_id: courseId,
      name: `Período ${startDate.getFullYear()}.${startDate.getMonth() > 5 ? 2 : 1}`,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    });

    setView("SUCCESS");
  };

  const handleClosePeriod = async (id: number) => {
    await closeMutation.mutateAsync(id);
  };

  const filteredPeriods = periods?.data.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <Dialog onOpenChange={(open) => !open && setView("LIST")}>
      <DialogTrigger asChild>
        <AppButton
          className="bg-green-600 hover:bg-green-700 text-white px-6 h-10 rounded-xl font-bold transition-all active:scale-95"
        >
          Gerenciar
        </AppButton>
      </DialogTrigger>
      <DialogContent className="max-w-md border-green-600/20 rounded-[2rem]">
        <div className="flex flex-col gap-6 min-h-[500px]">
          
          <div className="flex items-center gap-3">
             <div 
               onClick={view !== "LIST" ? handleBack : undefined}
               className={cn(
                 "bg-green-600 p-1.5 rounded-lg cursor-pointer hover:bg-green-700 transition-colors",
                 view === "LIST" && "opacity-0 cursor-default"
               )}
             >
               <ArrowLeft size={18} className="text-white" />
             </div>
             <h2 className="text-2xl font-bold text-foreground/90">
                {view === "CREATE" ? "Abrir Período Letivo" : view === "SUCCESS" ? "Sucesso" : view === "DETAIL" ? "Detalhes" : "Períodos Letivos"}
             </h2>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            {view === "LIST" && (
              <>
                <div className="relative group">
                  <AppInput
                    placeholder="Buscar Periodo letivo"
                    icon={<Search size={18} className="text-green-600/50" />}
                    className="h-12 border-green-600/20 bg-green-50/20 group-hover:border-green-600/40 transition-all rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3 overflow-y-auto max-h-[350px] pr-1 rounded-2xl p-4 bg-green-50/10">
                  {isLoading ? (
                    <div className="text-center py-10 text-muted-foreground">Carregando...</div>
                  ) : filteredPeriods.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">Nenhum período encontrado.</div>
                  ) : (
                    filteredPeriods.map((period) => (
                      <div
                        key={period.id}
                        className="flex items-center justify-between p-4 border border-green-600/20 rounded-xl bg-white hover:bg-green-50 transition-colors cursor-pointer group"
                        onClick={() => {
                            setSelectedPeriodId(period.id);
                            setView("DETAIL");
                        }}
                      >
                        <span className="font-medium text-foreground/80">{period.name}</span>
                        <ChevronDown size={20} className="text-green-600/50 group-hover:text-green-600 transition-colors" />
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-auto flex justify-center">
                  <AppButton
                    onClick={handleOpenCreate}
                    className="bg-green-600 hover:bg-green-700 min-w-[140px] h-12 rounded-xl text-lg font-bold shadow-md"
                  >
                    Abrir
                  </AppButton>
                </div>
              </>
            )}

            {view === "CREATE" && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300 h-full">
                <div className="bg-green-50/10 border border-green-600/20 rounded-[2rem] p-8 flex flex-col gap-8 flex-1">
                  <div className="flex flex-col gap-3">
                    <label className="text-base font-bold text-foreground/70">Qual a data de início do período?</label>
                    <CalendarioCadastro
                        value={startDate}
                        onValueChange={setStartDate}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-base font-bold text-foreground/70">Qual a data de finalização do período?</label>
                    <CalendarioCadastro
                        value={endDate}
                        onValueChange={setEndDate}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 pb-2">
                  <AppButton
                    onClick={handleCreate}
                    isLoading={createMutation.isPending}
                    className="bg-green-600 hover:bg-green-700 min-w-[140px] h-12 rounded-xl font-bold shadow-md text-lg"
                  >
                    Abrir
                  </AppButton>
                  <AppButton
                    onClick={handleBack}
                    className="bg-red-500 hover:bg-red-600 min-w-[140px] h-12 rounded-xl font-bold shadow-md text-lg text-white"
                  >
                    Cancelar
                  </AppButton>
                </div>
              </div>
            )}

            {view === "SUCCESS" && (
              <div className="flex flex-col items-center justify-center gap-6 py-20 animate-in zoom-in duration-300">
                <div className="bg-green-100 p-6 rounded-full">
                  <CheckCircle2 size={80} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-center">Período Letivo criado com sucesso!</h3>
                <AppButton
                  onClick={() => {
                    setView("LIST");
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                  className="bg-green-600 hover:bg-green-700 min-w-[140px] h-12 rounded-xl text-lg font-bold shadow-md mt-6"
                >
                  Concluir
                </AppButton>
              </div>
            )}

            {view === "DETAIL" && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300 h-full">
                <div className="flex flex-col gap-4 rounded-[2rem] p-6 bg-green-50/10 flex-1">
                  <h3 className="text-xl font-bold text-foreground/80 mb-2">
                    {periods?.data.find(p => p.id === selectedPeriodId)?.name ?? "Período"}
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map(serie => (
                      <div key={serie} className="flex items-center justify-between p-4 border border-green-600/30 rounded-xl group hover:bg-green-100 transition-colors">
                        <span className="font-bold text-green-800">Série {serie}</span>
                        <div className="bg-green-800 p-1.5 rounded-md">
                           <Eye size={16} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex justify-center pb-2">
                  <AlertDialogComponent
                    onConfirm={() => selectedPeriodId && handleClosePeriod(selectedPeriodId)}
                    triggerClassName="bg-red-500 hover:bg-red-600 min-w-[140px] h-12 rounded-xl text-lg font-bold shadow-md text-white"
                    triggerTooltip="Fechar Período Letivo"
                    dialogTitle="Deseja fechar Período Letivo?"
                    dialogDescription="Esta ação irá encerrar o período letivo atual e todas as suas atividades vinculadas."
                    triggerLabel="Fechar"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState, useMemo } from "react";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { Search, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Classroom } from "@/types/classroom";
import { useAlunoList, useAlunoSearch, useUpdateAluno } from "@/hooks/queries/aluno";
import { usePeriodoDetail, usePeriodosByCurso } from "@/hooks/queries/periodo";
import { toast } from "sonner";
import { PaginationTable } from "@/components/gerenciar/paginationTable";

interface Props {
  isUnenroll?: boolean;
  classroom: Classroom;
  onRefresh?: () => void;
}

export const StudentEnrollmentModal = ({ isUnenroll = false, classroom, onRefresh }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [pageUrl, setPageUrl] = useState<string | null>(null);

  const { data: alunosListData, isLoading: isLoadingList } = useAlunoList(pageUrl);
  const { data: searchData, isLoading: isLoadingSearch } = useAlunoSearch(search);
  const updateAlunoMutation = useUpdateAluno();

  const { data: currentPeriodData } = usePeriodoDetail(classroom.period_id);
  const courseId = currentPeriodData?.course_id;

  const { data: periodsInCourseData } = usePeriodosByCurso(courseId as number, !!courseId);

  const coursePeriodIds = useMemo(() => {
    return (periodsInCourseData?.data ?? []).map(p => p.id);
  }, [periodsInCourseData]);

  const filteredStudents = useMemo(() => {
    const allAlunos = (search.trim() ? searchData?.data : alunosListData?.data) ?? [];

    return allAlunos.filter(aluno => {
      const isSameCourse = coursePeriodIds.length > 0 && aluno.period_id !== null 
        ? coursePeriodIds.includes(aluno.period_id) 
        : true;
      if (!isSameCourse) return false;

      if (isUnenroll) {
        return aluno.classroom_id == classroom.id;
      }

      return aluno.classroom_id === null || aluno.classroom_id === undefined;
    });
  }, [alunosListData, searchData, search, isUnenroll, classroom.id, coursePeriodIds]);

  const isLoading = search.trim() ? isLoadingSearch : isLoadingList;

  const toggleStudent = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAction = async () => {
    if (selected.length === 0) {
      toast.error("Selecione pelo menos um aluno");
      return;
    }

    try {
      const allAvailableAlunos = [...(alunosListData?.data ?? []), ...(searchData?.data ?? [])];
      const promises = selected.map(studentId => {
        const aluno = allAvailableAlunos.find(a => a.id === studentId);
        if (!aluno) return Promise.resolve();

        return updateAlunoMutation.mutateAsync({
          id: studentId,
          payload: {
            ...aluno,
            classroom_id: isUnenroll ? null : classroom.id
          } as any
        });
      });

      await Promise.all(promises);

      toast.success(`${selected.length} aluno(s) ${isUnenroll ? 'desenturmado(s)' : 'enturmado(s)'} com sucesso!`);
      onRefresh?.();
      setSelected([]);
    } catch (error) {
      toast.error("Erro ao processar enturmação");
    }
  };

  const handlePageChange = (url: string) => {
    setPageUrl(url);
  };

  return (
    <div className="flex flex-col px-3 gap-8 py-4 max-w-full">
      <div className="w-full relative group">
        <AppInput
          placeholder="Buscar aluno por nome ou matrícula"
          icon={<Search size={20} className="text-primaria" />}
          className="h-14 bg-muted/30 border-primaria/20 group-hover:border-primaria/50 transition-all pl-12 rounded-2xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageUrl(null);
          }}
        />
      </div>

      <div className="border border-border/50 rounded-3xl overflow-hidden bg-white shadow-inner max-h-[500px] flex flex-col">
        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-primaria" size={40} />
              <p className="text-muted-foreground">Carregando alunos...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-white sticky top-0 z-10">
                <tr className="text-xs font-bold text-foreground/70 uppercase tracking-wider h-12">
                  <th className="px-6">Matrícula</th>
                  <th className="px-6">Nome do aluno</th>
                  <th className="px-6 text-center w-20">Selecionar</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-muted-foreground">
                      Nenhum aluno encontrado para esta ação.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className={cn(
                        "border-t border-border/20 transition-colors cursor-pointer",
                        selected.includes(student.id) ? "bg-primaria/10" : "hover:bg-muted/5"
                      )}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <td className="px-6 py-4 font-medium">{student.matricula || student.id}</td>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4 text-center">
                        <div className={cn(
                          "w-6 h-6 rounded-md border-2 mx-auto flex items-center justify-center transition-all",
                          selected.includes(student.id) ? "bg-primaria border-primaria text-white" : "border-primaria/30 bg-white"
                        )}>
                          {selected.includes(student.id) && <Check size={14} strokeWidth={4} />}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {!search.trim() && alunosListData?.meta && (
          <div className="p-4 bg-muted/10 border-t">
            <PaginationTable meta={alunosListData.meta} onPageChange={handlePageChange} />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col justify-center gap-2 md:flex-row md:gap-3">
        <AppButton
          onClick={handleAction}
          isLoading={updateAlunoMutation.isPending}
          intent={isUnenroll ? "cancel" : "done1"}
          className={cn(
            "min-w-[140px] h-12 rounded-xl font-bold",
            isUnenroll && "bg-red-500 hover:bg-red-600"
          )}
        >
          {isUnenroll ? "Desenturmar" : "Enturmar"}
        </AppButton>
      </div>
    </div>
  );
};

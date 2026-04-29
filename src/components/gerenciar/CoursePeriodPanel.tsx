import { useTurmasByPeriodo } from "@/hooks/queries/turma";
import { AppButtonNew } from "../shared/AppButtonNew";
import { GenerateClassroomsForm } from "./generateClassroomsForm";
import { Period } from "@/types/period";
import { Classroom } from "@/types/classroom";
import { Skeleton } from "../ui/skeleton";

export const CoursePeriodPanel = ({ period }: { period: Period }) => {
  const turmasQuery = useTurmasByPeriodo(period.id);
  const classrooms = (turmasQuery.data?.data ?? []) as Classroom[];

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-primaria/30 px-4 py-2 font-bold">

        <span>Período</span>  
        <div className="flex gap-2">
          <GenerateClassroomsForm periodId={period.id} />
          <AppButtonNew
            link="/cadastrar/turma"
            intent="done1"
            className="h-8 rounded-lg px-3 text-sm font-bold"
          >
            Criar Turma
          </AppButtonNew>
        </div>
      </div>

      {turmasQuery.isLoading ? (
        <Skeleton className="m-4 h-20 w-auto" />
      ) : classrooms.length ? (
        <div className="divide-y divide-border">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3">
              <div>
                <p className="font-semibold">{classroom.name}</p>
                <p className="text-sm text-muted-foreground">
                  {classroom.shift} · Máximo {classroom.max_students} alunos
                </p>
              </div>
              <span className="flex items-center rounded-md bg-primaria/20 px-3 py-1 text-sm font-bold">
                {classroom.status ? "Aberta" : "Fechada"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-4 text-sm text-muted-foreground">
          Nenhuma turma criada para este período.
        </p>
      )}
    </div>
  );
};
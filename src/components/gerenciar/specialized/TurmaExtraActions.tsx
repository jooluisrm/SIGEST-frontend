import { ActionDialog } from "@/components/gerenciar/actionDialog";
import { StudentEnrollmentModal } from "./StudentEnrollmentModal";
import { Classroom } from "@/types/classroom";

interface Props {
  turma: Classroom;
  onRefresh?: () => void;
}

export const TurmaExtraActions = ({ turma, onRefresh }: Props) => {
  return (
    <div className="flex gap-2">
      <ActionDialog
        triggerIcon="edit"
        triggerTooltip="Enturmar Aluno"
        triggerClassName="bg-primaria text-white transition-transform active:scale-90"
        dialogTitle="Enturmar Aluno"
        dialogClassName="sm:max-w-6xl"
      >
        <StudentEnrollmentModal classroom={turma} onRefresh={onRefresh} />
      </ActionDialog>

      <ActionDialog
        triggerIcon="edit"
        triggerTooltip="Desenturmar Aluno"
        triggerClassName="bg-red-500 text-white transition-transform active:scale-90"
        dialogTitle="Desenturmar Aluno"
        dialogClassName="sm:max-w-6xl"
      >
        <StudentEnrollmentModal isUnenroll classroom={turma} onRefresh={onRefresh} />
      </ActionDialog>
    </div>
  );
};

import { ActionDialog } from "@/components/gerenciar/actionDialog";
import { StudentEnrollmentModal } from "./StudentEnrollmentModal";

export const TurmaExtraActions = () => {
  return (
    <div className="flex gap-2">
      <ActionDialog
        triggerIcon="view"
        triggerTooltip="Enturmar Aluno"
        triggerClassName="bg-green-700 hover:bg-green-800 text-white transition-transform active:scale-90"
        dialogTitle="Enturmar Aluno"
        dialogClassName="max-w-4xl"
      >
        <StudentEnrollmentModal />
      </ActionDialog>

      <ActionDialog
        triggerIcon="view"
        triggerTooltip="Desenturmar Aluno"
        triggerClassName="bg-red-700 hover:bg-red-800 text-white transition-transform active:scale-90"
        dialogTitle="Desenturmar Aluno"
        dialogClassName="max-w-4xl"
      >
        <StudentEnrollmentModal isUnenroll />
      </ActionDialog>
    </div>
  );
};

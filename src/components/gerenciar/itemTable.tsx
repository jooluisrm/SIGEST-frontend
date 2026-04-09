import { toast } from "sonner";
import { moduleRegistry } from "@/config/module-registry";
import { usePageType } from "@/context/pageTypeContext";
import { useManagedDeleteMutation } from "@/hooks/queries/managed-modules";
import { ActionDialog } from "./actionDialog";
import { ItemView } from "./itemView";
import { AlertDialogComponent } from "../shared/alertComponent";
import { TableCell, TableRow } from "../ui/table";

type Props = {
  item: unknown;
  onRefresh?: () => void;
};

export const ItemTable = ({ item, onRefresh }: Props) => {
  const { type } = usePageType();

  if (!type) {
    return null;
  }

  const moduleEntry = moduleRegistry[type];
  const summary = moduleEntry.getSummary(item);
  const id = moduleEntry.getId(item);
  const deleteMutation = useManagedDeleteMutation(type);

  const handleDelete = async () => {
    if (!moduleEntry.capabilities.delete) {
      return;
    }

    await deleteMutation.mutateAsync(id);
    toast.success(`${moduleEntry.label} deletado com sucesso!`);
    onRefresh?.();
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{summary.title}</TableCell>
      <TableCell className="hidden md:table-cell">{summary.secondary}</TableCell>
      <TableCell className="hidden md:table-cell">{summary.tertiary}</TableCell>
      <TableCell>
        <div className="flex items-center justify-end gap-1">
          {moduleEntry.capabilities.delete && (
            <AlertDialogComponent
              onConfirm={handleDelete}
              triggerClassName="bg-red-500"
              triggerIcon="delete"
              triggerTooltip={`Deletar ${moduleEntry.label.toLowerCase()}`}
              dialogTitle={`Deletar ${moduleEntry.label}`}
              dialogDescription={`Tem certeza que deseja deletar este ${moduleEntry.label.toLowerCase()}?`}
            />
          )}
          {moduleEntry.capabilities.edit && moduleEntry.renderForm && (
            <ActionDialog
              triggerIcon="edit"
              triggerTooltip={`Editar ${moduleEntry.label.toLowerCase()}`}
              triggerClassName="bg-secundaria"
              dialogTitle={`Editar ${moduleEntry.label}`}
            >
              {() =>
                moduleEntry.renderForm?.({
                  isEdit: true,
                  defaultValues: item,
                  onRefresh,
                }) ?? null
              }
            </ActionDialog>
          )}
          {moduleEntry.capabilities.detail && (
            <ActionDialog
              triggerIcon="view"
              triggerTooltip={`Visualizar ${moduleEntry.label.toLowerCase()}`}
              triggerClassName="bg-secundaria1"
              dialogClassName="min-w-[80vw]"
              dialogTitle={`Visualizar ${moduleEntry.label}`}
            >
              {() => <ItemView id={id} />}
            </ActionDialog>
          )}
          {moduleEntry.renderExtraAction?.(item, onRefresh)}
        </div>
      </TableCell>
    </TableRow>
  );
};

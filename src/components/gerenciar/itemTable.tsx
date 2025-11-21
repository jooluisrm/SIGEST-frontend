import { TypeProfessorCadastro } from "@/types/professor";
import { TableCell, TableRow } from "../ui/table";
import { ActionDialog } from "./actionDialog";
import { AlertDialogComponent } from "../shared/alertComponent";
import { DropDownMenuCell } from "./dropDownMenuCell";
import { usePageType } from "@/context/pageTypeContext";
import { FormProfessor } from "../cadastrar/formularios/formProfessor";
import { FormAluno } from "../cadastrar/formularios/formAluno";
import { FormDisciplina } from "../cadastrar/formularios/formDisciplina";
import { FormUsuario } from "../cadastrar/formularios/formUsuario";
import { Aluno } from "@/types/aluno";
import { Servidor } from "@/types/servidor";
import { Disciplina } from "@/types/disciplina";
import { ItemView } from "./itemView";
import { deleteAluno } from "@/api/aluno/alunoServices";
import { toast } from "sonner";
import { deleteDisciplina } from "@/api/disciplina/disciplinaServices";
import { deleteUsuario } from "@/api/usuario/usuarioServices";
import { deleteProfessor } from "@/api/professor/professorServices";

type Props = {
  item: TypeProfessorCadastro | Aluno | Servidor | Disciplina | any;
  onRefresh?: () => void;
}

export const ItemTable = ({ item, onRefresh }: Props) => {
  const { type } = usePageType();

  let renderPageEdit: React.ReactNode = null;

  switch (type) {
    case "professor":
      renderPageEdit = <FormProfessor isEdit={true} defaultValues={item} onRefresh={onRefresh} />;
      break;
    case "aluno":
      renderPageEdit = <FormAluno isEdit={true} defaultValues={item} onRefresh={onRefresh} />;
      break;
    case "disciplina":
      renderPageEdit = <FormDisciplina isEdit={true} defaultValues={item} onRefresh={onRefresh} />;
      break;
    case "usuario":
      renderPageEdit = <FormUsuario isEdit={true} defaultValues={item} onRefresh={onRefresh} />;
      break;
  }
  const handleDelete = async (id: number) => {
    try {
      switch (type) {
        case "aluno":
          await deleteAluno(id);
          break;
        case "professor":
          await deleteProfessor(id);
          break;
        case "disciplina":
          await deleteDisciplina(id);
          break;
        case "usuario":
          await deleteUsuario(id);
          break;
      }
      toast.success(`${type} deletado com sucesso!`);
      // Recarregar a página ou atualizar a lista
      if (onRefresh) {
        onRefresh();
      }
      // TODO: Melhor seria passar uma função de callback do componente pai para atualizar a lista
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      toast.error(error.response?.data?.message || `Erro ao deletar ${type}`);
    }
  }

  if (!renderPageEdit) return null;

  // Para aluno e servidor: todos os campos estão em user_data
  // Para professor: pode ter estrutura plana ou aninhada
  // Para disciplina: estrutura diferente (nome, sigla, etc)
  let name = "";
  let email = "";
  let telefone = "";
  let id = null;

  if (type === "disciplina") {
    name = item.nome || "";
    email = item.sigla || "";
    telefone = item.area_conhecimento || "";
    id = item.id || "";
  } else {
    name = item.user_data?.name || item.name || item.nome || "";
    email = item.user_data?.email || item.email || "";
    telefone = item.user_data?.telefone || item.telefone || "";
    id = item.user_data?.id_user || item.id_user || "";
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="hidden md:table-cell">{email}</TableCell>
      <TableCell className="hidden md:table-cell">{telefone}</TableCell>
      <TableCell>
        <div className="flex lg:hidden items-center justify-end">
          <DropDownMenuCell />
        </div>
        <div className="hidden lg:flex items-center justify-end gap-1">
          <AlertDialogComponent
            onConfirm={() => handleDelete(id as number)}
            triggerClassName="bg-red-500"
            triggerIcon="delete"
            triggerTooltip={`Deletar ${type}`}
            dialogTitle={`Deletar ${type}`}
            dialogDescription={`Tem certeza que deseja deletar este ${type}? Essa ação não poderá ser desfeita.`}
          />
          <ActionDialog
            triggerIcon="edit"
            triggerTooltip={`Alterar Dados ${type}`}
            triggerClassName="bg-secundaria"
            dialogTitle={`Editar ${type}`}
          >
            {renderPageEdit}
          </ActionDialog>

          <ActionDialog
            triggerIcon="view"
            triggerTooltip={`Ver mais`}
            triggerClassName="bg-secundaria1"
            dialogClassName="min-w-[75vw]"
            dialogTitle={`Visualizar ${type}`}
          >
            <ItemView id={item.id_user} />
          </ActionDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

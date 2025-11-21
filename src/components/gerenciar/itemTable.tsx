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

type Props = {
  item: TypeProfessorCadastro | Aluno | Servidor | Disciplina | any;
}

export const ItemTable = ({ item }: Props) => {
  const { type } = usePageType();

  let renderPageEdit: React.ReactNode = null;

  switch (type) {
    case "professor":
      renderPageEdit = <FormProfessor isEdit={true} defaultValues={item} />;
      break;
    case "aluno":
      renderPageEdit = <FormAluno isEdit={true} defaultValues={item} />;
      break;
    case "disciplina":
      renderPageEdit = <FormDisciplina isEdit={true} defaultValues={item} />;
      break;
    case "usuario":
      renderPageEdit = <FormUsuario isEdit={true} defaultValues={item} />;
      break;
  }

  if (!renderPageEdit) return null;

  // Para aluno e servidor: todos os campos estão em user_data
  // Para professor: pode ter estrutura plana ou aninhada
  // Para disciplina: estrutura diferente (nome, sigla, etc)
  let name = "";
  let email = "";
  let telefone = "";

  if (type === "disciplina") {
    name = item.nome || "";
    email = item.sigla || "";
    telefone = item.area_conhecimento || "";
  } else {
    name = item.user_data?.name || item.name || item.nome || "";
    email = item.user_data?.email || item.email || "";
    telefone = item.user_data?.telefone || item.telefone || "";
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
            <ItemView id={item.id} />
          </ActionDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

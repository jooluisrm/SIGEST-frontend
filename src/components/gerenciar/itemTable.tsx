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

type Props = {
    item: TypeProfessorCadastro | Aluno | any;
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

    // Para aluno: todos os campos estão em user_data
    // Para professor: pode ter estrutura plana ou aninhada
    const name = item.user_data?.name || item.name || item.nome || "";
    const email = item.user_data?.email || item.email || "";
    const telefone = item.user_data?.telefone || item.telefone || "";

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
                        dialogTitle={`Visualizar ${type}`}
                    >
                        <p>Aqui dentro vão os detalhes do {type}...</p>
                        {/* Ex: <UserDetails user={...} /> */}
                    </ActionDialog>
                </div>
            </TableCell>
        </TableRow>
    );
}
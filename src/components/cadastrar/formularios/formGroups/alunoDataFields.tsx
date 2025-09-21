import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm"
import { FormFieldText } from "../formComponents/formFieldText";

type Props = {
    isEdit?: boolean;
}

export const AlunoDataFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Dados Escolares" />

            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>
                <FormFieldText
                    form={form}
                    name="matricula"
                    label="Matrícula"
                    placeholder="Ex: 123456"
                />
                <FormFieldText
                    form={form}
                    name="turma"
                    label="Turma"
                    placeholder="Ex: 123456"
                />
            </div>
        </>
    )
}
import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm"
import { FormFieldText } from "../formComponents/formFieldText";

type Props = {
    isEdit?: boolean;
}

export const UsuarioDataFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Informação Profissional" />

            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>
                <FormFieldText
                    form={form}
                    name="acesso"
                    label="Acesso"
                    placeholder="Ex: Professor"
                />
            </div>
        </>
    )
}
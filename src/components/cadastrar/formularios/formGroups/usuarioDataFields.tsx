import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm"
import { FormFieldText } from "../formComponents/formFieldText";

export const UsuarioDataFields = () => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Informação Profissional" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
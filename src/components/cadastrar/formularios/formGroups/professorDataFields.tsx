import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldMask } from "../formComponents/formFielMask";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarioCadastro } from "@/components/ui/calendarioCadastro";

export const ProfessorDataFields = () => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Informação Profissional" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                <FormFieldText
                    form={form}
                    name="matriculaAdpm"
                    label="Matrícula ADPM"
                    placeholder="Ex: 123456"
                />
                <FormFieldText
                    form={form}
                    name="codigoDisciplina"
                    label="Código Disciplina"
                    placeholder="Ex: 123456"
                />
            </div>
        </>
    )
}
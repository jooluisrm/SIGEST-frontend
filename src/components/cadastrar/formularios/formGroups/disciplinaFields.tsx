import { FormFieldText } from "../formComponents/formFieldText"
import { useFormContext } from "react-hook-form";
import { FormFieldSelect } from "../formComponents/formFieldSelect";

type Props = {
    isEdit?: boolean;
}

export const DisciplinaFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

    return (
        <>
            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>
                <FormFieldText
                    form={form}
                    name="nomeDisciplina"
                    label="Nome da Disciplina"
                    placeholder="Digite o nome da disciplina"
                />

                <FormFieldSelect
                    form={form}
                    name="areaConhecimento"
                    label="Área de Conhecimento"
                    options={[
                        { value: "area1", label: "Linguagens" },
                        { value: "area2", label: "aaaaa" },
                        { value: "area3", label: "aaaaa" },
                    ]}
                    placeholder="Selecione uma área de conhecimento"
                />

                <FormFieldSelect
                    form={form}
                    name="serie"
                    label="Série"
                    options={[
                        { value: "serie1", label: "6* ano" },
                        { value: "serie2", label: "aaaaa" },
                        { value: "serie3", label: "aaaaa" },
                    ]}
                    placeholder="Selecione uma área de conhecimento"
                />
            </div>
        </>
    )
}
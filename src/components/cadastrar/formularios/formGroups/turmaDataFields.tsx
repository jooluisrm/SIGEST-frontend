import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormFieldText } from "../formComponents/formFieldText";

type Option = {
  value: string;
  label: string;
};

type Props = {
  periodOptions: Option[];
};

export const TurmaDataFields = ({ periodOptions }: Props) => {
  const form = useFormContext();

  return (
    <>
      <TitleForm text="Informações da Turma" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormFieldSelect
          form={form}
          name="periodoId"
          label="Período"
          options={periodOptions}
          placeholder="Selecione o período"
        />
        <FormFieldText
          form={form}
          name="nome"
          label="Nome da Turma"
          placeholder="Ex: Turma A"
        />
        <FormFieldText
          form={form}
          name="maximoAlunos"
          label="Máximo de Alunos"
          type="number"
          placeholder="Ex: 30"
        />
        <FormFieldSelect
          form={form}
          name="turno"
          label="Turno"
          options={[
            { value: "Matutino", label: "Matutino" },
            { value: "Vespertino", label: "Vespertino" },
            { value: "Noturno", label: "Noturno" },
          ]}
          placeholder="Selecione o turno"
        />
        <FormFieldSelect
          form={form}
          name="status"
          label="Status"
          options={[
            { value: "ativo", label: "Ativo" },
            { value: "inativo", label: "Inativo" },
          ]}
          placeholder="Selecione o status"
        />
      </div>
    </>
  );
};

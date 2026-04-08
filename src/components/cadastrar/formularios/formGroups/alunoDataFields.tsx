import { useFormContext } from "react-hook-form";
import { TitleForm } from "../formComponents/titleForm";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { FormFieldText } from "../formComponents/formFieldText";

type Option = {
  value: string;
  label: string;
};

type Props = {
  isEdit?: boolean;
  periodOptions: Option[];
  classroomOptions: Option[];
  classroomDisabled?: boolean;
};

export const AlunoDataFields = ({
  isEdit = false,
  periodOptions,
  classroomOptions,
  classroomDisabled,
}: Props) => {
  const form = useFormContext();

  return (
    <>
      <TitleForm text="Dados Escolares" />

      <div
        className={`${
          !isEdit
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "grid md:grid-cols-1 lg:grid-cols-2 gap-4"
        }`}
      >
        <FormFieldText
          form={form}
          name="matricula"
          label="Matrícula"
          placeholder="Ex: 123456"
        />
        <FormFieldSelect
          form={form}
          name="periodoId"
          label="Período"
          options={periodOptions}
          placeholder="Selecione o período"
        />
        <FormFieldSelect
          form={form}
          name="turmaId"
          label="Turma"
          options={classroomOptions}
          placeholder={
            classroomDisabled ? "Selecione um período primeiro" : "Selecione a turma"
          }
          disabled={classroomDisabled}
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

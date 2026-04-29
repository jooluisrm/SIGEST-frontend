import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { FormFieldSelect } from "../formComponents/formFieldSelect";
import { TitleForm } from "../formComponents/titleForm";

export const AvaliacaoDataFields = () => {
  const form = useFormContext();

  return (
    <div className="flex flex-col gap-10">
      <TitleForm text="Dados da Avaliação" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <FormFieldText 
          form={form} 
          name="titulo" 
          label="Título Avaliação" 
          placeholder="Insira o título da avaliação" 
        />
        <FormFieldText 
          form={form} 
          name="valor" 
          label="Valor Máximo" 
          type="number" 
          placeholder="Ex: 10" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <FormFieldSelect
          form={form}
          name="tipo"
          label="Tipo Avaliação"
          options={[
            { value: "prova", label: "Prova" },
            { value: "trabalho", label: "Trabalho" },
            { value: "projeto", label: "Projeto" }
          ]}
          placeholder="Selecione o tipo"
        />
        <FormFieldSelect
          form={form}
          name="turma"
          label="Turma"
          options={[
            { value: "111", label: "Turma 111" },
            { value: "222", label: "Turma 222" }
          ]}
          placeholder="Selecione a turma"
        />
        <FormFieldText 
          form={form} 
          name="data" 
          label="Data de Realização" 
          type="date" 
        />
      </div>
    </div>
  );
};

import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";

type Props = {
    isEdit?: boolean;
}

export const AuthFields = ({ isEdit = false }: Props) => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Senha e Segurança" />
            <div className={`${!isEdit ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid md:grid-cols-1 lg:grid-cols-2 gap-4'}`}>

                <FormFieldText
                    form={form}
                    name="senha"
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                />
                <FormFieldText
                    form={form}
                    name="confirmarSenha"
                    label="Confirmar Senha"
                    type="password"
                    placeholder="Repita sua senha"
                />
            </div>
        </>
    )
}
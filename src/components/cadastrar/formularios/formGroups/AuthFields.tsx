import { useFormContext } from "react-hook-form";
import { FormFieldText } from "../formComponents/formFieldText";
import { TitleForm } from "../formComponents/titleForm";

export const AuthFields = () => {

    const form = useFormContext();

    return (
        <>
            <TitleForm text="Senha e Segurança" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

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
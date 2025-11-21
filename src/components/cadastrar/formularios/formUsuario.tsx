import { Form } from "@/components/ui/form";
import { usePageType } from "@/context/pageTypeContext";
import { CadastroUsuarioSchema, cadastroUsuarioSchema } from "@/lib/schemas/cadastroUsuarioSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { PersonalDataFields } from "./formGroups/personalDataFields";
import { AddressFields } from "./formGroups/addressFields";
import { AuthFields } from "./formGroups/AuthFields";
import { UsuarioDataFields } from "./formGroups/usuarioDataFields";
import { FormButtons } from "./formComponents/formButtons";
import { postCadastrarUsuario, putAtualizarUsuario } from "@/api/usuario/usuarioServices";
import { toast } from "sonner";
import { TypeServidorCadastro } from "@/types/servidor";

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroUsuarioSchema;
    onRefresh?: () => void;
}

export const FormUsuario = ({ isEdit = false, defaultValues, onRefresh }: Props) => {

    const { type } = usePageType();
    if (type !== "usuario") return null;

    const schema = cadastroUsuarioSchema(isEdit);
    let form = useForm<z.infer<typeof schema>>();

    // Extrair o ID do usuário para uso posterior
    let usuarioId: number | null = null;
    if (isEdit && defaultValues) {
        const userData = (defaultValues as any).user_data || defaultValues;
        usuarioId = userData.id_user || (defaultValues as any).id_user || null;
    }

    if (isEdit) {
        if (!defaultValues) return null;
        
        // Função auxiliar para criar Date válida
        const createValidDate = (dateString: string | null | undefined): Date | undefined => {
            if (!dateString) return undefined;
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? undefined : date;
        };

        // Verifica se defaultValues tem estrutura aninhada (user_data) ou plana
        const userData = (defaultValues as any).user_data || defaultValues;

        // Normaliza o gênero para minúsculo
        const normalizeGenero = (genero: string | null | undefined): string => {
            if (!genero) return "";
            return genero.toLowerCase();
        };

        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeCompleto: userData.name || userData.nome || "",
                dataNascimento: createValidDate(userData.data_nascimento),
                cpf: userData.cpf || "",
                rg: userData.rg || "",
                genero: normalizeGenero(userData.genero),
                nomeDoPai: userData.nome_pai || "",
                nomeDaMae: userData.nome_mae || "",
                possuiDeficiencia: userData.deficiencia && userData.deficiencia !== "Nenhuma" ? "sim" : "nao",
                qualDeficiencia: userData.deficiencia && userData.deficiencia !== "Nenhuma" ? userData.deficiencia : "",
                logradouro: userData.logradouro || "",
                numero: userData.numero || "",
                bairro: userData.bairro || "",
                complemento: userData.complemento || "",
                cidade: userData.cidade || "",
                estado: userData.estado || "",
                telefone: userData.telefone || "",
                celular: userData.celular || "",
                email: userData.email || "",
                cargo: userData.cargo || "",  // mudança aqui
                setor: userData.setor || "",  // mudança aqui
                senha: "",
                confirmarSenha: ""
            },
        });
    } else {
        form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
            defaultValues: {
                nomeCompleto: "",
                dataNascimento: undefined,
                cpf: "",
                rg: "",
                genero: "",
                nomeDoPai: "",
                nomeDaMae: "",
                possuiDeficiencia: "nao",
                qualDeficiencia: "",
                logradouro: "",
                numero: "",
                bairro: "",
                complemento: "",
                cidade: "",
                estado: "",
                telefone: "",
                celular: "",
                email: "",
                cargo: "",  // mudança aqui
                setor: "",  // mudança aqui
                senha: "",
                confirmarSenha: ""
            },
        });
    }


        const [isSubmitting, setIsSubmitting] = useState(false);

        const onSubmit = async (data: z.infer<typeof schema>) => {
            if (type !== "usuario") return;

            setIsSubmitting(true);

            // Função para capitalizar primeira letra do gênero
            const capitalizeGenero = (genero: string): string => {
                if (!genero) return "";
                return genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
            };

            const dataToSend: TypeServidorCadastro = {
                name: data.nomeCompleto,
                data_nascimento: data.dataNascimento 
                    ? new Date(data.dataNascimento).toISOString().split("T")[0]
                    : "",
                cpf: data.cpf,
                rg: data.rg,
                genero: capitalizeGenero(data.genero),
                nome_pai: data.nomeDoPai,
                nome_mae: data.nomeDaMae,
                deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "Nenhuma",
                logradouro: data.logradouro,
                numero: data.numero,
                bairro: data.bairro,
                complemento: data.complemento,
                cidade: data.cidade,
                estado: data.estado,
                telefone: data.telefone,
                celular: data.celular,
                email: data.email,
                cargo: data.cargo,
                setor: data.setor
            };

            // Só incluir senha se foi preenchida (em modo de edição)
            if (data.senha && data.senha.trim() !== "") {
                (dataToSend as any).password = data.senha;
            }

            try {
                if (isEdit && usuarioId) {
                    await putAtualizarUsuario(usuarioId, dataToSend);
                    console.log("Dados atualizados:", dataToSend);
                    // Atualizar a tabela após sucesso
                    if (onRefresh) {
                        onRefresh();
                    }
                } else {
                    await postCadastrarUsuario(dataToSend);
                    console.log("Dados enviados:", dataToSend);
                }
            } catch (error: any) {
                console.log(error.message);
                // O toast já é exibido nas funções de serviço
            } finally {
                setIsSubmitting(false);
            }
        };
        const senhaValue = form.watch("senha");

        useEffect(() => {
            // Dispara a validação para o campo 'confirmarSenha'
            form.trigger("confirmarSenha");
        }, [senhaValue, form.trigger]);

        return (
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex px-5 flex-col mx-1 mb-5 gap-4 w-full md:w-full"
                        noValidate
                    >
                        <PersonalDataFields isEdit={isEdit} />
                        <AddressFields isEdit={isEdit} />
                        <UsuarioDataFields isEdit={isEdit} />
                        <AuthFields isEdit={isEdit} />

                        <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
                    </form>
                </Form>
            </div>
        );
    }
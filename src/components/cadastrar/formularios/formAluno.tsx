"use client"

import { Form } from "@/components/ui/form"
import { PersonalDataFields } from "./formGroups/personalDataFields"
import { AddressFields } from "./formGroups/addressFields"
import { Button } from "@/components/ui/button"
import { usePageType } from "@/context/pageTypeContext"
import { CadastroAlunoSchema, cadastroAlunoSchema } from "@/lib/schemas/cadastroAlunoSchema"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { AlunoDataFields } from "./formGroups/alunoDataFields"
import { FormButtons } from "./formComponents/formButtons"
import { postCadastrarAluno } from "@/api/aluno/alunoServices"
import { toast } from "sonner"
import { AuthFields } from "./formGroups/AuthFields";

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroAlunoSchema;
}

export const FormAluno = ({ isEdit = false, defaultValues }: Props) => {

    const { type } = usePageType();
        if (type !== "aluno") return null;
    
        const schema = cadastroAlunoSchema();
        let form = useForm<z.infer<typeof schema>>();

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
                    matricula: userData.matricula || "",
                    turma: userData.turma || "",
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
                    matricula: "",
                    turma: "",
                    senha: "",
                    confirmarSenha: ""
                },
            });
        }
        
    
        const [isSubmitting, setIsSubmitting] = useState(false);

        const onSubmit = async (data: z.infer<typeof schema>) => {
                if (type !== "aluno") return;
        
                setIsSubmitting(true);
        
                const dataToSend: any = {
                    name: data.nomeCompleto,  // era "nome"
                    data_nascimento: data.dataNascimento 
                        ? new Date(data.dataNascimento).toISOString().split("T")[0]
                        : "",
                    cpf: data.cpf,
                    rg: data.rg,
                    genero: data.genero,
                    nome_pai: data.nomeDoPai,
                    nome_mae: data.nomeDaMae,
                    deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "Nenhuma",  // mudança aqui
                    logradouro: data.logradouro,
                    numero: data.numero,
                    bairro: data.bairro,
                    complemento: data.complemento,
                    cidade: data.cidade,
                    estado: data.estado,
                    telefone: data.telefone,
                    celular: data.celular,
                    email: data.email,
                    password: data.senha,  // novo campo
                    matricula: data.matricula,
                    turma: data.turma
                };
        
                try {
                    await postCadastrarAluno(dataToSend);
                    toast.success("Aluno cadastrado com sucesso");
                } catch (error: any) {
                    toast.error("Erro ao cadastrar aluno");
                } finally {
                    setIsSubmitting(false);
                }
            };

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
                    <AlunoDataFields isEdit={isEdit} />
                    <AuthFields isEdit={isEdit} />  {/* Adicionar esta linha */}

                    <FormButtons isSubmitting={isSubmitting} />
                </form>
            </Form>
        </div>
    )
}
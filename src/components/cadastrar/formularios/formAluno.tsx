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
import { postCadastrarAluno, putAtualizarAluno } from "@/api/aluno/alunoServices"
import { toast } from "sonner"
import { AuthFields } from "./formGroups/AuthFields";
import { TypeAlunoCadastro } from "@/types/aluno";

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroAlunoSchema;
    onRefresh?: () => void;
}

export const FormAluno = ({ isEdit = false, defaultValues, onRefresh }: Props) => {

    const { type } = usePageType();
        if (type !== "aluno") return null;
    
        const schema = cadastroAlunoSchema(isEdit);
        let form = useForm<z.infer<typeof schema>>();

        // Extrair o ID do aluno para uso posterior
        let alunoId: number | null = null;
        if (isEdit && defaultValues) {
            const userData = (defaultValues as any).user_data || defaultValues;
            alunoId = userData.id_user || (defaultValues as any).id_user || null;
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
        
                // Construir objeto de dados para envio
                const dataToSend: any = {
                    name: data.nomeCompleto,
                    rg: data.rg,
                    nome_mae: data.nomeDaMae,
                    deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "Nenhuma",
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    estado: data.estado,
                    celular: data.celular,
                };

                // Campos obrigatórios que podem ter valor vazio mas devem ser enviados
                if (data.dataNascimento) {
                    dataToSend.data_nascimento = new Date(data.dataNascimento).toISOString().split("T")[0];
                }

                // Campos opcionais - só incluir se tiverem valor (evita enviar strings vazias)
                if (data.cpf && data.cpf.trim() !== "") {
                    dataToSend.cpf = data.cpf;
                }
                if (data.genero && data.genero.trim() !== "") {
                    dataToSend.genero = data.genero;
                }
                if (data.nomeDoPai && data.nomeDoPai.trim() !== "") {
                    dataToSend.nome_pai = data.nomeDoPai;
                }
                if (data.numero && data.numero.trim() !== "") {
                    dataToSend.numero = data.numero;
                }
                if (data.complemento && data.complemento.trim() !== "") {
                    dataToSend.complemento = data.complemento;
                }
                if (data.telefone && data.telefone.trim() !== "") {
                    dataToSend.telefone = data.telefone;
                }
                if (data.email && data.email.trim() !== "") {
                    dataToSend.email = data.email;
                }
                if (data.matricula && data.matricula.trim() !== "") {
                    dataToSend.matricula = data.matricula;
                }
                if (data.turma && data.turma.trim() !== "") {
                    dataToSend.turma = data.turma;
                }

                // Só incluir senha se foi preenchida (em modo de edição)
                if (data.senha && data.senha.trim() !== "") {
                    dataToSend.password = data.senha;
                }
        
                try {
                    if (isEdit && alunoId) {
                        await putAtualizarAluno(alunoId, dataToSend);
                        console.log("Dados atualizados:", dataToSend);
                        // Atualizar a tabela após sucesso
                        if (onRefresh) {
                            onRefresh();
                        }
                    } else {
                        await postCadastrarAluno(dataToSend);
                        console.log("Dados enviados:", dataToSend);
                    }
                } catch (error: any) {
                    console.log(error.message);
                    // O toast já é exibido nas funções de serviço
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

                    <FormButtons isSubmitting={isSubmitting} isEdit={isEdit} />
                </form>
            </Form>
        </div>
    )
}
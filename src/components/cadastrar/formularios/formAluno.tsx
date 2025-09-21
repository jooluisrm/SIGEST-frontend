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

type Props = {
    isEdit?: boolean;
    defaultValues?: CadastroAlunoSchema;
}

export const FormAluno = ({ isEdit = false, defaultValues }: Props) => {

    const { type } = usePageType();
        if (type !== "aluno") return null;
    
        const schema = cadastroAlunoSchema();
        let form = useForm<z.infer<typeof schema>>();

        if (isEdit) { //colocar os default values dps
            if (!defaultValues) return null;
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
                    turma: ""
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
                turma: ""
            },
        });
        }
        
    
        const [isSubmitting, setIsSubmitting] = useState(false);

        const onSubmit = async (data: z.infer<typeof schema>) => {
                if (type !== "aluno") return;
        
                setIsSubmitting(true);
        
                const dataToSend: any = {
                    nome: data.nomeCompleto,
                    data_nascimento: new Date(data.dataNascimento)
                        .toISOString()
                        .split("T")[0],
                    cpf: data.cpf,
                    rg: data.rg,
                    genero: data.genero,
                    nome_pai: data.nomeDoPai,
                    nome_mae: data.nomeDaMae,
                    deficiencia: data.possuiDeficiencia === "sim" ? data.qualDeficiencia : "",
                    logradouro: data.logradouro,
                    numero: data.numero,
                    bairro: data.bairro,
                    complemento: data.complemento,
                    cidade: data.cidade,
                    estado: data.estado,
                    telefone: data.telefone,
                    celular: data.celular,
                    email: data.email,
                    matricula: data.matricula,
                    turma: data.turma
                };
        
                try {
                    //await postCadastrarAluno(dataToSend);
                    console.log("Dados enviados:", dataToSend);
                } catch (error: any) {
                    console.log(error.message);
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

                    <Button
                        type="submit"
                        variant="default"
                        className="rounded-2xl text-white bg-secundaria h-14 w-25 mt-5 cursor-pointer hover:bg-secundaria hover:opacity-75"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enviando..." : "Cadastrar"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
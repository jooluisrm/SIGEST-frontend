"use client";

import { z } from "zod";
import { InputCadastro } from "./inputCadastro";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { CalendarioCadastro } from "../ui/calendarioCadastro";
import { postCadastrarProfessor, TypeProfessorCadastro } from "@/api/professor/professorServices";
import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import { Cidade, Estado } from "@/types/endereco";

type Props = {
    user: string
};

const getFormSchema = (user: Props["user"]) =>
    z
        .object({
            nomeCompleto: z
                .string({ required_error: "Nome completo é obrigatório" })
                .min(3, "O nome deve ter no mínimo 3 caracteres."),
            dataNascimento: z
                .date({
                    required_error: "Data de nascimento é obrigatória.",
                })
                .refine(
                    (val) => {
                        return !isNaN(val.getTime()) && val < new Date();
                    },
                    {
                        message: "Data de nascimento inválida",
                    }
                ),
            cpf: z.string().min(14, "O CPF completo é obrigatório"),
            rg: z
                .string({ required_error: "RG é obrigatório" })
                .min(5, "RG inválido"),
            genero: z
                .string({ required_error: "Gênero é obrigatório" })
                .min(1, "Selecione um gênero"),
            nomeDoPai: z
                .string({ required_error: "Nome do pai é obrigatório" })
                .min(3, "O nome do pai deve ter no mínimo 3 caracteres."),
            nomeDaMae: z
                .string({ required_error: "Nome da mãe é obrigatório" })
                .min(3, "O nome do pai deve ter no mínimo 3 caracteres."),
            possuiDeficiencia: z.enum(["sim", "nao"], {
                required_error: "Informe se possui alguma deficiência",
            }),
            qualDeficiencia: z.string().optional(),
            logradouro: z
                .string({ required_error: "O logradouro é obrigatório." })
                .min(3, "O logradouro deve ter no mínimo 3 caracteres."),

            numero: z
                .string({ required_error: "O número é obrigatório." })
                .min(1, "O número é obrigatório."),

            bairro: z
                .string({ required_error: "O bairro é obrigatório." })
                .min(3, "O bairro deve ter no mínimo 3 caracteres."),

            complemento: z.string().optional(),

            cidade: z
                .string({ required_error: "A cidade é obrigatória." })
                .min(3, "A cidade deve ter no mínimo 3 caracteres."),

            estado: z
                .string({ required_error: "O estado é obrigatório." })
                .min(2, "O estado deve ter no mínimo 2 letras (UF)."),

            telefone: z.string().min(10, "O telefone com DDD deve ter no mínimo 10 dígitos."),

            celular: z.string().min(11, "O celular com DDD deve ter 11 dígitos."),

            email: z
                .string({ required_error: "O e-mail é obrigatório." })
                .email("O formato do e-mail é inválido."),

            matriculaAdpm:
                user === "professor"
                    ? z
                        .string({ required_error: "A matrícula ADPM é obrigatória" })
                        .min(1, "A matrícula ADPM não pode ser vazia.")
                    : z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (
                data.possuiDeficiencia === "sim" &&
                (!data.qualDeficiencia || data.qualDeficiencia.trim() === "")
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Por favor, informe qual deficiência.",
                    path: ["qualDeficiencia"],
                });
            }
        });

export const ContainerCadastro = ({ user }: Props) => {
    const schema = getFormSchema(user);
    const form = useForm<z.infer<typeof schema>>({
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
            matriculaAdpm: user === "professor" ? "" : "",
        },
    });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        if (user === "professor") {
            const dataToSend: TypeProfessorCadastro = {
                nome: data.nomeCompleto,
                data_nascimento: new Date(data.dataNascimento).toISOString().split('T')[0],
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
                matricula_adpm: data.matriculaAdpm,
            };

            try {
                await postCadastrarProfessor(dataToSend);
                console.log("Dados enviados:", dataToSend);
            } catch (error: any) {
                console.log(error.message);
            }
        }
    };


    const possuiDeficiencia = form.watch("possuiDeficiencia");


    const [loadingEstado, setLoadingEstado] = useState(false);
    const [loadingCidade, setLoadingCidade] = useState(false);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);

    useEffect(() => {
        setLoadingEstado(true);
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setEstados(data); // Guarda a lista recebida no nosso estado
            }).finally(() => setLoadingEstado(false));
    }, []);

    const estadoSelecionado: string = form.watch("estado");

    useEffect(() => {
        if (!estadoSelecionado) {
            return;
        }

        setLoadingCidade(true);
        form.setValue("cidade", "");

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCidades(data);
            })
            .catch(error => console.error("Falha ao buscar cidades:", error))
            .finally(() => setLoadingCidade(false));
    }, [estadoSelecionado, form]);

    return (
        <div className="flex justify-center mt-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex px-5 flex-col mx-1 mb-5 gap-4 w-[100%] md:w-[70%]"
                    noValidate
                >
                    <p className="text-lg font-semibold my-2">Informações Pessoais:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nomeCompleto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dataNascimento"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <FormControl>
                                        <CalendarioCadastro
                                            value={field.value as Date}
                                            onValueChange={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1940-01-01")
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <IMaskInput
                                            mask="000.000.000-00"
                                            // passe todas as props do field para o input
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            inputRef={field.ref} // ref do react-hook-form
                                            // Prop importante: envia apenas os números
                                            unmask={true}
                                            // onAccept é mais seguro para RHF com unmask
                                            onAccept={(value) => field.onChange(value)}
                                            placeholder="000.000.000-00"
                                            // Adicione as classes do seu input para manter o estilo
                                            className="rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RG</FormLabel>
                                    <FormControl>
                                        <IMaskInput
                                            // Máscara para RG (Ex: padrão SP com dígito alfanumérico)
                                            mask="00.000.000-a"
                                            definitions={{
                                                'a': /[0-9a-zA-Z]/ // O último dígito pode ser letra ou número
                                            }}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            inputRef={field.ref}
                                            unmask={true}
                                            onAccept={(value) => field.onChange(value)}
                                            placeholder="00.000.000-0"
                                            className="rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="genero"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gênero</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um gênero" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="masculino">Masculino</SelectItem>
                                            <SelectItem value="feminino">Feminino</SelectItem>
                                            <SelectItem value="outro">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nomeDoPai"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Pai</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nomeDaMae"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da Mãe</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="possuiDeficiencia"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Possui alguma deficiência?</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            if (value === "nao") {
                                                form.setValue("qualDeficiencia", "", {
                                                    shouldValidate: true,
                                                });
                                            }
                                        }}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="sim">Sim</SelectItem>
                                            <SelectItem value="nao">Não</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {possuiDeficiencia === "sim" && (
                            <FormField
                                control={form.control}
                                name="qualDeficiencia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Qual deficiência?</FormLabel>
                                        <FormControl>
                                            <InputCadastro camp="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>

                    <p className="text-lg font-semibold my-2">Informações de Contato:</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="logradouro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logradouro</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numero"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bairro"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="complemento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    {/* O Select do shadcn/ui entra aqui */}
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={`${!loadingEstado ? "Selecione o estado" : "Carregando..."}`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Aqui nós mapeamos a lista de estados que buscamos na API */}
                                            {estados.map((estado) => (
                                                <SelectItem key={estado.id} value={estado.sigla}>
                                                    {estado.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value} // Usamos 'value' aqui para o RHF controlar o valor
                                        // Desabilita o campo se nenhum estado foi selecionado
                                        disabled={!estadoSelecionado || loadingCidade}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        !loadingCidade ? (estadoSelecionado
                                                            ? "Selecione a cidade"
                                                            : "Primeiro, selecione um estado") : "Carregando..."
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* Mapeamos a lista de cidades do estado selecionado */}
                                            {cidades.map((cidade) => (
                                                <SelectItem key={cidade.id} value={cidade.nome}>
                                                    {cidade.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <IMaskInput
                                            // Máscara dinâmica!
                                            mask={[
                                                { mask: '(00) 0000-0000' },  // Fixo
                                                { mask: '(00) 00000-0000' } // Celular
                                            ]}
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            inputRef={field.ref}
                                            unmask={true}
                                            onAccept={(value) => field.onChange(value)}
                                            placeholder="(99) 9999-9999"
                                            className="rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="celular"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Celular</FormLabel>
                                    <FormControl>
                                        <IMaskInput
                                            mask="(00) 00000-0000" // Máscara para celular com 9º dígito
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            inputRef={field.ref}
                                            unmask={true}
                                            onAccept={(value) => field.onChange(value)}
                                            placeholder="(99) 99999-9999"
                                            className="rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <InputCadastro camp="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {user === "professor" && (
                        <>
                            <p className="text-lg font-semibold my-2">
                                Informação Profissional:
                            </p>
                            <FormField
                                control={form.control}
                                name="matriculaAdpm"
                                render={({ field }) => (
                                    <FormItem className="w-1/4">
                                        <FormLabel>Matrícula ADPM</FormLabel>
                                        <FormControl>
                                            <InputCadastro camp="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    <Button
                        type="submit"
                        variant={"default"}
                        className="rounded-2xl text-white bg-secundaria h-14 w-25 mt-5 cursor-pointer hover:bg-secundaria hover:opacity-75"
                    >
                        Cadastrar
                    </Button>
                </form>
            </Form>
        </div>
    );
};

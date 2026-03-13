import { ActionDialog } from "@/components/gerenciar/actionDialog";

export const AlunosTurmaTables = () => {
    const alunosEnturmados = [
        { mat: "111", nome: "Fulano 1" },
        { mat: "222", nome: "Fulano 2" },
        { mat: "333", nome: "Fulano 3" },
        { mat: "444", nome: "Fulano 4" },
    ];

    const alunosSemEnturmacao = [
        { mat: "111", nome: "Fulano 1" },
        { mat: "222", nome: "Fulano 2" },
        { mat: "333", nome: "Fulano 3" },
        { mat: "444", nome: "Fulano 4" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4 p-4 pb-8 items-start">

            <div>
                <h4 className="font-bold text-sm mb-3 text-black pl-2">Alunos Enturmados</h4>
                <div className="border rounded-md border-gray-200">
                    <div className="grid grid-cols-[1fr_2fr_1fr] bg-white border-b px-4 py-2 font-bold text-xs">
                        <div>Matrícula</div>
                        <div>Nome do aluno</div>
                        <div></div>
                    </div>
                    <div className="bg-white">
                        {alunosEnturmados.map((aluno, i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-[1fr_2fr_1fr] px-4 py-3 text-sm items-center border-b last:border-0 hover:bg-gray-50`}
                            >
                                <div>{aluno.mat}</div>
                                <div>{aluno.nome}</div>
                                <div className="flex justify-end gap-1">
                                    <ActionDialog
                                        triggerIcon="delete"
                                        triggerTooltip={`Desenturmar ${aluno.nome}`}
                                        triggerClassName="bg-red-500 w-6 h-6 p-1"
                                        dialogTitle="Ação Necessária"
                                    >
                                        <div className="p-4 text-center">Desenturmar Aluno aqui</div>
                                    </ActionDialog>
                                    <ActionDialog
                                        triggerIcon="view"
                                        triggerTooltip="Visualizar"
                                        triggerClassName="bg-[#2D6086] w-6 h-6 p-1"
                                        dialogTitle="Visualizar"
                                    >
                                        <div className="p-4">Visualizando Aluno</div>
                                    </ActionDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-sm mb-3 text-black pl-2">Alunos Sem Enturmação</h4>
                <div className="border rounded-md border-gray-200">
                    <div className="grid grid-cols-[1fr_2fr_1fr] bg-white border-b px-4 py-2 font-bold text-xs">
                        <div>Matrícula</div>
                        <div>Nome do aluno</div>
                        <div></div>
                    </div>
                    <div className="bg-white">
                        {alunosSemEnturmacao.map((aluno, i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-[1fr_2fr_1fr] px-4 py-3 text-sm items-center border-b last:border-0 hover:bg-gray-50`}
                            >
                                <div>{aluno.mat}</div>
                                <div>{aluno.nome}</div>
                                <div className="flex justify-end gap-1">
                                    <ActionDialog
                                        triggerIcon="add"
                                        triggerTooltip={`Enturmar ${aluno.nome}`}
                                        triggerClassName="bg-[#00923F] w-6 h-6 p-1"
                                        dialogTitle="Ação Necessária"
                                    >
                                        <div className="p-4 text-center">Enturmar Aluno</div>
                                    </ActionDialog>
                                    <ActionDialog
                                        triggerIcon="view"
                                        triggerTooltip="Visualizar"
                                        triggerClassName="bg-[#2D6086] w-6 h-6 p-1"
                                        dialogTitle="Visualizar"
                                    >
                                        <div className="p-4">Visualizando Aluno</div>
                                    </ActionDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

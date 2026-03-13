"use client";

import { useState } from "react";
import { FormCurso } from "@/components/layouts_isolados/formCurso";
import { ModalGerarTurmas } from "@/components/layouts_isolados/modalGerarTurmas";
import { ModalCriarTurmaTurno } from "@/components/layouts_isolados/modalCriarTurmaTurno";
import { ModalEnturmarAluno } from "@/components/layouts_isolados/modalEnturmarAluno";
import { ModalDesenturmarAluno } from "@/components/layouts_isolados/modalDesenturmarAluno";
import { ModalQuantidadeMaximaAlunos } from "@/components/layouts_isolados/modalQuantidadeMaximaAlunos";
import { CursoExpandedView } from "@/components/layouts_isolados/curso/cursoExpandedView";
import { Button } from "@/components/ui/button";

export default function SandboxPage() {
    const [openGerarTurmas, setOpenGerarTurmas] = useState(false);
    const [openCriarTurmaTurno, setOpenCriarTurmaTurno] = useState(false);
    const [openEnturmarAluno, setOpenEnturmarAluno] = useState(false);
    const [openDesenturmarAluno, setOpenDesenturmarAluno] = useState(false);
    const [openQuantidadeMaxima, setOpenQuantidadeMaxima] = useState(false);

    const mockCurso = {
        nome: "Ensino Médio - Integral",
        periodos: "3",
        carga_horaria: "3200h",
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 space-y-16 pb-24">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">Layouts</h1>
            </div>

            <section className="max-w-6xl mx-auto space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">1. Modais de Ação</h2>
                <div className="flex flex-wrap gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <Button onClick={() => setOpenGerarTurmas(true)} className="bg-blue-600 hover:bg-blue-700">
                        Gerar Turmas
                    </Button>
                    <Button onClick={() => setOpenCriarTurmaTurno(true)} className="bg-green-600 hover:bg-green-700">
                        Criar Turma Turno
                    </Button>
                    <Button onClick={() => setOpenEnturmarAluno(true)} className="bg-purple-600 hover:bg-purple-700">
                        Enturmar Aluno
                    </Button>
                    <Button onClick={() => setOpenDesenturmarAluno(true)} className="bg-red-600 hover:bg-red-700">
                        Desenturmar Aluno
                    </Button>
                    <Button onClick={() => setOpenQuantidadeMaxima(true)} className="bg-orange-600 hover:bg-orange-700">
                        Quantidade Máxima
                    </Button>
                </div>

                <ModalGerarTurmas isOpen={openGerarTurmas} onOpenChange={setOpenGerarTurmas} />
                <ModalCriarTurmaTurno isOpen={openCriarTurmaTurno} onOpenChange={setOpenCriarTurmaTurno} />
                <ModalEnturmarAluno isOpen={openEnturmarAluno} onOpenChange={setOpenEnturmarAluno} />
                <ModalDesenturmarAluno isOpen={openDesenturmarAluno} onOpenChange={setOpenDesenturmarAluno} />
                <ModalQuantidadeMaximaAlunos isOpen={openQuantidadeMaxima} onOpenChange={setOpenQuantidadeMaxima} />
            </section>

            <section className="max-w-6xl mx-auto space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <FormCurso />
                </div>
            </section>

            <section className="max-w-6xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <CursoExpandedView item={mockCurso} />
                </div>
            </section>

        </div>
    );
}

"use client";

import { usePageType } from "@/context/pageTypeContext";
import { FormProfessor } from "./formularios/formProfessor";
import { FormServidor } from "./formularios/formServidor";
import { FormAluno } from "./formularios/formAluno";
import { FormDisciplina } from "./formularios/formDisciplina";

export const ContainerCadastro = () => {
    const { type } = usePageType();
    if (!type) return null;

    let pageRender: React.ReactNode = null;

    switch (type) {
        case "professor":
            pageRender = <FormProfessor />;
            break;
        case "servidor":
            pageRender = <FormServidor />;
            break;
        case "aluno":
            pageRender = <FormAluno />;
            break;
        case "disciplina":
            pageRender = <FormDisciplina />;
            break;
    }

    return <div className="mt-10">{pageRender}</div>;
};

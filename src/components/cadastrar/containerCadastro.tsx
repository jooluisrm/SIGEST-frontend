"use client";

import { usePageType } from "@/context/pageTypeContext";
import { FormProfessor } from "./formularios/formProfessor";
import { FormAluno } from "./formularios/formAluno";
import { FormDisciplina } from "./formularios/formDisciplina";
import { FormUsuario } from "./formularios/formUsuario";

export const ContainerCadastro = () => {
    const { type } = usePageType();
    if (!type) return null;

    let pageRender: React.ReactNode = null;

    switch (type) {
        case "professor":
            pageRender = <FormProfessor />;
            break;
        case "aluno":
            pageRender = <FormAluno />;
            break;
        case "disciplina":
            pageRender = <FormDisciplina />;
            break;
        case "usuario": 
            pageRender = <FormUsuario />;
    }

    return <div className="mt-10">{pageRender}</div>;
};

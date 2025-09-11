"use client";

import { usePageType } from "@/context/pageTypeContext";
import { FormProfessor } from "./formularios/formProfessor";
import { FormServidor } from "./formularios/formServidor";
import { FormAluno } from "./formularios/formAluno";

export const ContainerCadastro = () => {
  const { type: user } = usePageType();
  if (!user) return null;

  return (
    <>
      {user === "professor" && <FormProfessor />}
      {user === "servidor" && <FormServidor />}
      {user === "aluno" && <FormAluno />}
    </>
  );
};

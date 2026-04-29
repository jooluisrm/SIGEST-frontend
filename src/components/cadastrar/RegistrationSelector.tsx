"use client";

import { usePageType } from "@/context/pageTypeContext";
import { MainCadastrar } from "./mainCadastrar";
import { TitlePage } from "../shared/titlePage";
import { FormCurso } from "./formularios/formCurso";
import { FormDisciplina } from "./formularios/formDisciplina";
import { FormAvaliacao } from "./formularios/formAvaliacao";

export const RegistrationSelector = () => {
  const { type } = usePageType();

  if (type === "curso") {
    return (
      <main className="min-h-screen py-10">
        <div className="container mx-auto px-5">
          <TitlePage title="Cadastrar" />
          <div className="mt-8 bg-white/95 backdrop-blur-md p-12 md:p-20 rounded-[40px] shadow-2xl border-none max-w-6xl mx-auto">
            <FormCurso/>
          </div>
        </div>
      </main>
    );
  }

  if (type === "disciplina") {
    return (
      <main className="min-h-screen py-10">
        <div className="container mx-auto px-5">
          <TitlePage title="Cadastrar" />
          <div className="mt-8 bg-white/95 backdrop-blur-md p-12 md:p-20 rounded-[40px] shadow-2xl border-none max-w-6xl mx-auto">
            <FormDisciplina />
          </div>
        </div>
      </main>
    );
  }

  if (type === "avaliacao") {
    return (
      <main className="min-h-screen py-10">
        <div className="container mx-auto px-5">
          <TitlePage title="Cadastrar" />
          <div className="mt-8 bg-white/95 backdrop-blur-md p-12 md:p-20 rounded-[40px] shadow-2xl border-none max-w-6xl mx-auto">
            <FormAvaliacao />
          </div>
        </div>
      </main>
    );
  }

  return <MainCadastrar />;
};

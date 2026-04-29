"use client";

import { usePageType } from "@/context/pageTypeContext";
import { MainGerenciar } from "./mainGerenciar";
import { GerenciarAvaliacaoList } from "./specialized/GerenciarAvaliacaoList";

export const ManagementSelector = () => {
  const { type } = usePageType();

  if (type === "avaliacao") {
    return <GerenciarAvaliacaoList />;
  }

  return <MainGerenciar />;
};

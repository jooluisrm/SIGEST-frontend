"use client";

import { moduleRegistry } from "@/config/module-registry";
import { usePageType } from "@/context/pageTypeContext";

export const ContainerCadastro = () => {
  const { type } = usePageType();

  if (!type) {
    return null;
  }

  return <div className="mt-10">{moduleRegistry[type].renderForm?.({}) ?? null}</div>;
};

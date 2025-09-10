"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipos válidos da sua aplicação (pode expandir futuramente)
export type PageType = "aluno" | "professor" | "servidor";

type PageTypeContextProps = {
  type: PageType | null;
  setType: (type: PageType) => void;
};

const PageTypeContext = createContext<PageTypeContextProps | undefined>(undefined);

// context/PageTypeContext.tsx
export const PageTypeProvider = ({ children, initialType }: { children: ReactNode, initialType?: PageType }) => {
  const [type, setType] = useState<PageType | null>(initialType ?? null);

  return (
    <PageTypeContext.Provider value={{ type, setType }}>
      {children}
    </PageTypeContext.Provider>
  );
};


export const usePageType = () => {
  const context = useContext(PageTypeContext);
  if (!context) {
    throw new Error("usePageType deve ser usado dentro de um PageTypeProvider");
  }
  return context;
};


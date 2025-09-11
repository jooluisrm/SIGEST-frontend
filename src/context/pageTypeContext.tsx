"use client";

import { PageTypeCentral } from "@/types/routerType";
import { createContext, useContext, useState, ReactNode } from "react";

type PageTypeContextProps = {
  type: PageTypeCentral | null;
  setType: (type: PageTypeCentral) => void;
};

const PageTypeContext = createContext<PageTypeContextProps | undefined>(undefined);

export const PageTypeProvider = ({
  children,
  initialType,
}: {
  children: ReactNode;
  initialType?: PageTypeCentral;
}) => {
  const [type, setType] = useState<PageTypeCentral | null>(initialType ?? null);

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

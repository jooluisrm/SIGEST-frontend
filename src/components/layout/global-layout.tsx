"use client";

import { LogoFundo } from "@/components/shared/logo-fundo";
import { HeaderGlobal } from "../shared/headerGlobal";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export const GlobalLayout = ({ children }: Props) => {
  const pathname = usePathname();

  // Se estiver na rota /login, não mostra header/global layout
  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div>
      <HeaderGlobal />
      <main className="mt-20">
        <LogoFundo />
        <div className="bg-white/70 min-h-screen pb-20">{children}</div>
      </main>
    </div>
  );
};

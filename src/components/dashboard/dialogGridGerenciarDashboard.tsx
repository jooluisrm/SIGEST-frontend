"use client";

import { hasModuleAccess, MODULES } from "@/config/modules";
import { useUser } from "@/context/loginUsersContext";
import { ItemGridDashboard } from "./itemGridDashboard";

const iconMap = {
  usuario: "/assets/servidor-icon.png",
  professor: "/assets/professor-icon.png",
  aluno: "/assets/aluno-icon.png",
  disciplina: "/assets/disciplina-icon.png",
  curso: "/assets/cadastro-icon.png",
  periodo: "/assets/relatorio-icon.png",
  turma: "/assets/relatorio-icon.png",
} as const;

export const DialogGridGerenciarDashboard = () => {
  const { role } = useUser();

  const modules = MODULES.filter(
    (module) => module.capabilities.manage && hasModuleAccess(role, module)
  );

  return (
    <div className="px-5 pb-5 grid gap-5 grid-cols-1 md:grid-cols-3">
      {modules.map((module) => (
        <ItemGridDashboard
          key={module.slug}
          bg={2}
          text={module.label}
          iconPath={iconMap[module.slug]}
          link={`/gerenciar/${module.slug}`}
        />
      ))}
    </div>
  );
};

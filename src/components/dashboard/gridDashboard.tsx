"use client";

import { toast } from "sonner";
import { DialogGerenciarDashboard } from "./dialogGerenciarDashboard";
import { ItemGridDashboard } from "./itemGridDashboard";
import { useUser } from "@/context/loginUsersContext";

export const GridDashboard = () => {
  const { role } = useUser();
  const canSeeFrequency = role.includes("professor") || role.includes("admin");

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
      <DialogGerenciarDashboard />
      {canSeeFrequency && (
        <ItemGridDashboard
          text="Frequência"
          bg={1}
          iconPath="/assets/nota-icon.png"
          onClick={() =>
            toast.info("O backend de frequências ainda está em modo stub.")
          }
          disabled
        />
      )}
      <ItemGridDashboard
        text="Relatórios"
        bg={1}
        iconPath="/assets/relatorio-icon.png"
        disabled
      />
    </div>
  );
};

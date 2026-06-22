"use client";

import { BemVindo } from "../PaginaInicial/bemVindo";
import { GridDashboard } from "./gridDashboard";
import { useUser } from "@/context/loginUsersContext";
import { ProfessorDashboard } from "./ProfessorDashboard";

export const MainDashboard = () => {
  const { role } = useUser();
  const isProfessor = role.includes("professor");

  if (isProfessor) {
    return (
      <main className="px-5 pt-10 mx-auto container">
        <ProfessorDashboard />
      </main>
    );
  }

  return (
    <main className="px-5 pt-10 mx-auto container">
      <BemVindo />
      <GridDashboard />
    </main>
  );
};

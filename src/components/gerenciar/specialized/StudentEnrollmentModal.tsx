"use client";

import { useState } from "react";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const mockStudents = [
  { id: "111", name: "Fulano 1" },
  { id: "222", name: "Fulano 2" },
  { id: "333", name: "Fulano 3" },
  { id: "444", name: "Fulano 4" },
  { id: "555", name: "Fulano 5" },
];

export const StudentEnrollmentModal = ({ isUnenroll = false }: { isUnenroll?: boolean }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleStudent = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col px-3 gap-8 py-4 max-w-[500px]">
      <div className="w-full relative group">
        <AppInput 
          placeholder="Buscar aluno por nome ou matrícula" 
          icon={<Search size={20} className="text-primaria" />}
          className="h-14 bg-muted/30 border-primaria/20 group-hover:border-primaria/50 transition-all pl-12 rounded-2xl"
        />
      </div>

      <div className="border border-border/50 rounded-3xl overflow-hidden bg-white shadow-inner max-h-[400px] overflow-y-auto">
        <table className="w-full text-left">
          <thead className="bg-muted/30 sticky top-0">
            <tr className="text-xs font-bold text-foreground/70 uppercase tracking-wider h-12">
              <th className="px-6">Matrícula</th>
              <th className="px-6">Nome do aluno</th>
              <th className="px-6 text-center w-20">Selecionar</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((student) => (
              <tr 
                key={student.id} 
                className={cn(
                    "border-t border-border/20 transition-colors cursor-pointer",
                    selected.includes(student.id) ? "bg-primaria/10" : "hover:bg-muted/5"
                )}
                onClick={() => toggleStudent(student.id)}
              >
                <td className="px-6 py-4 font-medium">{student.id}</td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4 text-center">
                  <div className={cn(
                    "w-6 h-6 rounded-md border-2 mx-auto flex items-center justify-center transition-all",
                    selected.includes(student.id) ? "bg-primaria border-primaria text-white" : "border-primaria/30 bg-white"
                  )}>
                    {selected.includes(student.id) && <Check size={14} strokeWidth={4} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <AppButton 
          intent="cancel"
          className="min-w-[200px] h-14 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-all"
        >
          Cancelar
        </AppButton>
        <AppButton 
          intent={isUnenroll ? "cancel" : "done1"}
          className={cn(
            "min-w-[200px] h-14 rounded-2xl text-xl font-bold shadow-lg active:scale-95 transition-all",
            isUnenroll && "bg-primaria"
          )}
        >
          {isUnenroll ? "Desenturmar" : "Enturmar"}
        </AppButton>
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

export const GerarTurmaFlow = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<Step>(1);
  const [shift, setShift] = useState<string>("");

  return (
    <div className="flex flex-col gap-10 py-6">
      {step === 1 && (
        <div className="flex flex-col gap-12">
          <h2 className="text-4xl font-bold text-center">Qual turno você deseja criar a turma?</h2>
          <div className="flex flex-col gap-4">
            {["Matutino", "Vespertino", "Noturno"].map(s => (
              <button 
                key={s}
                onClick={() => { setShift(s); setStep(2); }}
                className="w-full h-14 rounded-xl border border-primaria/20 bg-white hover:bg-primaria/5 transition-all text-xl font-medium shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-12">
          <h2 className="text-4xl font-bold text-center text-foreground/90">Quantas turmas deseja gerar?</h2>
          <div className="flex flex-col gap-6">
            <div className="flex overflow-hidden rounded-2xl border border-primaria/20 bg-white shadow-lg focus-within:border-primaria/50 transition-all">
              <div className="bg-primaria/10 px-8 flex items-center justify-center min-w-[160px] border-r border-primaria/10">
                <span className="font-bold text-primaria text-2xl">{shift}</span>
              </div>
              <AppInput 
                type="number" 
                placeholder="Insira a quantidade de turmas"
                className="flex-1 h-20 px-8 border-none text-2xl placeholder:text-muted-foreground/30 focus:ring-0 shadow-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-4">
            <AppButton 
              onClick={() => setStep(1)} 
              intent="cancel"
              className="min-w-[200px] h-16 rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-all"
            >
              Cancelar
            </AppButton>
            <AppButton 
              onClick={() => setStep(3)} 
              intent="done1"
              className="min-w-[200px] h-16 rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-all"
            >
              Próximo
            </AppButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-12">
          <h2 className="text-4xl font-bold text-center text-foreground/90">Qual o máximo de alunos por turma?</h2>
          <div className="flex flex-col gap-6">
             <div className="flex overflow-hidden rounded-2xl border border-primaria/20 bg-white shadow-lg focus-within:border-primaria/50 transition-all">
              <div className="bg-primaria/10 px-8 flex items-center justify-center min-w-[160px] border-r border-primaria/10">
                <span className="font-bold text-primaria text-2xl">Máximo</span>
              </div>
              <AppInput 
                type="number" 
                placeholder="Insira o máximo de alunos"
                className="flex-1 h-20 px-8 border-none text-2xl placeholder:text-muted-foreground/30 focus:ring-0 shadow-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-4">
            <AppButton 
              onClick={() => setStep(2)} 
              intent="cancel"
              className="min-w-[200px] h-16 rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-all"
            >
              Voltar
            </AppButton>
            <AppButton 
              onClick={onClose} 
              intent="done1"
              className="min-w-[200px] h-16 rounded-2xl text-2xl font-bold shadow-xl active:scale-95 transition-all"
            >
              Concluir
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
};

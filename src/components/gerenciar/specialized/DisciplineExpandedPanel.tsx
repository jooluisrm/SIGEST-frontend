"use client";

import { Search, Info, BarChart2, BookOpen } from "lucide-react";

export const DisciplineExpandedPanel = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 p-8 bg-slate-50/50 rounded-b-2xl border-x border-b border-border/40">

      {/* Large Green Buttons */}
      <div className="flex flex-wrap gap-4 flex-1 justify-center md:justify-start">
        <button className="flex flex-col items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white w-36 h-36 rounded-[1.5rem] transition-all active:scale-95 shadow-lg shadow-green-600/20">
          <span className="text-lg font-bold">Frequencia</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white w-36 h-36 rounded-[1.5rem] transition-all active:scale-95 shadow-lg shadow-green-600/20">
          <span className="text-lg font-bold">Avaliações</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white w-36 h-36 rounded-[1.5rem] transition-all active:scale-95 shadow-lg shadow-green-600/20">
          <span className="text-lg font-bold">Informações</span>
        </button>
      </div>

      {/* Statistics Section */}
      <div className="w-full md:w-80 flex-1 flex-col gap-8">
        <h3 className="text-3xl font-bold text-slate-700 text-center md:text-left mb-2">Estatísticas</h3>

        <div className="flex flex-col gap-6">
          {/* Pontos distribuídos */}
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold text-slate-600">Pontos distribuidos</span>
            <div className="h-8 bg-slate-200 rounded-lg overflow-hidden flex relative">
              <div
                className="bg-green-600 h-full transition-all duration-1000"
                style={{ width: "35%" }}
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm font-bold px-1 rounded">
                35%
              </div>
            </div>
          </div>

          {/* Aulas lançadas */}
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold text-slate-600">Aulas lançadas</span>
            <div className="h-8 bg-slate-200 rounded-lg overflow-hidden flex relative">
              <div
                className="bg-green-600 h-full transition-all duration-1000"
                style={{ width: "20%" }}
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm font-bold px-1 rounded">
                20%
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

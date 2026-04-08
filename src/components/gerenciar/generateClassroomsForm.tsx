"use client";

import { useState } from "react";
import { toast } from "sonner";
import { generateTurmasByPeriodo } from "@/api/periodo/periodoServices";
import { AppButton } from "@/components/shared/app-button";
import { AppInput } from "@/components/shared/app-input";
import { AppSelect } from "@/components/shared/app-select";
import { ActionDialog } from "@/components/gerenciar/actionDialog";

type Props = {
  periodId: number;
  onRefresh?: () => void;
};

export const GenerateClassroomsForm = ({ periodId, onRefresh }: Props) => {
  const [maxStudents, setMaxStudents] = useState("");
  const [shift, setShift] = useState("Matutino");
  const [submitting, setSubmitting] = useState(false);

  const handleGenerate = async () => {
    if (!maxStudents) {
      toast.error("Informe o máximo de alunos.");
      return;
    }

    setSubmitting(true);
    try {
      await generateTurmasByPeriodo(periodId, {
        max_students: Number(maxStudents),
        shift: shift as "Matutino" | "Vespertino" | "Noturno",
      });
      onRefresh?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ActionDialog
      triggerIcon="add"
      triggerTooltip="Gerar turmas"
      triggerClassName="bg-primaria"
      dialogTitle="Gerar turmas"
    >
      <div className="flex flex-col gap-4 px-1 py-2">
        <AppInput
          label="Máximo de alunos"
          type="number"
          value={maxStudents}
          onChange={(event) => setMaxStudents(event.target.value)}
          intent="formCamp"
        />
        <div className="grid gap-1.5">
          <span className="text-sm font-medium">Turno</span>
          <AppSelect
            value={shift}
            onValueChange={setShift}
            options={[
              { value: "Matutino", label: "Matutino" },
              { value: "Vespertino", label: "Vespertino" },
              { value: "Noturno", label: "Noturno" },
            ]}
            className="w-full border-primaria focus-visible:ring-primaria"
          />
        </div>
        <AppButton
          type="button"
          onClick={handleGenerate}
          isLoading={submitting}
          className="self-start"
        >
          Gerar
        </AppButton>
      </div>
    </ActionDialog>
  );
};

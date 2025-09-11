"use client";

import * as React from "react";
import { IMaskInput } from "react-imask";
import { InputCadastro } from "./inputCadastro";
// seu componente de input estilizado

interface InputMask
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask: string | any[];
  value?: string;
  onChange?: (value: string) => void;
  inputStyle?: "form" | "default";
  className?: string;
  [key: string]: any;
}

export const InputMask = React.forwardRef<HTMLInputElement, InputMask>(
  (
    { mask, value, onChange, inputStyle = "form", className, ...props },
    ref
  ) => {
    const baseClass =
      inputStyle === "form"
        ? "rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
        : "";

    return (
      <IMaskInput
        mask={mask}
        value={value}
        unmask={true}
        onAccept={(val: string) => onChange?.(val)}
        inputRef={ref}
        className={`${baseClass} ${className ?? ""}`}
        {...props}
      />
    );
  }
);

InputMask.displayName = "InputMask";

// src/components/ui/app-select.tsx (VERSÃO MELHORADA)

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  value?: string; // Prop `value` diretamente
  onValueChange?: (value: string) => void; // Prop `onValueChange` diretamente
  className?: string;
};

export const AppSelect = ({
  options,
  placeholder,
  disabled,
  value,
  onValueChange,
  className
}: Props) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={`${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
import { AppSelect } from "@/components/shared/app-select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export const FormFieldSelect = ({
  form,
  name,
  label,
  options,
  placeholder,
  disabled,
}: Props) => (
  <FormField
    control={form.control}
    name={name as string}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <AppSelect
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            value={field.value} // Conecta o value do form
            onValueChange={field.onChange} // Conecta o onChange do form
            className="w-full border-primaria focus-visible:ring-primaria"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

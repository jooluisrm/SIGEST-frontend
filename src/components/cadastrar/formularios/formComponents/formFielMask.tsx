import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { InputMask } from "../../inputMask";

interface Props {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  mask: string | any[];
  placeholder?: string;
}

export const FormFieldMask = ({ form, name, label, mask, placeholder }: Props) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <InputMask mask={mask} value={field.value} onChange={field.onChange} placeholder={placeholder} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

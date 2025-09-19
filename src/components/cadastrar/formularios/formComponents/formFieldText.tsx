import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { InputCadastro } from "../../inputCadastro";
import { AppInput } from "@/components/shared/app-input";

interface Props {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    inputStyle?: "form" | "default";
}

export const FormFieldText = ({ form, name, label, type = "text", placeholder, inputStyle = "form" }: Props) => (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <AppInput
                        {...field}
                        intent={"formCamp"}
                        placeholder={placeholder}
                        type={type}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);
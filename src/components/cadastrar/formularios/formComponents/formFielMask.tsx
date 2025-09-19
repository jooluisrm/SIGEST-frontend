import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form"; 
import { MaskType } from "@/hooks/use-mask";
import { AppInput } from "@/components/shared/app-input";

interface Props {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    mask: MaskType;
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
                    <AppInput
                        {...field}
                        intent={"formCamp"}
                        placeholder={placeholder}
                        mask={mask}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

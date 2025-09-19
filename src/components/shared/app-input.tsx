import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority" 
import { cn } from "@/lib/utils"
import { useMask, type MaskType } from "@/hooks/use-mask";
import { Input as ShadInput } from "@/components/ui/input" 
import { Label } from "@/components/ui/label"

// Configurar os estilos dos inputs
const inputVariants = cva(
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      intent: {
        default: "border-input",
        formCamp: "border-primaria focus-visible:ring-primaria",
        loginCamp: "bg-blue-900/20 border-blue-500 text-white placeholder:text-blue-300 focus-visible:ring-blue-500"
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

export interface AppInputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
          VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  icon?: React.ReactNode
  mask?: MaskType
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, id, label, error, icon, intent, onChange,  mask, ...props }, ref) => {
    const inputId = id || React.useId()

    const Input = ShadInput;

    // Aplica a mascara nos inputs (cpf, rg...)
    const { applyMask } = useMask(mask);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = applyMask(e.target.value);
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      };

      onChange?.(newEvent);
    };

    return (
      <div className="w-full grid gap-1.5">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-muted-foreground">
              {icon}
            </div>
          )}

          <Input
            id={inputId}
            className={cn(
              inputVariants({ intent }), // Aplica os estilos da variante
              icon ? "pl-10" : "pl-3",
              error && "border-destructive focus-visible:ring-destructive text-destructive placeholder:text-destructive/60",
              className 
            )}
            ref={ref}
            onChange={handleOnChange} 
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    )
  }
)
AppInput.displayName = "AppInput"

export { AppInput }
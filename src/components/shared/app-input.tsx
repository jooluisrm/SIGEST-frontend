// src/components/ui/app-input.tsx (versão com cva)
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority" // Importar cva e VariantProps
import { cn } from "@/lib/utils"

import { Input as ShadInput } from "@/components/ui/input" // Renomeando para evitar conflito
import { Label } from "@/components/ui/label"

// ... (cole o const inputVariants que definimos acima aqui)
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


// Interface agora herda as props de variante do cva
export interface AppInputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
          VariantProps<typeof inputVariants> { // Mágica do TypeScript aqui!
  label?: string
  error?: string
  icon?: React.ReactNode
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, id, label, error, icon, intent, ...props }, ref) => {
    const inputId = id || React.useId()

    // O componente <Input> base não deve ter nenhuma classe, pois cva vai controlar tudo
    const Input = ShadInput;

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
            // A MÁGICA ACONTECE AQUI!
            className={cn(
              inputVariants({ intent }), // Aplica os estilos da variante
              // Condicionais de erro e ícone vêm DEPOIS para sobrescrever se necessário
              icon ? "pl-10" : "pl-3",
              error && "border-destructive focus-visible:ring-destructive text-destructive placeholder:text-destructive/60",
              className // Permite classes customizadas passadas externamente
            )}
            ref={ref}
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
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; 
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const appButtonVariants = cva(
    // Estilos base que se aplicam a todas as variantes.
    "text-white font-bold hover:opacity-90", 
    {
      variants: {
        intent: {
          done1: "bg-primaria ",
          done2: "bg-secundaria ",
          cancel: "bg-destructive ",
        },
      },
      defaultVariants: {
        intent: "done1",
      },
    }
  );

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  isLoading?: boolean;
  link?: string;
}

const AppButtonNew = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, children, intent, isLoading = false, link, ...props }, ref) => {
    
    if (link) {
      return (
        <Button
          asChild
          className={cn(appButtonVariants({ intent }), className)}
          disabled={isLoading}
        >
          <Link href={link}>{children}</Link>
        </Button>
      );
    }

    return (
      <Button
        type={props.type}
        className={cn(appButtonVariants({ intent }), className)}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {/* 4. Renderiza o texto ou ícone passado para o botão */}
        {children}
      </Button>
    );
  }
);
AppButtonNew.displayName = "AppButtonNew";

export { AppButtonNew };

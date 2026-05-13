import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ButtonGerenciar, ButtonIconType } from "../gerenciar/buttonGerenciar";
import { AppButton } from "./app-button";

type Props = {
    triggerIcon?: ButtonIconType;
    triggerTooltip: string;
    triggerClassName?: string;
    triggerLabel?: string;
    dialogTitle: string;
    dialogDescription: string;
    onConfirm?: () => void;
}

export const AlertDialogComponent = ({ 
    onConfirm, 
    dialogTitle, 
    triggerIcon, 
    triggerTooltip, 
    triggerClassName, 
    triggerLabel,
    dialogDescription 
}: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerLabel ? (
                    <AppButton className={triggerClassName}>
                        {triggerLabel}
                    </AppButton>
                ) : (
                    <ButtonGerenciar
                        alt={triggerTooltip}
                        icon={triggerIcon!}
                        className={triggerClassName}
                        size={"sm"}
                    />
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {dialogDescription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
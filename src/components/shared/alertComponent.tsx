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

type Props = {
    triggerIcon: ButtonIconType;
    triggerTooltip: string;
    triggerClassName?: string;
    dialogTitle: string;
    dialogDescription: string;
}

export const AlertDialogComponent = ({ dialogTitle, triggerIcon, triggerTooltip, triggerClassName, dialogDescription }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ButtonGerenciar
                    alt={triggerTooltip}
                    icon={triggerIcon}
                    className={triggerClassName}
                    size={"sm"}
                />
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
                    <AlertDialogAction>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
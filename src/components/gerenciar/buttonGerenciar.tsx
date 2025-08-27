import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Edit2, Eye, Trash2, UserRoundPlus, View } from "lucide-react";

type Props = {
    icon: "view" | "edit" | "delete" | "add";
    className?: string;
    alt: string;
    size?: "icon" | "sm" | "lg" | "default" | null | undefined;
}

export const ButtonGerenciar = ({ className, icon, alt, size }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size={size} className={`${className} transition-opacity hover:opacity-80`}>
                    {icon === "view" && <Eye />}
                    {icon === "edit" && <Edit2 />}
                    {icon === "delete" && <Trash2 />}
                    {icon === "add" && <UserRoundPlus />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{alt}</p>
            </TooltipContent>
        </Tooltip>
    );
}
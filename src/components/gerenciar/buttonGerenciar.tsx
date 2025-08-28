import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Edit2, Eye, Trash2, UserRoundPlus, View } from "lucide-react";
import Link from "next/link";
import React from "react";

export type ButtonIconType = "view" | "edit" | "delete" | "add";


type Props = {
    icon: ButtonIconType;
    className?: string;
    alt: string;
    size?: "icon" | "sm" | "lg" | "default" | null | undefined;
    link?: string;
    onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonGerenciar = React.forwardRef<HTMLButtonElement, Props>(
    ({ className, icon, alt, size, link, onClick }, ref) => {

        const buttonGerenciar = (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        ref={ref}
                        size={size}
                        className={`${className} transition-opacity hover:opacity-80`}
                        onClick={onClick}
                    >
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
        if (link) {
            return (
                <Link href={link}>
                    {buttonGerenciar}
                </Link>
            );
        }

        return (
            buttonGerenciar
        );
    });
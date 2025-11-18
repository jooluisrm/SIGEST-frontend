"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/context/loginUsersContext";
import { LogOut } from "lucide-react";
import { AppButton } from "../shared/app-button";
import { Button } from "../ui/button";

export const DropDownMenuProfile = () => {
    const { user, clearUser } = useUser();
    if (!user) return null;
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    title={user.name}
                    variant="ghost"
                    size="sm"
                    className="w-40 cursor-pointer"
                    >
                        <span className="truncate font-bold">{user.name}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel className="truncate">
                        <span >{user.name}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearUser} className="cursor-pointer">
                        <span className="font-bold">Sair</span>
                        <LogOut color="#F00" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
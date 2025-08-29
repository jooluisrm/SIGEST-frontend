"use client"
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { ItemLiDashboard } from "../dashboard/itemLiDashboard";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export const HeaderPage = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Define como true se a rolagem for maior que 10 pixels
            setScrolled(window.scrollY > 10);
        };

        // Adiciona o listener de scroll
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Define o estado inicial no carregamento

        // Remove o listener quando o componente for desmontado
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <Card className={cn(
                "h-20 rounded-none border-0 border-b p-0 m-0 transition-all duration-300",
                scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent"
            )}>
                <div className="container mx-auto px-5 flex justify-between items-center py-2">
                    <div>
                        <Image
                            alt="logo sigest"
                            src={'/assets/sigest-logo-mini.png'}
                            width={120}
                            height={120}
                            className=""
                            priority={true}
                        />
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                        <ItemLiDashboard url="#" type="user" />
                        <span>Fulano Da Silva</span>
                        <LogOut color="#F00" />
                    </div>
                </div>
            </Card>
        </header>
    );
}
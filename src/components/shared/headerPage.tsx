"use client"
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { ItemLiDashboard } from "../dashboard/itemLiDashboard";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export const HeaderPage = () => {
    
    const { open, isMobile } = useSidebar();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 z-50 transition-all duration-300",
            // AQUI: A condição agora é (open E !isMobile)
            (open && !isMobile) ? "md:left-[16rem] md:w-[calc(100%-16rem)]" : "left-0 w-full"
            
        )}>
            <Card className={cn(
                "h-20 rounded-none border-0 border-b p-0 m-0 transition-all duration-300",
                scrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent"
            )}>
                <div className={`container mx-auto px-5 flex justify-between items-center h-full
                        ${!open && !isMobile && "md:px-[3rem]"}
                    `}>
                    <div className="flex items-center gap-4">
                        
                    <Link href={"/dashboard"}>
                            <Image
                                alt="logo sigest completo"
                                src={'/assets/sigest-logo.png'}
                                width={200}
                                height={200}
                                priority={true}
                                className={`
                                    w-40 h-14
                                `}
                            />
                        </Link>

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
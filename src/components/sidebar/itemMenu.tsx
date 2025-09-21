import { Home } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ReactNode } from "react";
import Link from "next/link";

type Props = {
    title: string;
    link: string;
    icon: ReactNode;
}

export const ItemMenu = ({ link, title, icon }: Props) => {
    return (
        <>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href={link}>
                        <div>
                            {icon}
                        </div>
                        <span>{title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </>
    );
}
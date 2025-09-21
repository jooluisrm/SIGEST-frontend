import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Link, Plus } from "lucide-react";
import { SubItem } from "./subItem";
import { ItemLink, LinkData } from "@/types/sidebar";

type Props = {
    itemLinks: LinkData;
}

export const MenuRetratil = ({ itemLinks }: Props) => {
    return (
        <>
            <Collapsible className="group/collapsible">
                <SidebarMenuItem>

                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            {itemLinks.icon}
                            <span>{itemLinks.title}</span>
                            {/* Ícone que gira ao abrir/fechar */}
                            <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>

                        <SidebarMenuSub>
                            {itemLinks.data.map((item, index) => (
                                <SubItem key={index} link={item.link} subTitle={item.subtitle} />
                            ))}
                        </SidebarMenuSub>

                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </>
    );
}
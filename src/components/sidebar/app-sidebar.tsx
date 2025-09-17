// src/components/sidebar/app-sidebar.tsx

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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"; // Importe o Collapsible
import { Home, PanelLeft, Plus, Settings, ChevronDown } from "lucide-react"; // Importe o ícone
import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {

    const { open } = useSidebar();

    return (
        <aside className="fixed inset-y-0 left-0 bg-background z-100">
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader className="flex  p-2">

                    <div className="relative h-15 w-full">
                        {/* Imagem Grande (Logo Completo) */}
                        <Link href={"/dashboard"}>
                            <Image
                                alt="logo sigest completo"
                                src={'/assets/sigest-logo.png'}
                                width={200}
                                height={200}
                                priority={true}
                                className={`
                absolute inset-0 w-full h-full object-contain
                transition-opacity duration-300 ease-in-out
                ${open ? 'opacity-100' : 'opacity-0'}
            `}
                            />
                        </Link>

                        <Link href={"/dashboard"}>
                            <Image
                                alt="logo sigest mini"
                                src={"/assets/favicon.ico"}
                                width={60} // Defina um tamanho explícito para o favicon
                                height={60}
                                className={`
                absolute inset-0 w-full h-full object-contain
                transition-opacity duration-300 ease-in-out
                ${!open ? 'opacity-100' : 'opacity-0'}
            `}
                            />
                        </Link>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarMenu>
                        {/* Exemplo de item de menu normal */}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/dashboard">
                                    <Home size={16} />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        {/* --- AQUI COMEÇA O MENU RETRÁTIL --- */}
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <Plus size={16} />
                                        <span>Cadastros</span>
                                        {/* Ícone que gira ao abrir/fechar */}
                                        <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/cadastrar/professor">Professor</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/cadastrar/aluno">Aluno</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/cadastrar/servidor">Servidor</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        {/* --- AQUI TERMINA O MENU RETRÁTIL --- */}

                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter>
                    {/* Pode adicionar um menu de usuário ou configurações aqui */}
                </SidebarFooter>
            </Sidebar>
        </aside>
    );
}
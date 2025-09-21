import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar";
import { Home, Plus, Settings, ChevronDown, CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MenuRetratil } from "./menuRetratil";
import { ItemMenu } from "./itemMenu";
import { useRef } from "react";

const linksData = {
    gerenciar: {
        title: "Gerenciar",
        icon: <Settings size={16} />,
        data: [
            { subtitle: "Usuário", link: "/gerenciar/usuario" },
            { subtitle: "Professor", link: "/gerenciar/professor" },
            { subtitle: "Aluno", link: "/gerenciar/aluno" },
            { subtitle: "Disciplina", link: "/gerenciar/disciplina" },
        ]
    },
    cadastrar: {
        title: "Cadastrar",
        icon: <Plus />,
        data: [
            { subtitle: "Usuário", link: "/cadastrar/usuario" },
            { subtitle: "Professor", link: "/cadastrar/professor" },
            { subtitle: "Aluno", link: "/cadastrar/aluno" },
            { subtitle: "Disciplina", link: "/cadastrar/disciplina" },
        ]
    }
}

export function AppSidebar() {
    const { open, setOpen } = useSidebar();

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (!open) {
            setOpen(true);
        }
    };

    const handleMouseLeave = () => {

        timerRef.current = setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    return (

        <aside
            className="fixed inset-y-0 left-0 bg-background z-100"
        >
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader className="flex p-2">
                    <div className="relative h-15 w-full">
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
                                width={60}
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

                <SidebarContent
                    className={`transition-all ${!open ? "mx-auto" : "mx-0"}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SidebarMenu>
                        <ItemMenu
                            icon={<Home size={16} />}
                            link="/dashboard"
                            title="Dashboard"
                        />
                        <MenuRetratil itemLinks={linksData.gerenciar} />
                        <MenuRetratil itemLinks={linksData.cadastrar} />
                    </SidebarMenu>
                </SidebarContent>

                <SidebarSeparator className="my-2" />

                <SidebarFooter>
                    <ItemMenu
                        icon={<CircleQuestionMark size={16} />}
                        link="/ajuda"
                        title="Ajuda"
                    />
                </SidebarFooter>
            </Sidebar>
        </aside>
    );
}

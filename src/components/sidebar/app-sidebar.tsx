import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { CircleQuestionMark, Home, Plus, Settings } from "lucide-react";
import { useMemo, useRef } from "react";
import { hasModuleAccess, MODULES } from "@/config/modules";
import { useUser } from "@/context/loginUsersContext";
import { ItemMenu } from "./itemMenu";
import { MenuRetratil } from "./menuRetratil";

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const { role } = useUser();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const accessibleModules = useMemo(
    () => MODULES.filter((module) => hasModuleAccess(role, module)),
    [role]
  );

  const linksData = useMemo(
    () => ({
      gerenciar: {
        title: "Gerenciar",
        icon: <Settings size={16} />,
        data: accessibleModules
          .filter((module) => module.capabilities.manage)
          .map((module) => ({
            subtitle: module.label,
            link: `/gerenciar/${module.slug}`,
          })),
      },
      cadastrar: {
        title: "Cadastrar",
        icon: <Plus size={16} />,
        data: accessibleModules
          .filter((module) => module.capabilities.create)
          .map((module) => ({
            subtitle: module.label,
            link: `/cadastrar/${module.slug}`,
          })),
      },
    }),
    [accessibleModules]
  );

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (!open) {
        setOpen(true);
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  return (
    <aside className="fixed inset-y-0 left-0 bg-background z-50">
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="flex p-2">
          <SidebarTrigger />
        </SidebarHeader>

        <SidebarContent
          className={`transition-all ${!open ? "mx-auto" : "mx-0"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SidebarMenu>
            <ItemMenu icon={<Home size={16} />} link="/dashboard" title="Dashboard" />
            {linksData.gerenciar.data.length > 0 && (
              <MenuRetratil itemLinks={linksData.gerenciar} />
            )}
            {linksData.cadastrar.data.length > 0 && (
              <MenuRetratil itemLinks={linksData.cadastrar} />
            )}
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

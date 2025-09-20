import { PrivateLayoutContent } from "@/components/layout/private-layout-content";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";

export default async function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
     <SidebarProvider defaultOpen={defaultOpen}>
            <PrivateLayoutContent>
                {children}
            </PrivateLayoutContent>
        </SidebarProvider>
    );
}
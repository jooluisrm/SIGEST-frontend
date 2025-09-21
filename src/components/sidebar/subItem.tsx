import Link from "next/link";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";

type Props = {
    link: string;
    subTitle: string;
}

export const SubItem = ({link, subTitle}: Props) => {
    return (
        <>
            <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                    <Link href={`${link}`}>{subTitle}</Link>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        </>
    );
}
import { ReactNode } from "react";

export type ItemLink = {
    subtitle: string;
    link: string;
};

export type LinkData = {
    title: string;
    icon: ReactNode,
    data: ItemLink[];
};
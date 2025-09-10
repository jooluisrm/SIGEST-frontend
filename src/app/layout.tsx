import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SIGEST",
    description: "Sistema de Gestão Escolar",
    icons: {
        icon: [
            { url: "/assets/favicon.ico" },
        ],
        apple: "/assets/apple-touch-icon.png",
    },
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
        >
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <SidebarProvider>
                    <AppSidebar />
                    {children}
                    <Toaster />
                </SidebarProvider>
            </body>
        </html>
    );
}

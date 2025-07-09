import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        <html lang="pt-BR">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased vsc-initialized`}
                cz-shortcut-listen="true"
            >
                {children}
            </body>
        </html>
    );
}

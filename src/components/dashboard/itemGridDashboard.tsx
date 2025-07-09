import Image from "next/image";
import Link from "next/link";

type Props = {
    text: string;
    type: "Cadastrar" | "Nota" | "Relatorio" | "Professor" | "Aluno" | "Servidor";
    bg: 1 | 2;
    link?: string;
};

// 1. Mapeia o 'type' para o caminho do ícone correspondente
const iconMap = {
    Cadastrar: '/assets/cadastro-icon.png',
    Nota: '/assets/nota-icon.png',
    Relatorio: '/assets/relatorio-icon.png',
    Professor: '/assets/professor-icon.png',
    Aluno: '/assets/aluno-icon.png',
    Servidor: '/assets/servidor-icon.png',
};

export const ItemGridDashboard = ({ text, type, bg, link }: Props) => {
    
    // O conteúdo do item, que é sempre o mesmo
    const itemContent = (
        <div className={`
            transition-all duration-200 hover:scale-105 hover:-translate-y-2 cursor-pointer pl-10 md:pl-0 z-50 gap-10 md:gap-2
            flex items-center w-full h-32 rounded-2xl md:justify-center md:flex-col
            ${bg === 2 ? 'bg-primaria' : 'bg-secundaria1'}
        `}>
            {/* 2. Renderiza um único componente Image com a correção aplicada */}
            <Image
                alt="Icone"
                src={iconMap[type]}
                width={50}
                height={50}
                className="w-auto h-auto" 
            />
            <p className="text-text1 text-xl">{text}</p>
        </div>
    );

    // 3. Retorna o conteúdo dentro de um Link se o link existir, senão, retorna só o conteúdo
    if (link) {
        return <Link href={link}>{itemContent}</Link>;
    }
    
    return itemContent;
};
import Image from "next/image";

type Props = {
    text: string;
    type: "Cadastrar" | "Nota" | "Relatorio" | "Professor" | "Aluno" | "Servidor";
    bg: 1 | 2;
}

export const ItemGridDashboard = ({ text, type, bg }: Props) => {
    return (
        <div className={`
        transition-all duration-200 hover:scale-105 hover:-translate-y-2 cursor-pointer pl-10 md:pl-0 z-50 gap-10 md:gap-2 
        flex items-center w-full h-32 rounded-2xl md:justify-center md:flex-col
        ${bg === 2 ? 'bg-primaria' : 'bg-secundaria1'}
        `}>
            {type === "Cadastrar" && <Image alt="Icone" src={'/assets/cadastro-icon.png'} width={50} height={50}/>}
            {type === "Nota" && <Image alt="Icone" src={'/assets/nota-icon.png'} width={50} height={50}/>}
            {type === "Relatorio" && <Image alt="Icone" src={'/assets/relatorio-icon.png'} width={50} height={50}/>}
            {type === "Professor" && <Image alt="Icone" src={'/assets/professor-icon.png'} width={50} height={50}/>}
            {type === "Aluno" && <Image alt="Icone" src={'/assets/aluno-icon.png'} width={50} height={50}/>}
            {type === "Servidor" && <Image alt="Icone" src={'/assets/servidor-icon.png'} width={50} height={50}/>}
            <p className="text-text1 text-xl">{text}</p>
        </div>
    );
}
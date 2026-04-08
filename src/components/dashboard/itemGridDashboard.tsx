import Image from "next/image";
import Link from "next/link";

type Props = {
  text: string;
  bg: 1 | 2;
  iconPath: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const ItemGridDashboard = ({
  text,
  bg,
  iconPath,
  link,
  onClick,
  disabled,
}: Props) => {
  const itemContent = (
    <div
      onClick={disabled ? onClick : undefined}
      className={`
        transition-all duration-200 pl-10 md:pl-0 z-10 gap-10 md:gap-2
        flex items-center w-full h-32 rounded-2xl md:justify-center md:flex-col
        ${bg === 2 ? "bg-primaria" : "bg-secundaria1"}
        ${disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer hover:scale-105 hover:-translate-y-2"}
      `}
    >
      <Image alt="Ícone" src={iconPath} width={50} height={50} className="w-auto h-auto" />
      <p className="text-text1 text-xl">{text}</p>
    </div>
  );

  if (link && !disabled) {
    return <Link href={link}>{itemContent}</Link>;
  }

  return itemContent;
};

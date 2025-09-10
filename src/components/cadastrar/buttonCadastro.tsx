import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
    text: string;
    onClick: () => void;
}

export const ButtonCadastro = ({ text, onClick }: Props) => {
    return (
        <Button onClick={onClick} variant={"default"} className="rounded-2xl bg-secundaria h-10 w-17 sm:h-12 sm:w-22 font-bold cursor-pointer ml-1  hover:bg-secundaria hover:opacity-80">
            <ArrowLeft className="hidden sm:block" />
            {text}
        </Button>
    );
}
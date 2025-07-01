import { Button } from "../ui/button";

type Props = {
    text: string;
    onClick: () => void;
}

export const ButtonLogin = ({ text,onClick }: Props) => {
    return (
        <Button onClick={onClick} className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer">
            {text}
        </Button>
    );
}
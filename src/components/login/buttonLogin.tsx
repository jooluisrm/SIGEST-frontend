import { Button } from "../ui/button";

type Props = {
    text: string
}

export const ButtonLogin = ({text}: Props) => {
    return (
        <Button className="rounded-2xl bg-secundaria h-12 min-w-28 font-bold hover:bg-secundaria/50 cursor-pointer">
            {text}
        </Button>
    );
}
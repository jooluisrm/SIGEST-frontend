import { Input } from "../ui/input";

type Props = {
    placeholder: string;
}

export const InputLogin = ({placeholder}: Props) => {
    return (
        <Input 
            className="rounded-2xl bg-secundaria1 text-text1 border-0 placeholder:text-text1 placeholder:text-center h-12"
            placeholder={`${placeholder}`}
        />
    );
}
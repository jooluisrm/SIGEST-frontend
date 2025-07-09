import { Input } from "../ui/input";

type Props =  & {
    camp: string;
};

export const InputCadastro = ({ camp, ...props }: Props) => {
    return (
        <Input
            type={camp}
            className="rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none"
            {...props}
        />
    );
};

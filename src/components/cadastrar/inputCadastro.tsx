import { Input } from "../ui/input";

type Props = {
  type: string;
  className?: string;
  inputStyle: "form" | "default";
};

export const InputCadastro = ({ type, inputStyle, className, ...props }: Props) => {
  const getFormStyle = () => {
    return "rounded-2xl bg-primaria text-text1 border-0 placeholder:text-text1 h-12 px-4 appearance-none";
  };

  const getDefaultStyle = () => {
    return className || "";
  };

  const finalClass = inputStyle === "form" ? getFormStyle() : getDefaultStyle();

  return <Input type={type} {...props} className={finalClass} />;
};

type Props = {
  text: string;
};

export const TitleForm = ({ text }: Props) => {
  return <p className="text-lg font-semibold my-2">{text}:</p>;
};
